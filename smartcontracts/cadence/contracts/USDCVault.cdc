/// USDCVault.cdc
///
/// This contract implements a secure vault for USDC stablecoin on the Flow blockchain.
/// It provides functionality for managing user balances, deposits, withdrawals,
/// and transfers between users.
///
/// The contract is designed to be used by the JetrPay platform for handling stablecoin
/// operations in Africa and emerging markets.

pub contract USDCVault {
    // Events
    pub event TokensMinted(amount: UFix64, recipient: Address)
    pub event TokensBurned(amount: UFix64, from: Address)
    pub event TokensTransferred(amount: UFix64, from: Address, to: Address)
    pub event VaultCreated(owner: Address)
    
    // Paths
    pub let VaultStoragePath: StoragePath
    pub let VaultPublicPath: PublicPath
    pub let AdminStoragePath: StoragePath
    
    // Total supply of USDC tokens
    pub var totalSupply: UFix64
    
    // Admin resource that can mint and burn tokens
    pub resource Admin {
        // Mint new tokens and deposit them into recipient's vault
        pub fun mintTokens(amount: UFix64, recipient: Address) {
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
        pub fun burnTokens(from: @Vault) {
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
    pub resource interface IVaultPublic {
        pub var balance: UFix64
        pub fun deposit(from: @Vault)
        pub fun getOwnerAddress(): Address?
    }
    
    // Private interface with withdraw capability
    pub resource interface IVaultPrivate {
        pub fun withdraw(amount: UFix64): @Vault
    }
    
    // The Vault resource that holds the tokens
    pub resource Vault: IVaultPublic, IVaultPrivate {
        // The total balance of this vault
        pub var balance: UFix64
        
        // The owner of this vault
        pub var owner: PublicAccount?
        
        // Initialize a new vault with the given balance
        init(balance: UFix64) {
            self.balance = balance
            self.owner = nil
        }
        
        // Set the owner of this vault
        pub fun setOwner(owner: PublicAccount) {
            self.owner = owner
        }
        
        // Get the owner's address
        pub fun getOwnerAddress(): Address? {
            return self.owner?.address
        }
        
        // Withdraw tokens from the vault
        pub fun withdraw(amount: UFix64): @Vault {
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
        pub fun deposit(from: @Vault) {
            // Add the deposited balance to this vault's balance
            self.balance = self.balance + from.balance
            
            // Destroy the deposited vault
            destroy from
        }
    }
    
    // Create a new empty vault
    pub fun createEmptyVault(owner: PublicAccount): @Vault {
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