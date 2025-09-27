import MultiSigWallet from "../contracts/MultiSigWallet.cdc"

/// Script to get all wallets owned by an address
access(all) fun main(ownerAddress: Address): [{String: AnyStruct}] {
    let walletIds = MultiSigWallet.getWalletsForOwner(owner: ownerAddress)
    let wallets: [{String: AnyStruct}] = []
    
    for walletId in walletIds {
        if let wallet = MultiSigWallet.getWallet(walletId: walletId) {
            wallets.append({
                "id": wallet.id,
                "name": wallet.name,
                "owners": wallet.owners,
                "threshold": wallet.threshold,
                "balance": wallet.balance,
                "totalTransactions": wallet.totalTransactions,
                "createdAt": wallet.createdAt,
                "isActive": wallet.isActive
            })
        }
    }
    
    return wallets
}