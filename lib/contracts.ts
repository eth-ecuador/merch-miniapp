export const MERCH_MANAGER_ABI = [
  {
    "type": "function",
    "name": "createEvent",
    "inputs": [
      { "name": "_name", "type": "string", "internalType": "string" },
      { "name": "_description", "type": "string", "internalType": "string" },
      { "name": "_imageURI", "type": "string", "internalType": "string" },
      { "name": "_maxAttendees", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [
      { "name": "", "type": "bytes32", "internalType": "bytes32" }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "mintSBTWithAttestation",
    "inputs": [
      { "name": "_to", "type": "address", "internalType": "address" },
      { "name": "_tokenURI", "type": "string", "internalType": "string" },
      { "name": "_eventId", "type": "bytes32", "internalType": "bytes32" },
      { "name": "_signature", "type": "bytes", "internalType": "bytes" }
    ],
    "outputs": [
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "bytes32", "internalType": "bytes32" }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "mintCompanionWithAttestation",
    "inputs": [
      { "name": "_sbtId", "type": "uint256", "internalType": "uint256" },
      { "name": "_organizer", "type": "address", "internalType": "address" },
      { "name": "_eventId", "type": "bytes32", "internalType": "bytes32" }
    ],
    "outputs": [
      { "name": "", "type": "uint256", "internalType": "uint256" },
      { "name": "", "type": "bytes32", "internalType": "bytes32" }
    ],
    "stateMutability": "payable"
  },
  {
    "type": "function",
    "name": "getUpgradeFee",
    "inputs": [],
    "outputs": [
      { "name": "", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getEvent",
    "inputs": [
      { "name": "_eventId", "type": "bytes32", "internalType": "bytes32" }
    ],
    "outputs": [
      { "name": "name", "type": "string", "internalType": "string" },
      { "name": "description", "type": "string", "internalType": "string" },
      { "name": "imageURI", "type": "string", "internalType": "string" },
      { "name": "creator", "type": "address", "internalType": "address" },
      { "name": "isActive", "type": "bool", "internalType": "bool" },
      { "name": "createdAt", "type": "uint256", "internalType": "uint256" },
      { "name": "totalAttendees", "type": "uint256", "internalType": "uint256" },
      { "name": "maxAttendees", "type": "uint256", "internalType": "uint256" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "tokenToEvent",
    "inputs": [
      { "name": "_tokenId", "type": "uint256", "internalType": "uint256" }
    ],
    "outputs": [
      { "name": "", "type": "bytes32", "internalType": "bytes32" }
    ],
    "stateMutability": "view"
  },
  {
    "type": "event",
    "name": "EventCreated",
    "inputs": [
      { "name": "eventId", "type": "bytes32", "indexed": true, "internalType": "bytes32" },
      { "name": "creator", "type": "address", "indexed": true, "internalType": "address" },
      { "name": "name", "type": "string", "indexed": false, "internalType": "string" },
      { "name": "description", "type": "string", "indexed": false, "internalType": "string" },
      { "name": "imageURI", "type": "string", "indexed": false, "internalType": "string" },
      { "name": "maxAttendees", "type": "uint256", "indexed": false, "internalType": "uint256" },
      { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" }
    ]
  }
] as const;

export const MERCH_MANAGER_ADDRESS = "0xD71F654c7B9C15A54B2617262369fA219c15fe24" as const;