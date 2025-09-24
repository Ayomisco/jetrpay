import JetrPay from 0x01cf0e2f2f715450

/// This transaction allows a user to pay a merchant
/// and earn cashback rewards in the process.

transaction(merchantAddress: Address, amount: UFix64) {
    let cashbackEarned: UFix64
    
    prepare(signer: AuthAccount) {
        // Make payment to merchant and get cashback rewards
        self.cashbackEarned = JetrPay.payMerchant(
            from: signer.address, 
            to: merchantAddress, 
            amount: amount
        )
    }

    post {
        // Ensure cashback amount is positive or zero
        self.cashbackEarned >= 0.0: "Cashback must be positive or zero"
    }
}