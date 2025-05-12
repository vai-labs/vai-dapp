# VAI DApp (Value AI Token Ecosystem)

A decentralized application for the VAI ecosystem with proposal management, field DAOs, referral tracking, and community building features.

## Features

- Web3 wallet integration with "Sign Message" authentication
- DAO field management and proposals
- Leaderboard for community builders
- Task creation and assignment
- Bootstrap Bay functionality
- Referral program tracking

## Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Blockchain**: Ethers.js, SIWE (Sign-In With Ethereum)
- **Styling**: Tailwind CSS with responsive design
- **State Management**: React Context API

## Setup Instructions

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MetaMask or other Web3 wallet

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/vai-dapp.git
   cd vai-dapp
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env.local` file in the root directory with the following environment variables:
   ```
   # RPC Endpoint
   NEXT_PUBLIC_RPC_URL=https://data-seed-prebsc-1-s1.binance.org:8545/
   
   # Chain configuration
   NEXT_PUBLIC_BSC_TESTNET_CHAIN_ID=97
   
   # Contract addresses
   NEXT_PUBLIC_VAI_TOKEN_ADDRESS=0x1234567890123456789012345678901234567890
   NEXT_PUBLIC_FIELD_MANAGER_ADDRESS=0x1234567890123456789012345678901234567890
   NEXT_PUBLIC_PROPOSAL_MANAGER_ADDRESS=0x1234567890123456789012345678901234567890
   NEXT_PUBLIC_REFERRAL_MANAGER_ADDRESS=0x1234567890123456789012345678901234567890
   NEXT_PUBLIC_BOOTSTRAP_BAY_ADDRESS=0x1234567890123456789012345678901234567890
   
   # Auth configuration
   NEXTAUTH_SECRET=your-nextauth-secret-key
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```
npm run build
npm start
```

## Project Structure

```
/
├── components/        # Reusable UI components
│   ├── ui/            # Basic UI elements (Button, Card, etc.)
│   └── layout/        # Layout components (Navbar, Footer, etc.)
├── context/           # React context providers
├── hooks/             # Custom React hooks
├── lib/               # Utility functions and API clients
├── pages/             # Next.js pages and API routes
├── public/            # Static assets
├── styles/            # Global styles and Tailwind configuration
└── types/             # TypeScript type definitions
```

## Authentication

The DApp uses Sign-In With Ethereum (SIWE) for authentication. Users sign a message with their wallet to prove ownership of their Ethereum address.

## Smart Contracts

The DApp interacts with the following smart contracts:
- VAI Token: ERC-20 token for the ecosystem
- Field Manager: Manages field DAOs
- Proposal Manager: Handles proposals and voting
- Referral Manager: Tracks referrals and rewards
- Bootstrap Bay: Manages bootstrap contributions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.