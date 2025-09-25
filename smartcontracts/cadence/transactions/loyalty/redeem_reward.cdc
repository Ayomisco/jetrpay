import LoyaltyProgram from "../../contracts/LoyaltyProgram.cdc"

/// Transaction to redeem loyalty points for a reward
transaction(rewardId: UInt64) {
    prepare(signer: &Account) {
        let success = LoyaltyProgram.redeemReward(
            userAddress: signer.address,
            rewardId: rewardId
        )
        
        if success {
            log("Successfully redeemed reward with ID: ".concat(rewardId.toString()))
        } else {
            log("Failed to redeem reward - insufficient points")
        }
    }
}