import ForteAgents from "../contracts/ForteAgents.cdc"

/// Script to get active agents information
access(all) fun main(agentId: UInt64): {String: AnyStruct}? {
    return ForteAgents.getAgentDetails(agentId: agentId)
}