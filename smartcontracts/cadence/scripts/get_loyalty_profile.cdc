import LoyaltyProgram from "../contracts/LoyaltyProgram.cdc"

/// Script to get user's loyalty profile information
access(all) fun main(userAddress: Address): {String: AnyStruct}? {
    if let profile = LoyaltyProgram.getLoyaltyProfile(userAddress: userAddress) {
        return {
            "userAddress": profile.userAddress,
            "totalPoints": profile.totalPoints,
            "availablePoints": profile.availablePoints,
            "tier": profile.getTierName(),
            "tierMultiplier": profile.getTierMultiplier(),
            "totalTransactions": profile.totalTransactions,
            "totalSpent": profile.totalSpent,
            "joinDate": profile.joinDate,
            "lastActivity": profile.lastActivity
        }
    }
    return nil
}