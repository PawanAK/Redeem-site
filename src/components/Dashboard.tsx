import React, { useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { motion } from "framer-motion";
import StickerMarketplace from "./StickerMarketplace";
import NFTCard from "./NFTCard";
import { IndexerClient } from "aptos";

export const Dashboard: React.FC = () => {
  const { account } = useWallet();
  const [balance, setBalance] = useState(1000);
  const [activeTab, setActiveTab] = useState("my nfts");
  const [nfts, setNfts] = useState<any[]>([]);

  useEffect(() => {
    const fetchAccountNFTs = async () => {
      if (account?.address) {
        const client = new IndexerClient("https://api.testnet.aptoslabs.com/v1/graphql");
        try {
          const accountNFTs = await client.getOwnedTokens("0x23eb0d8f041a17f8060b017f0b75329d69a27a2b995e70cdeec3257583fbed80");
          console.log("Account NFTs:", accountNFTs);
          setNfts(accountNFTs.current_token_ownerships_v2);
        } catch (error) {
          console.error("Error fetching account NFTs:", error);
        }
      }
    };

    fetchAccountNFTs();
  }, [account?.address]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-4">
          <motion.div 
            className="bg-gray-800 p-3 rounded-lg shadow-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-sm font-medium text-gray-400">Balance</p>
            <p className="text-xl font-bold text-white">{balance} TGT</p>
          </motion.div>
          <h1 className="text-2xl font-bold text-white">TeleGage Dashboard</h1>
        </div>
        <div className="text-sm bg-gray-800 px-3 py-2 rounded-full shadow-md">
          {account?.address.slice(0, 6)}...{account?.address.slice(-4)}
        </div>
      </header>
      
      <nav className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="flex">
          {["My NFTs", "Marketplace"].map((tab) => (
            <button 
              key={tab}
              className={`flex-1 py-3 px-4 ${activeTab === tab.toLowerCase() ? "bg-purple-600 text-white" : "bg-gray-700 text-gray-300"} transition-colors duration-200`}
              onClick={() => setActiveTab(tab.toLowerCase())}
            >
              {tab}
            </button>
          ))}
        </div>
      </nav>

      <motion.div 
        className="bg-gray-800 rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {activeTab === "my nfts" ? (
          <div>
            <h3 className="text-xl font-bold mb-4 text-white">Your Collection</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {nfts.map((nft, index) => (
                <NFTCard
                  key={index}
                  collectionName={nft.current_token_data.current_collection.collection_name}
                  tokenUri={nft.current_token_data.token_uri}
                  tokenName={nft.current_token_data.token_name || `Sticker #${nft.current_token_data.token_properties['Sticker #']}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <StickerMarketplace />
        )}
      </motion.div>
    </div>
  );
};