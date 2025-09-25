import LoyaltyProgram from "../../contracts/LoyaltyProgram.cdc"

/// Transaction to initialize loyalty profile for a user
transaction() {
    prepare(signer: &Account) {
        LoyaltyProgram.initializeLoyaltyProfile(userAddress: signer.address)
        log("Loyalty profile initialized for address: ".concat(signer.address.toString()))
    }
}