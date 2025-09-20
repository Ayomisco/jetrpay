import JetrPay from 0x01cf0e2f2f715450 // Replace with deployed contract address

transaction(amount: UFix64) {
    prepare(signer: AuthAccount) {
        // Register user if not already
        if (!JetrPay.getBalance(signer.address).isFinite()) {
            JetrPay.registerUser(signer.address)
        }

        JetrPay.deposit(user: signer.address, amount: amount)
    }
}