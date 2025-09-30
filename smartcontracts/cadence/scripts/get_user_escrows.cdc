import PaymentEscrow from "../contracts/PaymentEscrow.cdc"

/// Script to get all escrows associated with a user (as buyer or seller)
access(all) fun main(userAddress: Address): [PaymentEscrow.EscrowAgreementInfo] {
    return PaymentEscrow.getUserEscrows(userAddress: userAddress)
}