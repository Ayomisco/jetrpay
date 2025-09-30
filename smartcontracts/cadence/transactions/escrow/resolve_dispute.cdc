import PaymentEscrow from "../../contracts/PaymentEscrow.cdc"
import USDCVault from "../../contracts/USDCVault.cdc"

/// Transaction to resolve a dispute as platform admin
transaction(
    escrowId: UInt64,
    ruling: String,
    refundBuyer: Bool
) {
    let adminCapability: Capability<&PaymentEscrow.Admin>
    
    prepare(signer: &Account) {
        // Get the admin capability
        self.adminCapability = signer.capabilities.get<&PaymentEscrow.Admin>(PaymentEscrow.adminPath)
            ?? panic("Admin capability not found")
    }
    
    execute {
        let admin = self.adminCapability.borrow()
            ?? panic("Could not borrow admin capability")
        
        admin.resolveDispute(
            escrowId: escrowId,
            ruling: ruling,
            refundBuyer: refundBuyer
        )
        
        log("Dispute resolved for escrow ID: ".concat(escrowId.toString()))
        log("Ruling: ".concat(ruling))
        log("Refund to buyer: ".concat(refundBuyer.toString()))
    }
}