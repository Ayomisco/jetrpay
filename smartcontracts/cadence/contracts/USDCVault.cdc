/// USDCVault.cdc
///
/// This contract implements a secure vault for USDC stablecoin on the Flow blockchain.
/// It provides functionality for managing user balances, deposits, withdrawals,
/// and transfers between users.
///
/// The contract is designed to be used by the JetrPay platform for handling stablecoin
/// operations in Africa and emerging markets.

access(all) contract USDCVault {
    // Events
    access(all) event TokensMinted(amount: UFix64, recipient: Address)
    access(all) event TokensBurned(amount: UFix64, from: Address)
    access(all) event TokensTransferred(amount: UFix64, from: Address, to: Address)
    access(all) event VaultCreated(owner: Address)
    
    // Paths
    access(all) let VaultStoragePath: StoragePath
    access(all) let VaultPublicPath: PublicPath
    access(all) let AdminStoragePath: StoragePath
    
    // Total supply of USDC tokens
    access(all) var totalSupply: UFix64
    
    // Admin resource that can mint and burn tokens
    access(all) resource Admin {
        // Mint new tokens and deposit them into recipient's vault
        access(all) fun mintTokens(amount: UFix64, recipient: Address) {
            pre {
                amount > 0.0: "Amount minted must be greater than zero"
            }
            
            // Get recipient's vault reference
            let recipientReceiver = getAccount(recipient)
                .getCapability(USDCVault.VaultPublicPath)
                .borrow<&Vault{IVaultPublic}>()
                ?? panic("Could not get receiver reference to the recipient's vault")
            
            // Create new vault with minted tokens
            let vault <- create Vault(balance: amount)
            
            // Deposit to recipient's vault
            recipientReceiver.deposit(from: <-vault)
            
            // Increase total supply
            USDCVault.totalSupply = USDCVault.totalSupply + amount
            
            emit TokensMinted(amount: amount, recipient: recipient)
        }
        
        // Burn tokens from a vault
        access(all) fun burnTokens(from: @Vault) {
            let amount = from.balance
            
            // Decrease total supply
            USDCVault.totalSupply = USDCVault.totalSupply - amount
            
            // Get the address of the vault owner before burning
            let vaultOwner = from.owner?.address
                ?? panic("Could not get vault owner")
                
            // Destroy the vault
            destroy from
            
            emit TokensBurned(amount: amount, from: vaultOwner)
        }
    }
    
    // Public interface that users can cast their Vault references to
    access(all) resource interface IVaultPublic {
        access(all) var balance: UFix64
        access(all) fun deposit(from: @Vault)
        access(all) fun getOwnerAddress(): Address?
    }
    
    // Private interface with withdraw capability
    access(all) resource interface IVaultPrivate {
        access(all) fun withdraw(amount: UFix64): @Vault
    }
    
    // The Vault resource that holds the tokens
    access(all) resource Vault: IVaultPublic, IVaultPrivate {
        // The total balance of this vault
        access(all) var balance: UFix64
        
        // The owner of this vault
        access(all) var owner: PublicAccount?
        
        // Initialize a new vault with the given balance
        init(balance: UFix64) {
            self.balance = balance
            self.owner = nil
        }
        
        // Set the owner of this vault
        access(all) fun setOwner(owner: PublicAccount) {
            self.owner = owner
        }
        
        // Get the owner's address
        access(all) fun getOwnerAddress(): Address? {
            return self.owner?.address
        }
        
        // Withdraw tokens from the vault
        access(all) fun withdraw(amount: UFix64): @Vault {
            pre {
                amount > 0.0: "Amount withdrawn must be greater than zero"
                amount <= self.balance: "Insufficient funds"
            }
            
            // Decrease the vault's balance
            self.balance = self.balance - amount
            
            // Create a new vault with the withdrawn amount
            return <-create Vault(balance: amount)
        }
        
        // Deposit tokens into the vault
        access(all) fun deposit(from: @Vault) {
            // Add the deposited balance to this vault's balance
            self.balance = self.balance + from.balance
            
            // Destroy the deposited vault
            destroy from
        }
    }
    
    // Create a new empty vault
    access(all) fun createEmptyVault(owner: PublicAccount): @Vault {
        let vault <- create Vault(balance: 0.0)
        vault.setOwner(owner)
        
        emit VaultCreated(owner: owner.address)
        
        return <-vault
    }
    
    // Initialize the contract
    init() {
        self.totalSupply = 0.0
        
        // Define storage paths
        self.VaultStoragePath = /storage/USDCVault
        self.VaultPublicPath = /public/USDCVault
        self.AdminStoragePath = /storage/USDCAdmin
        
        // Create an Admin resource and store it in storage
        let admin <- create Admin()
        self.account.save(<-admin, to: self.AdminStoragePath)
    }
}