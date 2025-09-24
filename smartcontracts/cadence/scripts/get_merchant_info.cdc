import JetrPay from 0x01cf0e2f2f715450

/// This script returns information about a merchant including their
/// cashback rate, total transactions, and current balance.

pub fun main(merchantAddress: Address): {String: AnyStruct} {
    let merchant = JetrPay.getMerchantInfo(merchantAddress: merchantAddress)
    
    return {
        "name": merchant.name,
        "address": merchant.address,
        "cashbackRate": merchant.cashbackRate,
        "totalTransactions": merchant.totalTransactions,
        "balance": merchant.balance
    }
}