
# JetrPay

**Powering the Next Generation of Borderless Payments**

JetrPay is a fiat-to-stablecoin payment platform built on Flow, enabling seamless access to digital dollars (USDC, USDF, cUSD) and swaps to assets like FLOW, ETH, and SOL. By bridging local fiat with blockchain, JetrPay empowers users and merchants in emerging markets to earn, save, and spend globally with low fees and simple UX.

## Platform Impact
JetrPay aims to unlock stablecoin access for the next billion users, starting in Africa. By reducing cross-border payment costs, providing local on/off-ramps, and supporting non-custodial wallets, JetrPay fosters financial inclusion and economic growth in high-potential regions.

## Directory Structure
- **jetrpay-landing-page/**: The public-facing marketing site and onboarding portal (Next.js, React).
- **jetrpay-platform/**: The main user/merchant dashboard, payment flows, and core app logic (Next.js, React).
- **smartcontracts/**:  Flow blockchain smart contracts for stablecoin bridging, swaps, and payment logic.

## Installation
1. Clone the repo:
	 ```bash
	 git clone https://github.com/ayomisco/jetrpay.git
	 ```
2. Install dependencies for each directory (using pnpm):
	 ```bash
	 cd jetrpay-landing-page && pnpm install
	 cd ../jetrpay-platform && pnpm install
	 ```
3. Start development servers:
	 ```bash
	 pnpm dev
	 ```

## Smart Contracts (Flow)
Smart contract code for Flow will be added soon in the `smartcontracts/` directory. Stay tuned for updates as we build out the on-chain logic for stablecoin bridging, swaps, and payments.

## Mini Roadmap (First Month)
- **Week 1:**
	- Set up landing page and platform UI scaffolding
	- Integrate wallet creation/link (Blocto/Flow)
	- Implement user sign up/login and Tier 1 KYC
- **Week 2:**
	- Build fiat-to-USDC buy flow (mocked for testnet)
	- Enable USDC balance viewer and transaction history
	- Start merchant onboarding and payment link generation
- **Week 3:**
	- Add USDC withdrawal/off-ramp (mocked)
	- Implement merchant dashboard and sales log
	- Begin smart contract scaffolding for Flow (testnet)
- **Week 4:**
	- Integrate payment QR codes and basic reporting
	- Launch testnet pilot (Nigeria/Kenya)
	- Collect feedback and iterate on core flows

---
