import PaymentEscrow from "../contracts/PaymentEscrow.cdc"

/// Script to get all active disputes requiring admin review
access(all) fun main(): [PaymentEscrow.EscrowAgreementInfo] {
    return PaymentEscrow.getActiveDisputes()
}