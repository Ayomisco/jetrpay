import MultiSigWallet from "../../contracts/MultiSigWallet.cdc"

/// Transaction to create a new multi-signature wallet
transaction(
    name: String,
    owners: [Address],
    threshold: UInt8
) {
    prepare(signer: &Account) {
        let walletId = MultiSigWallet.createMultiSigWallet(
            name: name,
            owners: owners,
            threshold: threshold,
            creator: signer.address
        )
        
        log("Created multi-sig wallet with ID: ".concat(walletId.toString()))
        log("Name: ".concat(name))
        log("Owners: ".concat(owners.length.toString()).concat(" owners"))
        log("Threshold: ".concat(threshold.toString()).concat(" approvals required"))
    }
}