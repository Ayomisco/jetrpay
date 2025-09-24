import JetrPay from 0x01cf0e2f2f715450

/// This script returns a user's total earned cashback amount.

pub fun main(userAddress: Address): UFix64 {
    return JetrPay.getUserCashback(userAddress: userAddress)
}