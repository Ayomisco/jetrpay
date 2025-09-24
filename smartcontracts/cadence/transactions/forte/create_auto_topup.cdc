import ForteAgents from "../../contracts/ForteAgents.cdc"

/// Transaction to create an auto top-up agent
/// This automatically tops up a user's balance when it falls below a threshold
transaction(
    userAddress: Address,
    thresholdAmount: UFix64,
    topUpAmount: UFix64,
    fundingSource: Address
) {
    prepare(signer: &Account) {
        let agentId = ForteAgents.createAutoTopUpAgent(
            creator: signer.address,
            userAddress: userAddress,
            thresholdAmount: thresholdAmount,
            topUpAmount: topUpAmount,
            fundingSource: fundingSource
        )
        
        log("Created auto top-up agent with ID: ".concat(agentId.toString()))
    }
}