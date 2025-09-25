/// LoyaltyProgram.cdc
///
/// This contract implements a loyalty program for the JetrPay platform.
/// Users earn loyalty points for transactions and can redeem them for rewards.

import JetrPay from "./JetrPay.cdc"

access(all) contract LoyaltyProgram {
    
    // Events
    access(all) event PointsEarned(user: Address, points: UInt64, transactionType: String)
    access(all) event PointsRedeemed(user: Address, points: UInt64, rewardType: String)
    access(all) event LoyaltyTierUpdated(user: Address, newTier: String)
    access(all) event RewardCreated(rewardId: UInt64, name: String, pointsCost: UInt64)
    
    // Loyalty tiers
    access(all) enum LoyaltyTier: UInt8 {
        access(all) case Bronze
        access(all) case Silver
        access(all) case Gold
        access(all) case Platinum
    }
    
    // Reward types
    access(all) struct Reward {
        access(all) let id: UInt64
        access(all) let name: String
        access(all) let description: String
        access(all) let pointsCost: UInt64
        access(all) let rewardType: String // "cashback", "discount", "bonus"
        access(all) let value: UFix64
        access(all) var isActive: Bool
        
        init(
            id: UInt64,
            name: String,
            description: String,
            pointsCost: UInt64,
            rewardType: String,
            value: UFix64
        ) {
            self.id = id
            self.name = name
            self.description = description
            self.pointsCost = pointsCost
            self.rewardType = rewardType
            self.value = value
            self.isActive = true
        }
    }
    
    // User loyalty profile
    access(all) struct LoyaltyProfile {
        access(all) let userAddress: Address
        access(contract) var totalPoints: UInt64
        access(contract) var availablePoints: UInt64
        access(contract) var tier: LoyaltyTier
        access(contract) var totalTransactions: UInt64
        access(contract) var totalSpent: UFix64
        access(contract) var joinDate: UFix64
        access(contract) var lastActivity: UFix64
        
        init(userAddress: Address) {
            self.userAddress = userAddress
            self.totalPoints = 0
            self.availablePoints = 0
            self.tier = LoyaltyTier.Bronze
            self.totalTransactions = 0
            self.totalSpent = 0.0
            self.joinDate = getCurrentBlock().timestamp
            self.lastActivity = getCurrentBlock().timestamp
        }
        
        access(contract) fun addPoints(points: UInt64) {
            self.totalPoints = self.totalPoints + points
            self.availablePoints = self.availablePoints + points
            self.updateTier()
        }
        
        access(contract) fun redeemPoints(points: UInt64) {
            pre {
                self.availablePoints >= points: "Insufficient points"
            }
            self.availablePoints = self.availablePoints - points
        }
        
        access(contract) fun addTransaction(amount: UFix64) {
            self.totalTransactions = self.totalTransactions + 1
            self.totalSpent = self.totalSpent + amount
            self.lastActivity = getCurrentBlock().timestamp
        }
        
        access(contract) fun updateTier() {
            let oldTier = self.tier
            
            if self.totalPoints >= 50000 {
                self.tier = LoyaltyTier.Platinum
            } else if self.totalPoints >= 20000 {
                self.tier = LoyaltyTier.Gold
            } else if self.totalPoints >= 5000 {
                self.tier = LoyaltyTier.Silver
            } else {
                self.tier = LoyaltyTier.Bronze
            }
            
            if oldTier != self.tier {
                emit LoyaltyTierUpdated(user: self.userAddress, newTier: self.getTierName())
            }
        }
        
        access(all) fun getTierName(): String {
            switch self.tier {
                case LoyaltyTier.Bronze: return "Bronze"
                case LoyaltyTier.Silver: return "Silver"
                case LoyaltyTier.Gold: return "Gold"
                case LoyaltyTier.Platinum: return "Platinum"
            }
        }
        
        access(all) fun getTierMultiplier(): UFix64 {
            switch self.tier {
                case LoyaltyTier.Bronze: return 1.0
                case LoyaltyTier.Silver: return 1.2
                case LoyaltyTier.Gold: return 1.5
                case LoyaltyTier.Platinum: return 2.0
            }
        }
    }
    
    // Contract state
    access(self) var loyaltyProfiles: {Address: LoyaltyProfile}
    access(self) var rewards: {UInt64: Reward}
    access(self) var nextRewardId: UInt64
    
    // Points earning rates
    access(self) var basePointsPerTransaction: UInt64
    access(self) var pointsPerUSDCSpent: UInt64 // points per 1 USDC spent
    
    // Initialize loyalty profile for a user
    access(all) fun initializeLoyaltyProfile(userAddress: Address) {
        if self.loyaltyProfiles.containsKey(userAddress) {
            panic("Loyalty profile already exists")
        }
        
        self.loyaltyProfiles[userAddress] = LoyaltyProfile(userAddress: userAddress)
    }
    
    // Award points for a transaction
    access(all) fun awardTransactionPoints(userAddress: Address, transactionAmount: UFix64, transactionType: String) {
        if !self.loyaltyProfiles.containsKey(userAddress) {
            self.initializeLoyaltyProfile(userAddress: userAddress)
        }
        
        var profile = self.loyaltyProfiles[userAddress]!
        
        // Calculate base points
        var pointsEarned = self.basePointsPerTransaction
        
        // Add points based on amount spent
        let amountPoints = UInt64(transactionAmount * UFix64(self.pointsPerUSDCSpent))
        pointsEarned = pointsEarned + amountPoints
        
        // Apply tier multiplier
        let multiplier = profile.getTierMultiplier()
        pointsEarned = UInt64(UFix64(pointsEarned) * multiplier)
        
        // Award the points
        profile.addPoints(points: pointsEarned)
        profile.addTransaction(amount: transactionAmount)
        
        self.loyaltyProfiles[userAddress] = profile
        
        emit PointsEarned(user: userAddress, points: pointsEarned, transactionType: transactionType)
    }
    
    // Redeem points for a reward
    access(all) fun redeemReward(userAddress: Address, rewardId: UInt64): Bool {
        if !self.loyaltyProfiles.containsKey(userAddress) {
            panic("Loyalty profile not found")
        }
        
        if !self.rewards.containsKey(rewardId) {
            panic("Reward not found")
        }
        
        let reward = self.rewards[rewardId]!
        if !reward.isActive {
            panic("Reward is not active")
        }
        
        var profile = self.loyaltyProfiles[userAddress]!
        
        if profile.availablePoints < reward.pointsCost {
            return false // Insufficient points
        }
        
        // Redeem the points
        profile.redeemPoints(points: reward.pointsCost)
        self.loyaltyProfiles[userAddress] = profile
        
        // Apply the reward based on type
        self.applyReward(userAddress: userAddress, reward: reward)
        
        emit PointsRedeemed(user: userAddress, points: reward.pointsCost, rewardType: reward.rewardType)
        
        return true
    }
    
    // Apply the reward to user's account
    access(contract) fun applyReward(userAddress: Address, reward: Reward) {
        switch reward.rewardType {
            case "cashback":
                // Add cashback to user's balance
                JetrPay.deposit(user: userAddress, amount: reward.value)
            case "discount":
                // Discount would be applied at transaction time (implementation depends on use case)
                break
            case "bonus":
                // Bonus points
                var profile = self.loyaltyProfiles[userAddress]!
                profile.addPoints(points: UInt64(reward.value))
                self.loyaltyProfiles[userAddress] = profile
        }
    }
    
    // Create a new reward
    access(all) fun createReward(
        name: String,
        description: String,
        pointsCost: UInt64,
        rewardType: String,
        value: UFix64
    ): UInt64 {
        let rewardId = self.nextRewardId
        self.nextRewardId = self.nextRewardId + 1
        
        let reward = Reward(
            id: rewardId,
            name: name,
            description: description,
            pointsCost: pointsCost,
            rewardType: rewardType,
            value: value
        )
        
        self.rewards[rewardId] = reward
        
        emit RewardCreated(rewardId: rewardId, name: name, pointsCost: pointsCost)
        
        return rewardId
    }
    
    // Get loyalty profile
    access(all) fun getLoyaltyProfile(userAddress: Address): LoyaltyProfile? {
        return self.loyaltyProfiles[userAddress]
    }
    
    // Get available rewards
    access(all) fun getActiveRewards(): [Reward] {
        let activeRewards: [Reward] = []
        for reward in self.rewards.values {
            if reward.isActive {
                activeRewards.append(reward)
            }
        }
        return activeRewards
    }
    
    // Get reward by ID
    access(all) fun getReward(rewardId: UInt64): Reward? {
        return self.rewards[rewardId]
    }
    
    // Update points earning rates
    access(all) fun updatePointsRates(basePoints: UInt64, pointsPerUSDC: UInt64) {
        self.basePointsPerTransaction = basePoints
        self.pointsPerUSDCSpent = pointsPerUSDC
    }
    
    init() {
        self.loyaltyProfiles = {}
        self.rewards = {}
        self.nextRewardId = 1
        self.basePointsPerTransaction = 10
        self.pointsPerUSDCSpent = 5
        
        // Create initial rewards
        self.createReward(
            name: "Small Cashback",
            description: "Get $1 USDC cashback",
            pointsCost: 500,
            rewardType: "cashback",
            value: 1.0
        )
        
        self.createReward(
            name: "Medium Cashback",
            description: "Get $5 USDC cashback",
            pointsCost: 2000,
            rewardType: "cashback",
            value: 5.0
        )
        
        self.createReward(
            name: "Large Cashback",
            description: "Get $10 USDC cashback",
            pointsCost: 3500,
            rewardType: "cashback",
            value: 10.0
        )
        
        self.createReward(
            name: "Bonus Points",
            description: "Get 1000 bonus loyalty points",
            pointsCost: 1000,
            rewardType: "bonus",
            value: 1000.0
        )
    }
}