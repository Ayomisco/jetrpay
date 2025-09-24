import JetrPay from 0x01cf0e2f2f715450

/// This transaction registers a merchant on the JetrPay platform
/// with specified cashback rate for customers.

transaction(name: String, cashbackRate: UFix64) {
    prepare(signer: AuthAccount) {
        // Register merchant with the cashback rate
        JetrPay.registerMerchant(
            merchantAddress: signer.address, 
            name: name,
            cashbackRate: cashbackRate
        )
    }

    post {
        // Verification can be done by checking if the merchant is registered
        // This would typically be checked in a script rather than post condition
    }
}