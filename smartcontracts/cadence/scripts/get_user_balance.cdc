import JetrPay from 0x01cf0e2f2f715450 // Replace with your deployed contract address

pub fun main(user: Address): UFix64 {
    return JetrPay.getBalance(user: user)
}