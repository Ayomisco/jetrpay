import LoyaltyProgram from "../contracts/LoyaltyProgram.cdc"

/// Script to get all available rewards
access(all) fun main(): [LoyaltyProgram.Reward] {
    return LoyaltyProgram.getActiveRewards()
}