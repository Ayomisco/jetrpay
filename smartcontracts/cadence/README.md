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

The JetrPay contract provides basic functionality for:
- User registration on the platform
- Tracking stablecoin deposits
- Managing user balances

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

## License

This project is licensed under the MIT License.