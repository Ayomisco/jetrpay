# JetrPay Flow Smart Contracts

This repository contains the Cadence smart contracts for the JetrPay platform on Flow blockchain.

## Project Structure

```
smart-contracts/
└── cadence/
    ├── contracts/
    │   └── JetrPay.cdc         # Main platform contract
    ├── transactions/
    │   └── deposit_stablecoin.cdc  # Example onramp tx
    ├── scripts/
    │   └── get_user_balance.cdc    # Sample script
    ├── flow.json               # Flow project config
    ├── flow.lock               # Flow CLI lock file (auto-generated)
    ├── README.md               # This file
```

## Contract Overview

The JetrPay platform provides comprehensive functionality for:
- **JetrPay**: Core user registration, deposits, transfers, and merchant payments
- **USDCVault**: Secure stablecoin vault and ledger management
- **ForteActions**: Automated payment actions (recurring payments, split payments)
- **ForteAgents**: Monitoring agents (scheduled, balance monitoring, auto top-up)
- **LoyaltyProgram**: User loyalty points, tiers, and rewards system
- **MultiSigWallet**: Multi-signature wallets for shared fund management

### Latest Features Added 🚀

#### Multi-Signature Wallet System
- **Shared Wallets**: Multiple owners can control funds together
- **Configurable Thresholds**: Set minimum approvals required (e.g., 2-of-3, 3-of-5)
- **Transaction Proposals**: Any owner can propose transactions
- **Approval Process**: Owners vote to approve/reject transactions
- **Business & Family Use**: Perfect for company accounts and shared expenses
- **Security**: Enhanced security through distributed control
- **Expiration**: Transactions expire to prevent stale approvals

#### Previous: Loyalty Program System
- **Loyalty Points**: Users earn points for every transaction
- **Tier System**: Bronze, Silver, Gold, Platinum tiers with multipliers
- **Reward Redemption**: Cashback, bonus points, and discount rewards
- **Automatic Integration**: Points awarded automatically on transfers and payments

## Getting Started

### Prerequisites

- Flow CLI installed
  ```
  brew install flow-cli  # (on Mac)
  ```
  
  For other platforms: https://docs.onflow.org/flow-cli/install/

### Setup

1. Initialize the Flow project (if not already initialized):
   ```
   flow init
   ```

2. Update the `flow.json` file with your account information:
   - Replace "0x01cf0e2f2f715450" with your deployed contract address
   - Replace "YOUR_PRIVATE_KEY" with your private key if deploying from CLI
   - Update deployments to use your actual Flow account name

### Deployment

#### Local Emulator

Start the Flow emulator:
```
flow emulator
```

Deploy to the emulator:
```
flow project deploy --network emulator
```

#### Testing

To run a transaction (deposit stablecoin):
```
flow transactions send ./transactions/deposit_stablecoin.cdc --args-json '[{"type": "UFix64", "value": "100.0"}]' --signer admin
```

To run a script (get user balance):
```
flow scripts execute ./scripts/get_user_balance.cdc --args-json '[{"type": "Address", "value": "0x01cf0e2f2f715450"}]'
```

## Testnet/Mainnet Deployment

Update the account address in `flow.json` before deploying to testnet or mainnet.

### Testnet
```
flow project deploy --network testnet
```

## PaymentEscrow Contract

The `PaymentEscrow` contract provides a secure escrow system for trustless transactions between buyers and sellers. It includes dispute resolution mechanisms and automatic release features.

### Key Features

- **Secure Escrow**: Funds are held in escrow until delivery is confirmed
- **Dispute Resolution**: Built-in dispute mechanism with admin resolution
- **Auto-Release**: Automatic fund release after timeout period
- **Platform Fees**: Configurable fee collection for the platform
- **Loyalty Integration**: Escrow transactions award loyalty points

### Escrow Workflow

1. **Create Escrow**: Buyer creates an escrow agreement with seller
2. **Deposit Funds**: Buyer deposits USDC into the escrow
3. **Delivery**: Seller provides goods/services
4. **Confirm Delivery**: Buyer confirms delivery (funds released to seller)
5. **Auto-Release**: If no confirmation, funds auto-release after timeout

### Escrow Transactions

- `create_escrow.cdc` - Create a new escrow agreement
- `deposit_to_escrow.cdc` - Deposit funds into an escrow
- `confirm_delivery.cdc` - Confirm delivery and release funds
- `release_funds.cdc` - Manual release of escrow funds
- `raise_dispute.cdc` - Raise a dispute for an escrow
- `resolve_dispute.cdc` - Admin resolution of disputes

### Escrow Scripts

- `get_escrow_details.cdc` - Get details of a specific escrow
- `get_user_escrows.cdc` - Get all escrows for a user
- `get_escrow_stats.cdc` - Get platform escrow statistics
- `get_active_disputes.cdc` - Get all active disputes

## License

This project is licensed under the MIT License.