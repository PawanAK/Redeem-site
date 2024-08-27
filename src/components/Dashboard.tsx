import React, { useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { motion } from "framer-motion";
import StickerMarketplace from "./StickerMarketplace";

export const Dashboard: React.FC = () => {
  const { account } = useWallet();
  const [balance, setBalance] = useState(1000);
  const [activeTab, setActiveTab] = useState("nfts");

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <header className="flex justify-between items-center mb-8">
        <div className="text-xl font-bold">vercel.com/user/123456789</div>
        <div className="text-sm">{account?.address.slice(0, 6)}...{account?.address.slice(-4)}</div>
      </header>

      <div className="flex justify-between mb-8">
        <motion.div 
          className="bg-gray-800 p-4 rounded-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Your Balance is {balance} TeleGage Tokens
        </motion.div>
      </div>

      <div className="mb-8">
        <div className="flex mb-4">
          <button 
            className={`flex-1 py-2 px-4 ${activeTab === "nfts" ? "bg-pink-500" : "bg-gray-700"} text-white rounded-tl-lg`}
            onClick={() => setActiveTab("nfts")}
          >
            My NFTs
          </button>
          <button 
            className={`flex-1 py-2 px-4 ${activeTab === "marketplace" ? "bg-pink-500" : "bg-gray-700"} text-white rounded-tr-lg`}
            onClick={() => setActiveTab("marketplace")}
          >
            Sticker MarketPlace
          </button>
        </div>
        <div className="bg-gray-800 p-4 rounded-b-lg">
          {activeTab === "nfts" ? (
            <div>
              <h3 className="text-xl mb-4">Collection</h3>
              <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="bg-gray-700 aspect-square rounded-lg"></div>
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