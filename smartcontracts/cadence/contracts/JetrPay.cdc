import LoyaltyProgram from "./LoyaltyProgram.cdc"

access(all) contract JetrPay {

    // Events
    access(all) event Deposit(user: Address, amount: UFix64)
    access(all) event Transfer(from: Address, to: Address, amount: UFix64)
    access(all) event MerchantPayment(from: Address, to: Address, amount: UFix64, cashback: UFix64)
    access(all) event MerchantRegistered(merchantAddress: Address, cashbackRate: UFix64)

    // Struct to hold user info
    access(all) struct User {
        access(all) let address: Address
        access(contract) var balance: UFix64
        access(contract) var totalCashbackEarned: UFix64

        init(address: Address) {
            self.address = address
            self.balance = 0.0
            self.totalCashbackEarned = 0.0
        }
        
        // Setter function to update balance
        access(contract) fun addToBalance(amount: UFix64) {
            self.balance = self.balance + amount
        }
        
        // Setter function to subtract from balance
        access(contract) fun subtractFromBalance(amount: UFix64) {
            pre {
                self.balance >= amount: "Insufficient balance"
            }
            self.balance = self.balance - amount
        }
        
        // Setter function to add cashback rewards
        access(contract) fun addCashback(amount: UFix64) {
            self.totalCashbackEarned = self.totalCashbackEarned + amount
            self.balance = self.balance + amount
        }
    }
    
    // Struct to hold merchant info
    access(all) struct Merchant {
        access(all) let address: Address
        access(all) let name: String
        access(all) var cashbackRate: UFix64
        access(contract) var balance: UFix64
        access(contract) var totalTransactions: UInt64
        
        init(address: Address, name: String, cashbackRate: UFix64) {
            pre {
                cashbackRate >= 0.0 && cashbackRate <= 0.1: "Cashback rate must be between 0% and 10%"
            }
            self.address = address
            self.name = name
            self.cashbackRate = cashbackRate
            self.balance = 0.0
            self.totalTransactions = 0
        }
        
        // Setter function to update balance
        access(contract) fun addToBalance(amount: UFix64) {
            self.balance = self.balance + amount
        }
        
        // Setter function to increment transaction count
        access(contract) fun incrementTransactions() {
            self.totalTransactions = self.totalTransactions + 1
        }
    }

    // Mappings
    access(self) var users: {Address: User}
    access(self) var merchants: {Address: Merchant}
    access(self) var defaultCashbackRate: UFix64

    // Contract initializer
    init() {
        self.users = {}
        self.merchants = {}
        self.defaultCashbackRate = 0.01 // 1% default cashback
    }

    // Public function to register a user
    access(all) fun registerUser(user: Address) {
        if self.users.containsKey(user) {
            panic("User already registered")
        }
        self.users[user] = User(address: user)
    }

    // Public function to simulate a deposit
    access(all) fun deposit(user: Address, amount: UFix64) {
        if !self.users.containsKey(user) {
            panic("User not registered")
        }

        var userData = self.users[user]!
        userData.addToBalance(amount: amount)
        self.users[user] = userData

        emit Deposit(user: user, amount: amount)
    }

    // Public function for user-to-user transfer
    access(all) fun transfer(from: Address, to: Address, amount: UFix64) {
        if !self.users.containsKey(from) {
            panic("Sender not registered")
        }
        if !self.users.containsKey(to) {
            panic("Recipient not registered")
        }
        var sender = self.users[from]!
        var recipient = self.users[to]!
        sender.subtractFromBalance(amount: amount)
        recipient.addToBalance(amount: amount)
        self.users[from] = sender
        self.users[to] = recipient
        
        // Award loyalty points for transfer
        LoyaltyProgram.awardTransactionPoints(
            userAddress: from,
            transactionAmount: amount,
            transactionType: "transfer"
        )
        
        emit Transfer(from: from, to: to, amount: amount)
    }

    // Public function to get user balance
    access(all) fun getBalance(user: Address): UFix64 {
        if !self.users.containsKey(user) {
            panic("User not registered")
        }
        return self.users[user]!.balance
    }
    
    // Function to register a merchant
    access(all) fun registerMerchant(merchantAddress: Address, name: String, cashbackRate: UFix64) {
        pre {
            !self.merchants.containsKey(merchantAddress): "Merchant already registered"
            cashbackRate >= 0.0 && cashbackRate <= 0.1: "Cashback rate must be between 0% and 10%"
        }
        
        let merchant = Merchant(
            address: merchantAddress,
            name: name,
            cashbackRate: cashbackRate
        )
        
        self.merchants[merchantAddress] = merchant
        
        emit MerchantRegistered(merchantAddress: merchantAddress, cashbackRate: cashbackRate)
    }
    
    // Function to pay a merchant with cashback rewards
    access(all) fun payMerchant(from: Address, to: Address, amount: UFix64): UFix64 {
        pre {
            self.users.containsKey(from): "User not registered"
            self.merchants.containsKey(to): "Merchant not registered"
            amount > 0.0: "Payment amount must be greater than zero"
        }
        
        var user = self.users[from]!
        if user.balance < amount {
            panic("Insufficient balance")
        }
        
        var merchant = self.merchants[to]!
        
        // Calculate cashback amount based on merchant's rate
        let cashbackAmount = amount * merchant.cashbackRate
        
        // Process payment
        user.subtractFromBalance(amount: amount)
        merchant.addToBalance(amount: amount)
        merchant.incrementTransactions()
        
        // Process cashback
        user.addCashback(amount: cashbackAmount)
        
        // Update storage
        self.users[from] = user
        self.merchants[to] = merchant
        
        // Emit payment event
        emit MerchantPayment(
            from: from,
            to: to,
            amount: amount,
            cashback: cashbackAmount
        )
        
        return cashbackAmount
    }
    
    // Function to get merchant information
    access(all) fun getMerchantInfo(merchantAddress: Address): Merchant {
        pre {
            self.merchants.containsKey(merchantAddress): "Merchant not registered"
        }
        
        return self.merchants[merchantAddress]!
    }
    
    // Function to get user's total earned cashback
    access(all) fun getUserCashback(userAddress: Address): UFix64 {
        pre {
            self.users.containsKey(userAddress): "User not registered"
        }
        
        return self.users[userAddress]!.totalCashbackEarned
    }
}