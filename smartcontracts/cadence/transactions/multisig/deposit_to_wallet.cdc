import MultiSigWallet from "../../contracts/MultiSigWallet.cdc"

/// Transaction to deposit funds into a multi-sig wallet
transaction(
    walletId: UInt64,
    amount: UFix64
) {
    prepare(signer: &Account) {
        MultiSigWallet.depositToWallet(
            walletId: walletId,
            depositor: signer.address,
            amount: amount
        )
        
        log("Deposited ".concat(amount.toString()).concat(" to wallet ID: ").concat(walletId.toString()))
    }
}