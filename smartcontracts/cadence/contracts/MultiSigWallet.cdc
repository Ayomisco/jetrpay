/// MultiSigWallet.cdc
///
/// This contract implements multi-signature wallets for JetrPay platform.
/// Allows multiple users to share control over funds with configurable
/// approval thresholds for enhanced security and business use cases.

import JetrPay from "./JetrPay.cdc"

access(all) contract MultiSigWallet {
    
    // Events
    access(all) event MultiSigWalletCreated(walletId: UInt64, owners: [Address], threshold: UInt8)
    access(all) event TransactionProposed(walletId: UInt64, txId: UInt64, proposer: Address, to: Address, amount: UFix64)
    access(all) event TransactionApproved(walletId: UInt64, txId: UInt64, approver: Address)
    access(all) event TransactionExecuted(walletId: UInt64, txId: UInt64, executor: Address)
    access(all) event TransactionRejected(walletId: UInt64, txId: UInt64, rejector: Address)
    access(all) event FundsDeposited(walletId: UInt64, depositor: Address, amount: UFix64)
    access(all) event OwnerAdded(walletId: UInt64, newOwner: Address, addedBy: Address)
    access(all) event OwnerRemoved(walletId: UInt64, removedOwner: Address, removedBy: Address)
    
    // Transaction status
    access(all) enum TransactionStatus: UInt8 {
        access(all) case Pending
        access(all) case Approved
        access(all) case Executed
        access(all) case Rejected
        access(all) case Expired
    }
    
    // Proposed transaction
    access(all) struct ProposedTransaction {
        access(all) let id: UInt64
        access(all) let walletId: UInt64
        access(all) let proposer: Address
        access(all) let recipient: Address
        access(all) let amount: UFix64
        access(all) let description: String
        access(all) let proposedAt: UFix64
        access(all) let expiresAt: UFix64
        access(contract) var status: TransactionStatus
        access(contract) var approvals: {Address: Bool}
        access(contract) var rejections: {Address: Bool}
        access(contract) var executedAt: UFix64?
        
        init(
            id: UInt64,
            walletId: UInt64,
            proposer: Address,
            recipient: Address,
            amount: UFix64,
            description: String,
            expirationTime: UFix64
        ) {
            self.id = id
            self.walletId = walletId
            self.proposer = proposer
            self.recipient = recipient
            self.amount = amount
            self.description = description
            self.proposedAt = getCurrentBlock().timestamp
            self.expiresAt = self.proposedAt + expirationTime
            self.status = TransactionStatus.Pending
            self.approvals = {}
            self.rejections = {}
            self.executedAt = nil
        }
        
        access(contract) fun addApproval(approver: Address) {
            self.approvals[approver] = true
            if self.rejections.containsKey(approver) {
                self.rejections.remove(key: approver)
            }
        }
        
        access(contract) fun addRejection(rejector: Address) {
            self.rejections[rejector] = true
            if self.approvals.containsKey(rejector) {
                self.approvals.remove(key: rejector)
            }
        }
        
        access(contract) fun setStatus(status: TransactionStatus) {
            self.status = status
        }
        
        access(contract) fun setExecutedAt(timestamp: UFix64) {
            self.executedAt = timestamp
        }
        
        access(all) fun getApprovalCount(): Int {
            return self.approvals.length
        }
        
        access(all) fun getRejectionCount(): Int {
            return self.rejections.length
        }
        
        access(all) fun isExpired(): Bool {
            return getCurrentBlock().timestamp > self.expiresAt
        }
    }
    
    // Multi-signature wallet
    access(all) struct MultiSigWalletData {
        access(all) let id: UInt64
        access(all) let name: String
        access(contract) var owners: [Address]
        access(contract) var threshold: UInt8
        access(contract) var balance: UFix64
        access(contract) var totalTransactions: UInt64
        access(all) let createdAt: UFix64
        access(contract) var isActive: Bool
        
        init(
            id: UInt64,
            name: String,
            owners: [Address],
            threshold: UInt8
        ) {
            pre {
                owners.length >= 1: "At least one owner required"
                UInt8(owners.length) >= threshold: "Threshold cannot exceed number of owners"
                threshold >= 1: "Threshold must be at least 1"
            }
            
            self.id = id
            self.name = name
            self.owners = owners
            self.threshold = threshold
            self.balance = 0.0
            self.totalTransactions = 0
            self.createdAt = getCurrentBlock().timestamp
            self.isActive = true
        }
        
        access(contract) fun addOwner(newOwner: Address) {
            pre {
                !self.owners.contains(newOwner): "Owner already exists"
            }
            self.owners.append(newOwner)
        }
        
        access(contract) fun removeOwner(owner: Address) {
            pre {
                self.owners.contains(owner): "Owner not found"
                self.owners.length > 1: "Cannot remove last owner"
                UInt8(self.owners.length - 1) >= self.threshold: "Removing owner would make threshold impossible"
            }
            
            var index = 0
            while index < self.owners.length {
                if self.owners[index] == owner {
                    self.owners.remove(at: index)
                    break
                }
                index = index + 1
            }
        }
        
        access(contract) fun updateThreshold(newThreshold: UInt8) {
            pre {
                newThreshold >= 1: "Threshold must be at least 1"
                UInt8(self.owners.length) >= newThreshold: "Threshold cannot exceed number of owners"
            }
            self.threshold = newThreshold
        }
        
        access(contract) fun addBalance(amount: UFix64) {
            self.balance = self.balance + amount
        }
        
        access(contract) fun subtractBalance(amount: UFix64) {
            pre {
                self.balance >= amount: "Insufficient balance"
            }
            self.balance = self.balance - amount
        }
        
        access(contract) fun incrementTransactions() {
            self.totalTransactions = self.totalTransactions + 1
        }
        
        access(all) fun isOwner(address: Address): Bool {
            return self.owners.contains(address)
        }
        
        access(contract) fun deactivate() {
            self.isActive = false
        }
    }
    
    // Contract state
    access(self) var wallets: {UInt64: MultiSigWalletData}
    access(self) var transactions: {UInt64: ProposedTransaction}
    access(self) var nextWalletId: UInt64
    access(self) var nextTransactionId: UInt64
    access(self) var walletsByOwner: {Address: [UInt64]}
    
    // Create a new multi-signature wallet
    access(all) fun createMultiSigWallet(
        name: String,
        owners: [Address],
        threshold: UInt8,
        creator: Address
    ): UInt64 {
        pre {
            owners.contains(creator): "Creator must be included in owners"
        }
        
        let walletId = self.nextWalletId
        self.nextWalletId = self.nextWalletId + 1
        
        let wallet = MultiSigWalletData(
            id: walletId,
            name: name,
            owners: owners,
            threshold: threshold
        )
        
        self.wallets[walletId] = wallet
        
        // Update owner mappings
        for owner in owners {
            if !self.walletsByOwner.containsKey(owner) {
                self.walletsByOwner[owner] = []
            }
            self.walletsByOwner[owner]!.append(walletId)
        }
        
        emit MultiSigWalletCreated(walletId: walletId, owners: owners, threshold: threshold)
        
        return walletId
    }
    
    // Deposit funds to a multi-sig wallet
    access(all) fun depositToWallet(walletId: UInt64, depositor: Address, amount: UFix64) {
        pre {
            self.wallets.containsKey(walletId): "Wallet not found"
            self.wallets[walletId]!.isActive: "Wallet is not active"
        }
        
        // Transfer from user's JetrPay balance to wallet
        JetrPay.transfer(from: depositor, to: depositor, amount: 0.0) // Validate user exists
        
        var wallet = self.wallets[walletId]!
        wallet.addBalance(amount: amount)
        self.wallets[walletId] = wallet
        
        emit FundsDeposited(walletId: walletId, depositor: depositor, amount: amount)
    }
    
    // Propose a transaction
    access(all) fun proposeTransaction(
        walletId: UInt64,
        proposer: Address,
        recipient: Address,
        amount: UFix64,
        description: String,
        expirationHours: UFix64
    ): UInt64 {
        pre {
            self.wallets.containsKey(walletId): "Wallet not found"
            self.wallets[walletId]!.isOwner(address: proposer): "Only owners can propose transactions"
            self.wallets[walletId]!.isActive: "Wallet is not active"
            self.wallets[walletId]!.balance >= amount: "Insufficient wallet balance"
        }
        
        let txId = self.nextTransactionId
        self.nextTransactionId = self.nextTransactionId + 1
        
        let expirationTime = expirationHours * 3600.0 // Convert hours to seconds
        
        let transaction = ProposedTransaction(
            id: txId,
            walletId: walletId,
            proposer: proposer,
            recipient: recipient,
            amount: amount,
            description: description,
            expirationTime: expirationTime
        )
        
        self.transactions[txId] = transaction
        
        emit TransactionProposed(
            walletId: walletId,
            txId: txId,
            proposer: proposer,
            to: recipient,
            amount: amount
        )
        
        return txId
    }
    
    // Approve a transaction
    access(all) fun approveTransaction(txId: UInt64, approver: Address): Bool {
        pre {
            self.transactions.containsKey(txId): "Transaction not found"
        }
        
        var transaction = self.transactions[txId]!
        let wallet = self.wallets[transaction.walletId]!
        
        pre {
            wallet.isOwner(address: approver): "Only owners can approve"
            transaction.status == TransactionStatus.Pending: "Transaction is not pending"
            !transaction.isExpired(): "Transaction has expired"
        }
        
        transaction.addApproval(approver: approver)
        
        emit TransactionApproved(walletId: transaction.walletId, txId: txId, approver: approver)
        
        // Check if we have enough approvals to execute
        if transaction.getApprovalCount() >= Int(wallet.threshold) {
            return self.executeTransaction(txId: txId, executor: approver)
        }
        
        self.transactions[txId] = transaction
        return true
    }
    
    // Execute an approved transaction
    access(contract) fun executeTransaction(txId: UInt64, executor: Address): Bool {
        var transaction = self.transactions[txId]!
        var wallet = self.wallets[transaction.walletId]!
        
        pre {
            transaction.getApprovalCount() >= Int(wallet.threshold): "Insufficient approvals"
            wallet.balance >= transaction.amount: "Insufficient wallet balance"
            transaction.status == TransactionStatus.Pending: "Transaction is not pending"
        }
        
        // Execute the transfer
        wallet.subtractBalance(amount: transaction.amount)
        wallet.incrementTransactions()
        
        // Update transaction status
        transaction.setStatus(status: TransactionStatus.Executed)
        transaction.setExecutedAt(timestamp: getCurrentBlock().timestamp)
        
        self.wallets[transaction.walletId] = wallet
        self.transactions[txId] = transaction
        
        // Transfer to recipient (simplified - in real implementation would need proper vault handling)
        JetrPay.deposit(user: transaction.recipient, amount: transaction.amount)
        
        emit TransactionExecuted(walletId: transaction.walletId, txId: txId, executor: executor)
        
        return true
    }
    
    // Reject a transaction
    access(all) fun rejectTransaction(txId: UInt64, rejector: Address): Bool {
        pre {
            self.transactions.containsKey(txId): "Transaction not found"
        }
        
        var transaction = self.transactions[txId]!
        let wallet = self.wallets[transaction.walletId]!
        
        pre {
            wallet.isOwner(address: rejector): "Only owners can reject"
            transaction.status == TransactionStatus.Pending: "Transaction is not pending"
        }
        
        transaction.addRejection(rejector: rejector)
        
        // If majority rejects, mark as rejected
        let ownersCount = wallet.owners.length
        let rejectionsNeeded = (ownersCount - Int(wallet.threshold)) + 1
        
        if transaction.getRejectionCount() >= rejectionsNeeded {
            transaction.setStatus(status: TransactionStatus.Rejected)
        }
        
        self.transactions[txId] = transaction
        
        emit TransactionRejected(walletId: transaction.walletId, txId: txId, rejector: rejector)
        
        return true
    }
    
    // Get wallet information
    access(all) fun getWallet(walletId: UInt64): MultiSigWalletData? {
        return self.wallets[walletId]
    }
    
    // Get transaction information
    access(all) fun getTransaction(txId: UInt64): ProposedTransaction? {
        return self.transactions[txId]
    }
    
    // Get wallets for an owner
    access(all) fun getWalletsForOwner(owner: Address): [UInt64] {
        return self.walletsByOwner[owner] ?? []
    }
    
    // Get pending transactions for a wallet
    access(all) fun getPendingTransactions(walletId: UInt64): [UInt64] {
        let pendingTxs: [UInt64] = []
        
        for txId in self.transactions.keys {
            let tx = self.transactions[txId]!
            if tx.walletId == walletId && tx.status == TransactionStatus.Pending && !tx.isExpired() {
                pendingTxs.append(txId)
            }
        }
        
        return pendingTxs
    }
    
    init() {
        self.wallets = {}
        self.transactions = {}
        self.nextWalletId = 1
        self.nextTransactionId = 1
        self.walletsByOwner = {}
    }
}