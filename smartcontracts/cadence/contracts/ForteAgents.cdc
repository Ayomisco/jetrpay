/// ForteAgents.cdc
///
/// This contract implements Forte Agents for monitoring and automated execution
/// of actions in the JetrPay platform. Agents continuously monitor conditions
/// and trigger actions when specific criteria are met.

import ForteActions from "./ForteActions.cdc"
import JetrPay from "./JetrPay.cdc"

access(all) contract ForteAgents {
    
    // Events
    access(all) event AgentCreated(agentId: UInt64, agentType: String, creator: Address)
    access(all) event AgentTriggered(agentId: UInt64, actionId: UInt64, condition: String)
    access(all) event AutoTopUpExecuted(agentId: UInt64, userAddress: Address, amount: UFix64)
    
    // Agent types
    access(all) enum AgentType: UInt8 {
        access(all) case ScheduledAgent
        access(all) case BalanceMonitorAgent
        access(all) case AutoTopUpAgent
        access(all) case ConditionalAgent
    }
    
    // Base Agent interface
    access(all) resource interface IAgent {
        access(all) let id: UInt64
        access(all) let agentType: AgentType
        access(all) let creator: Address
        access(all) var isActive: Bool
        access(all) fun checkCondition(): Bool
        access(all) fun execute()
        access(all) fun deactivate()
    }
    
    // Scheduled Agent - executes actions at regular intervals
    access(all) resource ScheduledAgent: IAgent {
        access(all) let id: UInt64
        access(all) let agentType: AgentType
        access(all) let creator: Address
        access(all) var isActive: Bool
        
        access(all) let actionId: UInt64
        access(all) let interval: UFix64 // seconds
        access(all) var lastExecution: UFix64
        
        init(id: UInt64, creator: Address, actionId: UInt64, interval: UFix64) {
            self.id = id
            self.agentType = AgentType.ScheduledAgent
            self.creator = creator
            self.isActive = true
            self.actionId = actionId
            self.interval = interval
            self.lastExecution = 0.0
        }
        
        access(all) fun checkCondition(): Bool {
            let currentTime = getCurrentBlock().timestamp
            return currentTime - self.lastExecution >= self.interval
        }
        
        access(all) fun execute() {
            if self.checkCondition() && self.isActive {
                let success = ForteActions.executeAction(actionId: self.actionId, executor: self.creator)
                if success {
                    self.lastExecution = getCurrentBlock().timestamp
                    emit AgentTriggered(agentId: self.id, actionId: self.actionId, condition: "scheduled_interval")
                }
            }
        }
        
        access(all) fun deactivate() {
            self.isActive = false
        }
    }
    
    // Balance Monitor Agent - triggers when user balance falls below threshold
    access(all) resource BalanceMonitorAgent: IAgent {
        access(all) let id: UInt64
        access(all) let agentType: AgentType
        access(all) let creator: Address
        access(all) var isActive: Bool
        
        access(all) let monitoredAddress: Address
        access(all) let thresholdAmount: UFix64
        access(all) let actionId: UInt64
        
        init(
            id: UInt64,
            creator: Address,
            monitoredAddress: Address,
            thresholdAmount: UFix64,
            actionId: UInt64
        ) {
            self.id = id
            self.agentType = AgentType.BalanceMonitorAgent
            self.creator = creator
            self.isActive = true
            self.monitoredAddress = monitoredAddress
            self.thresholdAmount = thresholdAmount
            self.actionId = actionId
        }
        
        access(all) fun checkCondition(): Bool {
            let currentBalance = JetrPay.getBalance(user: self.monitoredAddress)
            return currentBalance < self.thresholdAmount
        }
        
        access(all) fun execute() {
            if self.checkCondition() && self.isActive {
                let success = ForteActions.executeAction(actionId: self.actionId, executor: self.creator)
                if success {
                    emit AgentTriggered(agentId: self.id, actionId: self.actionId, condition: "balance_threshold")
                }
            }
        }
        
        access(all) fun deactivate() {
            self.isActive = false
        }
    }
    
    // Auto Top-Up Agent - automatically tops up user balance when low
    access(all) resource AutoTopUpAgent: IAgent {
        access(all) let id: UInt64
        access(all) let agentType: AgentType
        access(all) let creator: Address
        access(all) var isActive: Bool
        
        access(all) let userAddress: Address
        access(all) let thresholdAmount: UFix64
        access(all) let topUpAmount: UFix64
        access(all) let fundingSource: Address
        
        init(
            id: UInt64,
            creator: Address,
            userAddress: Address,
            thresholdAmount: UFix64,
            topUpAmount: UFix64,
            fundingSource: Address
        ) {
            self.id = id
            self.agentType = AgentType.AutoTopUpAgent
            self.creator = creator
            self.isActive = true
            self.userAddress = userAddress
            self.thresholdAmount = thresholdAmount
            self.topUpAmount = topUpAmount
            self.fundingSource = fundingSource
        }
        
        access(all) fun checkCondition(): Bool {
            let currentBalance = JetrPay.getBalance(user: self.userAddress)
            return currentBalance < self.thresholdAmount
        }
        
        access(all) fun execute() {
            if self.checkCondition() && self.isActive {
                // Execute top-up transfer
                JetrPay.transfer(
                    from: self.fundingSource,
                    to: self.userAddress,
                    amount: self.topUpAmount
                )
                
                emit AutoTopUpExecuted(
                    agentId: self.id,
                    userAddress: self.userAddress,
                    amount: self.topUpAmount
                )
            }
        }
        
        access(all) fun deactivate() {
            self.isActive = false
        }
    }
    
    // Contract state
    access(self) var nextAgentId: UInt64
    access(self) var agents: @{UInt64: {IAgent}}
    
    // Create a scheduled agent
    access(all) fun createScheduledAgent(
        creator: Address,
        actionId: UInt64,
        interval: UFix64
    ): UInt64 {
        let agentId = self.nextAgentId
        self.nextAgentId = self.nextAgentId + 1
        
        let agent <- create ScheduledAgent(
            id: agentId,
            creator: creator,
            actionId: actionId,
            interval: interval
        )
        
        self.agents[agentId] <-! agent
        
        emit AgentCreated(agentId: agentId, agentType: "ScheduledAgent", creator: creator)
        
        return agentId
    }
    
    // Create a balance monitor agent
    access(all) fun createBalanceMonitorAgent(
        creator: Address,
        monitoredAddress: Address,
        thresholdAmount: UFix64,
        actionId: UInt64
    ): UInt64 {
        let agentId = self.nextAgentId
        self.nextAgentId = self.nextAgentId + 1
        
        let agent <- create BalanceMonitorAgent(
            id: agentId,
            creator: creator,
            monitoredAddress: monitoredAddress,
            thresholdAmount: thresholdAmount,
            actionId: actionId
        )
        
        self.agents[agentId] <-! agent
        
        emit AgentCreated(agentId: agentId, agentType: "BalanceMonitorAgent", creator: creator)
        
        return agentId
    }
    
    // Create an auto top-up agent
    access(all) fun createAutoTopUpAgent(
        creator: Address,
        userAddress: Address,
        thresholdAmount: UFix64,
        topUpAmount: UFix64,
        fundingSource: Address
    ): UInt64 {
        let agentId = self.nextAgentId
        self.nextAgentId = self.nextAgentId + 1
        
        let agent <- create AutoTopUpAgent(
            id: agentId,
            creator: creator,
            userAddress: userAddress,
            thresholdAmount: thresholdAmount,
            topUpAmount: topUpAmount,
            fundingSource: fundingSource
        )
        
        self.agents[agentId] <-! agent
        
        emit AgentCreated(agentId: agentId, agentType: "AutoTopUpAgent", creator: creator)
        
        return agentId
    }
    
    // Execute all active agents (to be called by monitoring system)
    access(all) fun executeAllAgents() {
        for agentId in self.agents.keys {
            if let agentRef = &self.agents[agentId] as &{IAgent}? {
                if agentRef.isActive {
                    agentRef.execute()
                }
            }
        }
    }
    
    // Execute specific agent
    access(all) fun executeAgent(agentId: UInt64) {
        if let agentRef = &self.agents[agentId] as &{IAgent}? {
            if agentRef.isActive {
                agentRef.execute()
            }
        }
    }
    
    // Get agent details
    access(all) fun getAgentDetails(agentId: UInt64): {String: AnyStruct}? {
        if let agentRef = &self.agents[agentId] as &{IAgent}? {
            return {
                "id": agentRef.id,
                "agentType": agentRef.agentType.rawValue,
                "creator": agentRef.creator,
                "isActive": agentRef.isActive
            }
        }
        return nil
    }
    
    // Deactivate an agent
    access(all) fun deactivateAgent(agentId: UInt64) {
        if let agentRef = &self.agents[agentId] as &{IAgent}? {
            agentRef.deactivate()
        }
    }
    
    init() {
        self.nextAgentId = 1
        self.agents <- {}
    }
}