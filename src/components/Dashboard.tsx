import React, { useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { motion } from "framer-motion";
import StickerMarketplace from "./StickerMarketplace";

export const Dashboard: React.FC = () => {
  const { account } = useWallet();
  const [balance, setBalance] = useState(1000);
  const [activeTab, setActiveTab] = useState("nfts");

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-8">
      <header className="flex justify-between items-center mb-8 bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="text-xl font-bold text-white">TeleGage Dashboard</div>
        <div className="text-sm bg-gray-700 px-3 py-1 rounded-full">
          {account?.address.slice(0, 6)}...{account?.address.slice(-4)}
        </div>
      </header>

      <motion.div 
        className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold mb-2 text-white">Your Balance</h2>
        <p className="text-3xl font-bold text-white">{balance} TeleGage Tokens</p>
      </motion.div>

      <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex mb-4">
          <button 
            className={`flex-1 py-3 px-4 ${activeTab === "nfts" ? "bg-purple-500 text-white" : "bg-gray-700 text-gray-300"} transition-colors duration-200`}
            onClick={() => setActiveTab("nfts")}
          >
            My NFTs
          </button>
          <button 
            className={`flex-1 py-3 px-4 ${activeTab === "marketplace" ? "bg-purple-500 text-white" : "bg-gray-700 text-gray-300"} transition-colors duration-200`}
            onClick={() => setActiveTab("marketplace")}
          >
            Sticker Marketplace
          </button>
        </div>
        <div className="p-4">
          {activeTab === "nfts" ? (
            <div>
              <h3 className="text-xl font-bold mb-4 text-white">Your Collection</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((_, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-gray-700 aspect-square rounded-lg shadow-md overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {/* Placeholder for NFT image */}
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <StickerMarketplace />
          )}
        </div>
      </div>
    </div>
  );
};