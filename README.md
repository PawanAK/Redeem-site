# TeleGage Wallet Connection

TeleGage is a React-based web application that allows users to mint AI-generated Telegram stickers as NFTs using community points. This project integrates with the Aptos blockchain and utilizes various wallets, including Mizu wallet, for seamless transactions.

## Features

- Connect to Aptos-compatible wallets
- View and manage NFTs
- Mint AI-generated stickers as NFTs
- Use community points for transactions
- Responsive design with Tailwind CSS

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Aptos Blockchain
- Mizu Wallet
- Nodeit Indexer

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/your-username/telegage-wallet-connection.git
   cd telegage-wallet-connection
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Mizu Wallet Integration

This project integrates Mizu wallet for Aptos blockchain transactions. Mizu wallet is configured in the `WalletProvider` component:

## Nodeit Indexer Usage

We use the Nodeit indexer to fetch data from the Aptos blockchain. This is primarily used in the `Dashboard` component to retrieve NFT data and token balances:

## Building for Production

To build the app for production, run:

```
npm run build
```

This will generate a `dist` folder with the production-ready assets.

## Deployment

The project is configured for deployment on Vercel. The `vercel.json` file includes rewrite rules to handle client-side routing:

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
