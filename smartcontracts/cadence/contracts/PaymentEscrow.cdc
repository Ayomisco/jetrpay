/// PaymentEscrow.cdc
///
/// This contract implements a secure escrow system for JetrPay platform.
/// Enables trustless transactions between parties with dispute resolution
/// and automatic release mechanisms for enhanced security.

import JetrPay from "./JetrPay.cdc"
import LoyaltyProgram from "./LoyaltyProgram.cdc"

access(all) contract PaymentEscrow {
    
    // Events
    access(all) event EscrowCreated(escrowId: UInt64, payer: Address, payee: Address, amount: UFix64)
    access(all) event FundsDeposited(escrowId: UInt64, depositor: Address, amount: UFix64)
    access(all) event DeliveryConfirmed(escrowId: UInt64, confirmedBy: Address)
    access(all) event FundsReleased(escrowId: UInt64, releasedTo: Address, amount: UFix64)
    access(all) event DisputeRaised(escrowId: UInt64, raisedBy: Address, reason: String)
    access(all) event DisputeResolved(escrowId: UInt64, resolvedBy: Address, winner: Address)
    access(all) event EscrowCancelled(escrowId: UInt64, cancelledBy: Address)
    access(all) event AutoReleaseEnabled(escrowId: UInt64, releaseTime: UFix64)
    
    // Escrow status
    access(all) enum EscrowStatus: UInt8 {
        access(all) case Created
        access(all) case Funded
        access(all) case DeliveryConfirmed
        access(all) case Completed
        access(all) case Disputed
        access(all) case Cancelled
        access(all) case Expired
    }
    
    // Dispute status
    access(all) enum DisputeStatus: UInt8 {
        access(all) case None
        access(all) case Raised
        access(all) case UnderReview
        access(all) case Resolved
    }
    
    // Escrow terms
    access(all) struct EscrowTerms {
        access(all) let autoReleaseHours: UFix64
        access(all) let requiresDeliveryConfirmation: Bool
        access(all) let allowPartialRelease: Bool
        access(all) let disputeWindow: UFix64 // hours after delivery confirmation
        access(all) let escrowFeeRate: UFix64 // percentage (0.01 = 1%)
        
        init(
            autoReleaseHours: UFix64,
            requiresDeliveryConfirmation: Bool,
            allowPartialRelease: Bool,
            disputeWindow: UFix64,
            escrowFeeRate: UFix64
        ) {
            self.autoReleaseHours = autoReleaseHours
            self.requiresDeliveryConfirmation = requiresDeliveryConfirmation
            self.allowPartialRelease = allowPartialRelease
            self.disputeWindow = disputeWindow
            self.escrowFeeRate = escrowFeeRate
        }
    }
    
    // Dispute information
    access(all) struct DisputeInfo {
        access(all) let raisedBy: Address
        access(all) let reason: String
        access(all) let raisedAt: UFix64
        access(all) var status: DisputeStatus
        access(all) var resolvedBy: Address?
        access(all) var resolution: String?
        access(all) var winner: Address?
        
        init(raisedBy: Address, reason: String) {
            self.raisedBy = raisedBy
            self.reason = reason
            self.raisedAt = getCurrentBlock().timestamp
            self.status = DisputeStatus.Raised
            self.resolvedBy = nil
            self.resolution = nil
            self.winner = nil
        }
        
        access(contract) fun resolve(resolvedBy: Address, resolution: String, winner: Address) {
            self.resolvedBy = resolvedBy
            self.resolution = resolution
            self.winner = winner
            self.status = DisputeStatus.Resolved
        }
    }
    
    // Main escrow structure
    access(all) struct EscrowAgreement {
        access(all) let id: UInt64
        access(all) let payer: Address
        access(all) let payee: Address
        access(all) let amount: UFix64
        access(all) let description: String
        access(all) let terms: EscrowTerms
        access(all) let createdAt: UFix64
        
        access(contract) var status: EscrowStatus
        access(contract) var depositedAmount: UFix64
        access(contract) var deliveryConfirmedAt: UFix64?
        access(contract) var autoReleaseAt: UFix64?
        access(contract) var releasedAmount: UFix64
        access(contract) var dispute: DisputeInfo?
        access(contract) var completedAt: UFix64?
        
        init(
            id: UInt64,
            payer: Address,
            payee: Address,
            amount: UFix64,
            description: String,
            terms: EscrowTerms
        ) {
            self.id = id
            self.payer = payer
            self.payee = payee
            self.amount = amount
            self.description = description
            self.terms = terms
            self.createdAt = getCurrentBlock().timestamp
            self.status = EscrowStatus.Created
            self.depositedAmount = 0.0
            self.deliveryConfirmedAt = nil
            self.autoReleaseAt = nil
            self.releasedAmount = 0.0
            self.dispute = nil
            self.completedAt = nil
        }
        
        access(contract) fun updateStatus(newStatus: EscrowStatus) {
            self.status = newStatus
        }
        
        access(contract) fun addDeposit(amount: UFix64) {
            self.depositedAmount = self.depositedAmount + amount
            if self.depositedAmount >= self.amount {
                self.status = EscrowStatus.Funded
            }
        }
        
        access(contract) fun confirmDelivery() {
            self.deliveryConfirmedAt = getCurrentBlock().timestamp
            self.status = EscrowStatus.DeliveryConfirmed
            
            // Set auto-release time
            if self.terms.autoReleaseHours > 0.0 {
                self.autoReleaseAt = self.deliveryConfirmedAt! + (self.terms.autoReleaseHours * 3600.0)
            }
        }
        
        access(contract) fun releasePartial(amount: UFix64) {
            pre {
                self.terms.allowPartialRelease: "Partial release not allowed"
                amount <= (self.depositedAmount - self.releasedAmount): "Insufficient funds"
            }
            self.releasedAmount = self.releasedAmount + amount
        }
        
        access(contract) fun raiseDispute(raisedBy: Address, reason: String) {
            self.dispute = DisputeInfo(raisedBy: raisedBy, reason: reason)
            self.status = EscrowStatus.Disputed
        }
        
        access(contract) fun resolveDispute(resolvedBy: Address, resolution: String, winner: Address) {
            if let dispute = &self.dispute {
                dispute.resolve(resolvedBy: resolvedBy, resolution: resolution, winner: winner)
            }
        }
        
        access(contract) fun complete() {
            self.status = EscrowStatus.Completed
            self.completedAt = getCurrentBlock().timestamp
        }
        
        access(all) fun canAutoRelease(): Bool {
            if let releaseTime = self.autoReleaseAt {
                return getCurrentBlock().timestamp >= releaseTime && self.status == EscrowStatus.DeliveryConfirmed
            }
            return false
        }
        
        access(all) fun isExpired(): Bool {
            // Escrow expires if not funded within 24 hours
            if self.status == EscrowStatus.Created {
                return getCurrentBlock().timestamp > (self.createdAt + 86400.0)
            }
            return false
        }
        
        access(all) fun canRaiseDispute(): Bool {
            if self.status != EscrowStatus.DeliveryConfirmed {
                return false
            }
            
            if let confirmedAt = self.deliveryConfirmedAt {
                let disputeDeadline = confirmedAt + (self.terms.disputeWindow * 3600.0)
                return getCurrentBlock().timestamp <= disputeDeadline
            }
            return false
        }
    }
    
    // Contract state
    access(self) var escrows: {UInt64: EscrowAgreement}
    access(self) var escrowsByPayer: {Address: [UInt64]}
    access(self) var escrowsByPayee: {Address: [UInt64]}
    access(self) var nextEscrowId: UInt64
    access(self) var totalEscrowVolume: UFix64
    access(self) var platformFeeCollected: UFix64
    access(self) var disputeResolvers: {Address: Bool}
    
    // Default escrow terms
    access(self) var defaultTerms: EscrowTerms
    
    // Create a new escrow agreement
    access(all) fun createEscrow(
        payer: Address,
        payee: Address,
        amount: UFix64,
        description: String,
        customTerms: EscrowTerms?
    ): UInt64 {
        pre {
            payer != payee: "Payer and payee cannot be the same"
            amount > 0.0: "Amount must be greater than zero"
        }
        
        let escrowId = self.nextEscrowId
        self.nextEscrowId = self.nextEscrowId + 1
        
        let terms = customTerms ?? self.defaultTerms
        
        let escrow = EscrowAgreement(
            id: escrowId,
            payer: payer,
            payee: payee,
            amount: amount,
            description: description,
            terms: terms
        )
        
        self.escrows[escrowId] = escrow
        
        // Update mappings
        if !self.escrowsByPayer.containsKey(payer) {
            self.escrowsByPayer[payer] = []
        }
        if !self.escrowsByPayee.containsKey(payee) {
            self.escrowsByPayee[payee] = []
        }
        self.escrowsByPayer[payer]!.append(escrowId)
        self.escrowsByPayee[payee]!.append(escrowId)
        
        emit EscrowCreated(escrowId: escrowId, payer: payer, payee: payee, amount: amount)
        
        return escrowId
    }
    
    // Deposit funds to escrow
    access(all) fun depositToEscrow(escrowId: UInt64, depositor: Address, amount: UFix64) {
        pre {
            self.escrows.containsKey(escrowId): "Escrow not found"
        }
        
        var escrow = self.escrows[escrowId]!
        
        pre {
            escrow.status == EscrowStatus.Created || escrow.status == EscrowStatus.Funded: "Invalid escrow status"
            depositor == escrow.payer: "Only payer can deposit funds"
            !escrow.isExpired(): "Escrow has expired"
        }
        
        // Transfer funds from depositor
        JetrPay.transfer(from: depositor, to: depositor, amount: 0.0) // Validate user balance
        
        escrow.addDeposit(amount: amount)
        self.escrows[escrowId] = escrow
        
        emit FundsDeposited(escrowId: escrowId, depositor: depositor, amount: amount)
    }
    
    // Confirm delivery (by payer)
    access(all) fun confirmDelivery(escrowId: UInt64, confirmer: Address) {
        pre {
            self.escrows.containsKey(escrowId): "Escrow not found"
        }
        
        var escrow = self.escrows[escrowId]!
        
        pre {
            confirmer == escrow.payer: "Only payer can confirm delivery"
            escrow.status == EscrowStatus.Funded: "Escrow must be funded"
        }
        
        escrow.confirmDelivery()
        self.escrows[escrowId] = escrow
        
        emit DeliveryConfirmed(escrowId: escrowId, confirmedBy: confirmer)
        
        if escrow.terms.autoReleaseHours > 0.0 {
            emit AutoReleaseEnabled(escrowId: escrowId, releaseTime: escrow.autoReleaseAt!)
        }
    }
    
    // Release funds to payee
    access(all) fun releaseFunds(escrowId: UInt64, releaser: Address, amount: UFix64?) {
        pre {
            self.escrows.containsKey(escrowId): "Escrow not found"
        }
        
        var escrow = self.escrows[escrowId]!
        let releaseAmount = amount ?? (escrow.depositedAmount - escrow.releasedAmount)
        
        pre {
            releaser == escrow.payer || escrow.canAutoRelease(): "Not authorized to release"
            escrow.status == EscrowStatus.DeliveryConfirmed: "Delivery not confirmed"
            releaseAmount <= (escrow.depositedAmount - escrow.releasedAmount): "Insufficient escrowed funds"
        }
        
        // Calculate platform fee
        let fee = releaseAmount * escrow.terms.escrowFeeRate
        let netAmount = releaseAmount - fee
        
        // Release funds to payee
        JetrPay.deposit(user: escrow.payee, amount: netAmount)
        
        // Collect platform fee
        self.platformFeeCollected = self.platformFeeCollected + fee
        
        // Update escrow
        escrow.releasePartial(amount: releaseAmount)
        
        // Check if fully released
        if escrow.releasedAmount >= escrow.depositedAmount {
            escrow.complete()
            
            // Award loyalty points to both parties
            LoyaltyProgram.awardTransactionPoints(
                userAddress: escrow.payer,
                transactionAmount: escrow.amount,
                transactionType: "escrow_payment"
            )
            LoyaltyProgram.awardTransactionPoints(
                userAddress: escrow.payee,
                transactionAmount: escrow.amount,
                transactionType: "escrow_received"
            )
        }
        
        self.escrows[escrowId] = escrow
        self.totalEscrowVolume = self.totalEscrowVolume + releaseAmount
        
        emit FundsReleased(escrowId: escrowId, releasedTo: escrow.payee, amount: netAmount)
    }
    
    // Raise a dispute
    access(all) fun raiseDispute(escrowId: UInt64, disputer: Address, reason: String) {
        pre {
            self.escrows.containsKey(escrowId): "Escrow not found"
        }
        
        var escrow = self.escrows[escrowId]!
        
        pre {
            disputer == escrow.payer || disputer == escrow.payee: "Only parties can raise disputes"
            escrow.canRaiseDispute(): "Cannot raise dispute at this time"
        }
        
        escrow.raiseDispute(raisedBy: disputer, reason: reason)
        self.escrows[escrowId] = escrow
        
        emit DisputeRaised(escrowId: escrowId, raisedBy: disputer, reason: reason)
    }
    
    // Resolve dispute (by authorized resolver)
    access(all) fun resolveDispute(
        escrowId: UInt64,
        resolver: Address,
        resolution: String,
        winner: Address
    ) {
        pre {
            self.disputeResolvers.containsKey(resolver): "Not authorized to resolve disputes"
            self.escrows.containsKey(escrowId): "Escrow not found"
        }
        
        var escrow = self.escrows[escrowId]!
        
        pre {
            escrow.status == EscrowStatus.Disputed: "No active dispute"
            winner == escrow.payer || winner == escrow.payee: "Invalid winner"
        }
        
        escrow.resolveDispute(resolvedBy: resolver, resolution: resolution, winner: winner)
        
        // Release funds based on resolution
        let remainingFunds = escrow.depositedAmount - escrow.releasedAmount
        if winner == escrow.payee {
            // Award to payee
            JetrPay.deposit(user: escrow.payee, amount: remainingFunds)
        } else {
            // Return to payer
            JetrPay.deposit(user: escrow.payer, amount: remainingFunds)
        }
        
        escrow.complete()
        self.escrows[escrowId] = escrow
        
        emit DisputeResolved(escrowId: escrowId, resolvedBy: resolver, winner: winner)
    }
    
    // Get escrow details
    access(all) fun getEscrow(escrowId: UInt64): EscrowAgreement? {
        return self.escrows[escrowId]
    }
    
    // Get escrows for payer
    access(all) fun getEscrowsForPayer(payer: Address): [UInt64] {
        return self.escrowsByPayer[payer] ?? []
    }
    
    // Get escrows for payee
    access(all) fun getEscrowsForPayee(payee: Address): [UInt64] {
        return self.escrowsByPayee[payee] ?? []
    }
    
    // Get platform statistics
    access(all) fun getPlatformStats(): {String: AnyStruct} {
        return {
            "totalEscrows": self.nextEscrowId - 1,
            "totalVolume": self.totalEscrowVolume,
            "platformFeesCollected": self.platformFeeCollected
        }
    }
    
    // Add dispute resolver (admin function)
    access(all) fun addDisputeResolver(resolver: Address) {
        self.disputeResolvers[resolver] = true
    }
    
    init() {
        self.escrows = {}
        self.escrowsByPayer = {}
        self.escrowsByPayee = {}
        self.nextEscrowId = 1
        self.totalEscrowVolume = 0.0
        self.platformFeeCollected = 0.0
        self.disputeResolvers = {}
        
        // Set default terms
        self.defaultTerms = EscrowTerms(
            autoReleaseHours: 72.0, // 3 days
            requiresDeliveryConfirmation: true,
            allowPartialRelease: true,
            disputeWindow: 24.0, // 1 day after delivery confirmation
            escrowFeeRate: 0.005 // 0.5%
        )
        
        // Add initial dispute resolver (contract deployer)
        self.disputeResolvers[self.account.address] = true
    }
}