access(all) contract JetrPay {

    // Event when a user deposits
    access(all) event Deposit(user: Address, amount: UFix64)

    // Struct to hold user info
    access(all) struct User {
        access(all) let address: Address
        access(all) var balance: UFix64

        init(address: Address) {
            self.address = address
            self.balance = 0.0
        }
    }

    // Mapping from address to user
    access(self) var users: {Address: User}

    // Contract initializer
    init() {
        self.users = {}
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

        let userData = self.users[user]!
        userData.balance = userData.balance + amount
        self.users[user] = userData

        emit Deposit(user: user, amount: amount)
    }

    // Public function to get user balance
    access(all) fun getBalance(user: Address): UFix64 {
        if !self.users.containsKey(user) {
            panic("User not registered")
        }
        return self.users[user]!.balance
    }
}