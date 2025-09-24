/// ForteActions.cdc
///
/// This contract implements Forte Actions for automated payment operations
/// in the JetrPay platform. Actions are reusable, composable units of logic
/// that can be triggered automatically or on-demand.

import JetrPay from "./JetrPay.cdc"

access(all) contract ForteActions {
    
    // Events
    access(all) event ActionCreated(actionId: UInt64, actionType: String, creator: Address)
    access(all) event ActionExecuted(actionId: UInt64, executor: Address, success: Bool)
    access(all) event RecurringPaymentExecuted(actionId: UInt64, from: Address, to: Address, amount: UFix64)
    
    // Action types
    access(all) enum ActionType: UInt8 {
        access(all) case RecurringPayment
        access(all) case SplitPayment
        access(all) case EscrowPayment
        access(all) case ConditionalPayment
    }
    
    // Base Action interface
    access(all) resource interface IAction {
        access(all) let id: UInt64
        access(all) let actionType: ActionType
        access(all) let creator: Address
        access(all) var isActive: Bool
        access(all) fun execute(): Bool
        access(all) fun deactivate()
    }
    
    // Recurring Payment Action
    access(all) resource RecurringPaymentAction: IAction {
        access(all) let id: UInt64
        access(all) let actionType: ActionType
        access(all) let creator: Address
        access(all) var isActive: Bool
        
        access(all) let fromAddress: Address
        access(all) let toAddress: Address
        access(all) let amount: UFix64
        access(all) let frequency: UInt64 // seconds between payments
        access(all) var lastExecuted: UFix64
        access(all) var totalExecutions: UInt64
        access(all) let maxExecutions: UInt64?
        
        init(
            id: UInt64,
            creator: Address,
            fromAddress: Address,
            toAddress: Address,
            amount: UFix64,
            frequency: UInt64,
            maxExecutions: UInt64?
        ) {
            self.id = id
            self.actionType = ActionType.RecurringPayment
            self.creator = creator
            self.isActive = true
            self.fromAddress = fromAddress
            self.toAddress = toAddress
            self.amount = amount
            self.frequency = frequency
            self.lastExecuted = 0.0
            self.totalExecutions = 0
            self.maxExecutions = maxExecutions
        }
        
        access(all) fun execute(): Bool {
            pre {
                self.isActive: "Action is not active"
            }
            
            let currentTime = getCurrentBlock().timestamp
            
            // Check if enough time has passed
            if currentTime - self.lastExecuted < UFix64(self.frequency) {
                return false
            }
            
            // Check execution limits
            if let maxExec = self.maxExecutions {
                if self.totalExecutions >= maxExec {
                    self.deactivate()
                    return false
                }
            }
            
            // Execute the payment
            JetrPay.transfer(from: self.fromAddress, to: self.toAddress, amount: self.amount)
            
            self.lastExecuted = currentTime
            self.totalExecutions = self.totalExecutions + 1
            
            emit RecurringPaymentExecuted(
                actionId: self.id,
                from: self.fromAddress,
                to: self.toAddress,
                amount: self.amount
            )
            
            return true
        }
        
        access(all) fun deactivate() {
            self.isActive = false
        }
    }
    
    // Split Payment Action
    access(all) resource SplitPaymentAction: IAction {
        access(all) let id: UInt64
        access(all) let actionType: ActionType
        access(all) let creator: Address
        access(all) var isActive: Bool
        
        access(all) let fromAddress: Address
        access(all) let recipients: [{Address: UFix64}] // Array of recipient addresses and amounts
        access(all) let totalAmount: UFix64
        
        init(
            id: UInt64,
            creator: Address,
            fromAddress: Address,
            recipients: [{Address: UFix64}]
        ) {
            var total: UFix64 = 0.0
            for recipient in recipients {
                for amount in recipient.values {
                    total = total + amount
                }
            }
            
            self.id = id
            self.actionType = ActionType.SplitPayment
            self.creator = creator
            self.isActive = true
            self.fromAddress = fromAddress
            self.recipients = recipients
            self.totalAmount = total
        }
        
        access(all) fun execute(): Bool {
            pre {
                self.isActive: "Action is not active"
            }
            
            // Execute payments to all recipients
            for recipient in self.recipients {
                for address in recipient.keys {
                    let amount = recipient[address]!
                    JetrPay.transfer(from: self.fromAddress, to: address, amount: amount)
                }
            }
            
            return true
        }
        
        access(all) fun deactivate() {
            self.isActive = false
        }
    }
    
    // Contract state
    access(self) var nextActionId: UInt64
    access(self) var actions: @{UInt64: {IAction}}
    
    // Create a recurring payment action
    access(all) fun createRecurringPaymentAction(
        creator: Address,
        fromAddress: Address,
        toAddress: Address,
        amount: UFix64,
        frequency: UInt64,
        maxExecutions: UInt64?
    ): UInt64 {
        let actionId = self.nextActionId
        self.nextActionId = self.nextActionId + 1
        
        let action <- create RecurringPaymentAction(
            id: actionId,
            creator: creator,
            fromAddress: fromAddress,
            toAddress: toAddress,
            amount: amount,
            frequency: frequency,
            maxExecutions: maxExecutions
        )
        
        self.actions[actionId] <-! action
        
        emit ActionCreated(actionId: actionId, actionType: "RecurringPayment", creator: creator)
        
        return actionId
    }
    
    // Create a split payment action
    access(all) fun createSplitPaymentAction(
        creator: Address,
        fromAddress: Address,
        recipients: [{Address: UFix64}]
    ): UInt64 {
        let actionId = self.nextActionId
        self.nextActionId = self.nextActionId + 1
        
        let action <- create SplitPaymentAction(
            id: actionId,
            creator: creator,
            fromAddress: fromAddress,
            recipients: recipients
        )
        
        self.actions[actionId] <-! action
        
        emit ActionCreated(actionId: actionId, actionType: "SplitPayment", creator: creator)
        
        return actionId
    }
    
    // Execute an action
    access(all) fun executeAction(actionId: UInt64, executor: Address): Bool {
        if let actionRef = &self.actions[actionId] as &{IAction}? {
            let success = actionRef.execute()
            emit ActionExecuted(actionId: actionId, executor: executor, success: success)
            return success
        }
        return false
    }
    
    // Get action details
    access(all) fun getActionDetails(actionId: UInt64): {String: AnyStruct}? {
        if let actionRef = &self.actions[actionId] as &{IAction}? {
            return {
                "id": actionRef.id,
                "actionType": actionRef.actionType.rawValue,
                "creator": actionRef.creator,
                "isActive": actionRef.isActive
            }
        }
        return nil
    }
    
    init() {
        self.nextActionId = 1
        self.actions <- {}
    }
}