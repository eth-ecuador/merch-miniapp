# 🎯 Merch Collection - Web3 Event Merchandise Platform

A cutting-edge Web3 platform for creating, claiming, and upgrading NFT-based event merchandise. Built on Base blockchain with EAS (Ethereum Attestation Service) integration for verifiable event attendance.

## 🌟 Overview

Merch Collection revolutionizes event merchandise by transforming physical items into digital NFTs. Attendees can claim Soul Bound Tokens (SBTs) as proof of attendance and upgrade them to tradeable Premium NFTs, creating a unique hybrid physical-digital experience.

## ✨ Key Features

### 🎪 **Event Creation**
- **Decentralized Event Management**: Organizers can create events directly on-chain
- **IPFS Image Storage**: Event images stored on IPFS for decentralization
- **Automatic Code Generation**: Backend generates 100 unique claim codes per event
- **Smart Contract Integration**: Events stored immutably on Base blockchain

### 🎯 **NFT Claiming System**
- **Soul Bound Tokens (SBTs)**: Non-transferable proof of event attendance
- **QR Code Claims**: Users scan QR codes to claim their merchandise NFTs
- **Random Merch Assignment**: 6 different basic merchandise items randomly assigned
- **EAS Attestations**: Each claim verified through Ethereum Attestation Service
- **Auto-filled Upgrades**: Claimed token IDs automatically populate upgrade forms

### ⭐ **Premium Upgrade System**
- **SBT to NFT Conversion**: Convert non-transferable SBTs to tradeable ERC-721 NFTs
- **Premium Merchandise**: Access to 6 exclusive premium items
- **Paid Upgrades**: 0.001 ETH upgrade fee with Base app compatibility
- **Random Premium Assignment**: Fair distribution of premium merchandise
- **Collection Tracking**: All NFTs saved to user's digital collection

### 💎 **Digital Collection Management**
- **Personal Treasury**: View all collected NFTs in one place
- **Type Differentiation**: Visual badges distinguish Basic (🎯) vs Premium (⭐) NFTs
- **Local Storage**: Collection data persisted across sessions
- **Mobile Optimized**: Fully responsive design for mobile users

## 🚀 Tech Stack

### **Frontend**
- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Wagmi**: React hooks for Ethereum
- **Viem**: TypeScript Ethereum library

### **Blockchain**
- **Base Sepolia**: Layer 2 blockchain for fast, cheap transactions
- **Smart Contracts**: Solidity-based merchandise management
- **EAS Integration**: Ethereum Attestation Service for verification
- **IPFS**: Decentralized storage for images and metadata

### **Design System**
- **Futuristic UI**: Cyberpunk-inspired design elements
- **Circuit Backgrounds**: Animated technical aesthetics
- **Neon Accents**: Lime green and cyan color scheme
- **Mobile-First**: Responsive design for all devices

## 📱 User Journey

### 1. **Event Discovery**
- Users receive QR codes at physical events
- Scan code to access claim interface
- Connect wallet (Base account integration)

### 2. **NFT Claiming**
- Enter claim code from QR scan
- Verify attendance through EAS attestation
- Receive random basic merchandise NFT
- View assigned merchandise item

### 3. **Collection Building**
- Access personal treasury
- View all collected NFTs
- Track basic vs premium items
- Browse merchandise details

### 4. **Premium Upgrades**
- Token ID auto-filled from claims
- Pay 0.001 ETH upgrade fee
- Convert SBT to tradeable NFT
- Receive random premium merchandise
- Enhanced collection value

## 🔧 Smart Contract Architecture

### **MerchManager Contract**
**Address**: `0xD71F654c7B9C15A54B2617262369fA219c15fe24`

#### Core Functions:
```solidity
// Event Management
createEvent(string name, string description, string imageURI, uint256 maxAttendees)

// NFT Claiming
mintSBTWithAttestation(address to, string tokenURI, bytes32 eventId, bytes signature)

// Premium Upgrades  
mintCompanionWithAttestation(uint256 sbtId, address organizer, bytes32 eventId)

// Utility Functions
getUpgradeFee() returns (uint256)
getEvent(bytes32 eventId) returns (EventData)
tokenToEvent(uint256 tokenId) returns (bytes32)
```

## 🎨 Merchandise Collections

### **Basic Merch** (SBT Claims)
1. **Coffee Cup** - Premium ceramic coffee cup
2. **Travel Glass** - Durable travel glass  
3. **Glass Cup** - Elegant glass cup
4. **Event Hat** - Stylish event hat
5. **Tote Bag** - Eco-friendly tote bag
6. **Event T-Shirt** - Comfortable event t-shirt

### **Premium Merch** (Paid Upgrades)
1. **Premium Backpack** - Luxury leather backpack
2. **Premium Box** - Exclusive collectible box
3. **Premium Hat** - Limited edition hat
4. **Premium Headphones** - High-quality headphones
5. **Premium Key** - Special access key
6. **Premium Thermo** - Insulated premium bottle

## 🌐 API Integration

### **Backend Services**
- **Claim Verification**: `POST /api/events/claim`
- **Image Upload**: `POST /api/events/upload-image`
- **Event Management**: RESTful API for event operations
- **Code Generation**: Automatic claim code creation

### **Base Account Integration**
- **Wallet Connection**: Seamless Base wallet integration
- **User Profiles**: Display names and addresses
- **Transaction Handling**: Optimized for Base network

## 🔐 Security Features

### **Attestation Verification**
- EAS signatures validate legitimate claims
- Server-side signature verification
- Anti-fraud protection

### **Smart Contract Security**
- Immutable event data
- Secure upgrade mechanisms
- Protected fee collection

### **Frontend Security**
- Type-safe contract interactions
- Error handling and validation
- Secure local storage

## 📦 Installation & Setup

### Prerequisites
```bash
Node.js 18+
npm or yarn
Git
```

### Installation
```bash
# Clone repository
git clone [repository-url]
cd merch-collection

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Configure environment
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_ALCHEMY_API_KEY=your_alchemy_key

# Start development server
npm run dev
```

### Environment Configuration
```env
# Wallet Connect
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=

# Alchemy (Base Sepolia)
NEXT_PUBLIC_ALCHEMY_API_KEY=

# Backend API
NEXT_PUBLIC_API_URL=https://merch-backend-ot7l.onrender.com
```

## 🚀 Deployment

### **Frontend Deployment**
- Vercel deployment ready
- Automatic builds from main branch
- Environment variables configured

### **Backend Services**
- Render.com hosting
- Automatic code generation
- IPFS integration

## 🛣️ Roadmap

### **Phase 1** ✅ (Completed)
- [x] Basic NFT claiming system
- [x] Event creation interface
- [x] Smart contract deployment
- [x] EAS integration

### **Phase 2** ✅ (Completed)
- [x] Premium upgrade system
- [x] Digital collection management
- [x] Auto-fill token IDs
- [x] Mobile optimization

### **Phase 3** 🚧 (In Progress)
- [ ] Multi-chain support
- [ ] Advanced analytics
- [ ] Social features
- [ ] Marketplace integration

### **Phase 4** 📋 (Planned)
- [ ] Physical redemption system
- [ ] Partner integrations
- [ ] DAO governance
- [ ] Advanced gamification

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Maintain responsive design
- Test on mobile devices
- Document new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live App**: [https://merch-collection.vercel.app/premium]
- **Smart Contract**: [`0xD71F654c7B9C15A54B2617262369fA219c15fe24`](https://sepolia.basescan.org/address/0xD71F654c7B9C15A54B2617262369fA219c15fe24)
- **Backend API**: [https://merch-backend-ot7l.onrender.com](https://merch-backend-ot7l.onrender.com)
- **Base Sepolia Explorer**: [BaseScan](https://sepolia.basescan.org)

## 🙏 Acknowledgments

- **Base Network**: For providing fast, affordable blockchain infrastructure
- **Ethereum Attestation Service**: For verification framework
- **OpenZeppelin**: For secure smart contract libraries
- **Vercel**: For seamless deployment platform

---

**Built with ❤️ for the Web3 community**

*Transforming event experiences through blockchain technology*