pub contract JetrPay {

    // --- Events ---
    pub event Deposit(user: Address, amount: UFix64)
    pub event Withdraw(user: Address, amount: UFix64)
    pub event Transfer(from: Address, to: Address, amount: UFix64)
    pub event Mint(to: Address, amount: UFix64)
    pub event Burn(from: Address, amount: UFix64)
    pub event Paused()
    pub event Unpaused()
    pub event AccountFrozen(user: Address)
    pub event AccountUnfrozen(user: Address)

    // --- User struct ---
    pub struct User {
        pub let address: Address
        pub var balance: UFix64

        init(address: Address) {
            self.address = address
            self.balance = 0.0
        }
    }

    // --- Contract state ---
    access(self) var users: {Address: User}
    pub var totalSupply: UFix64
    pub let admin: Address
    access(self) var paused: Bool
    access(self) var frozen: {Address: Bool}

    // --- Initialize contract with admin (deployer) ---
    init() {
        self.users = {}
        self.totalSupply = 0.0
        self.admin = self.account.address
        self.paused = false
        self.frozen = {}
    }

    // --- Modifiers / simple checks (patterns) ---
    // (Cadence doesn't have modifiers — use internal helpers)

    access(self) fun assertNotPaused() {
        if self.paused {
            panic("Contract is paused")
        }
    }

    access(self) fun assertRegistered(user: Address) {
        if !self.users.containsKey(user) {
            panic("User not registered")
        }
    }

    access(self) fun assertNotFrozen(user: Address) {
        if self.frozen[user] == true {
            panic("Account is frozen")
        }
    }

    access(self) fun assertIsAdmin(caller: Address) {
        if caller != self.admin {
            panic("Only admin can call this function")
        }
    }

    // --- Public user management ---
    pub fun registerUser(user: Address) {
        if self.users.containsKey(user) {
            panic("User already registered")
        }
        self.users[user] = User(address: user)
    }

    pub fun isRegistered(user: Address): Bool {
        return self.users.containsKey(user)
    }

    // --- Deposit (increase user balance) ---
    // Keep same loose model as your original deposit function
    pub fun deposit(user: Address, amount: UFix64) {
        self.assertNotPaused()
        self.assertRegistered(user)
        self.assertNotFrozen(user)

        if amount <= 0.0 {
            panic("Deposit amount must be > 0")
        }

        let userData = self.users[user]!
        userData.balance = userData.balance + amount
        self.users[user] = userData

        emit Deposit(user: user, amount: amount)
    }

    // --- Withdraw (decrease user balance) ---
    pub fun withdraw(user: Address, amount: UFix64) {
        self.assertNotPaused()
        self.assertRegistered(user)
        self.assertNotFrozen(user)

        if amount <= 0.0 {
            panic("Withdraw amount must be > 0")
        }

        let userData = self.users[user]!
        if amount > userData.balance {
            panic("Insufficient balance")
        }

        userData.balance = userData.balance - amount
        self.users[user] = userData

        emit Withdraw(user: user, amount: amount)
    }

    // --- Transfer between users (simple internal ledger transfer) ---
    pub fun transfer(from: Address, to: Address, amount: UFix64) {
        self.assertNotPaused()
        self.assertRegistered(from)
        self.assertRegistered(to)
        self.assertNotFrozen(from)
        self.assertNotFrozen(to)

        if amount <= 0.0 {
            panic("Transfer amount must be > 0")
        }

        let fromUser = self.users[from]!
        if amount > fromUser.balance {
            panic("Insufficient balance to transfer")
        }

        // Subtract from sender
        var updatedFrom = fromUser
        updatedFrom.balance = updatedFrom.balance - amount
        self.users[from] = updatedFrom

        // Add to recipient
        var toUser = self.users[to]!
        toUser.balance = toUser.balance + amount
        self.users[to] = toUser

        emit Transfer(from: from, to: to, amount: amount)
    }

    // --- Admin: Mint new tokens to a user ---
    pub fun mint(to: Address, amount: UFix64) {
        self.assertIsAdmin(self.account.address)
        self.assertNotPaused()
        self.assertRegistered(to)

        if amount <= 0.0 {
            panic("Mint amount must be > 0")
        }

        var recipient = self.users[to]!
        recipient.balance = recipient.balance + amount
        self.users[to] = recipient

        self.totalSupply = self.totalSupply + amount

        emit Mint(to: to, amount: amount)
    }

    // --- Admin: Burn tokens from a user (reduces total supply) ---
    pub fun burn(from: Address, amount: UFix64) {
        self.assertIsAdmin(self.account.address)
        self.assertNotPaused()
        self.assertRegistered(from)

        if amount <= 0.0 {
            panic("Burn amount must be > 0")
        }

        var userData = self.users[from]!
        if amount > userData.balance {
            panic("Insufficient balance to burn")
        }

        userData.balance = userData.balance - amount
        self.users[from] = userData

        self.totalSupply = self.totalSupply - amount

        emit Burn(from: from, amount: amount)
    }

    // --- Admin: Pause & Unpause (emergency stop) ---
    pub fun pause() {
        self.assertIsAdmin(self.account.address)
        if !self.paused {
            self.paused = true
            emit Paused()
        }
    }

    pub fun unpause() {
        self.assertIsAdmin(self.account.address)
        if self.paused {
            self.paused = false
            emit Unpaused()
        }
    }

    // --- Admin: Freeze / Unfreeze individual accounts ---
    pub fun freezeAccount(user: Address) {
        self.assertIsAdmin(self.account.address)
        self.assertRegistered(user)
        self.frozen[user] = true
        emit AccountFrozen(user: user)
    }

    pub fun unfreezeAccount(user: Address) {
        self.assertIsAdmin(self.account.address)
        self.assertRegistered(user)
        self.frozen[user] = false
        emit AccountUnfrozen(user: user)
    }

    pub fun isFrozen(user: Address): Bool {
        return self.frozen[user] == true
    }

    // --- View helpers ---
    pub fun getBalance(user: Address): UFix64 {
        if !self.users.containsKey(user) {
            panic("User not registered")
        }
        return self.users[user]!.balance
    }

    pub fun getTotalSupply(): UFix64 {
        return self.totalSupply
    }

    pub fun getAdmin(): Address {
        return self.admin
    }

    // --- Convenience: register and mint in a single call (admin) ---
    pub fun registerAndMint(user: Address, amount: UFix64) {
        self.assertIsAdmin(self.account.address)

        if !self.users.containsKey(user) {
            self.users[user] = User(address: user)
        }

        self.mint(to: user, amount: amount)
    }

    // --- Developer note ---
    //
    // This contract provides a simple self-contained ledger in-contract.
    // For production tokens on Flow:
    //  - implement resource-based Vaults, Provider/Receiver interfaces,
    //    and conform to the FungibleToken standard so accounts hold their own Vaults.
    //  - add access controls that rely on tx signers (AuthAccount) rather than this.contract.account.
    //  - include reentrancy checks and audits for mint/burn functions.
    //
    // Use this version for prototyping, testing, or learning.
}
