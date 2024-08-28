import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

interface NFTPack {
  title: string;
  price: number;
  id: number;
  negative: string;
  keywords: string;
  imageUrl: string;
  altText: string;
}

const StickerMarketplace: React.FC = () => {

  const { account } = useWallet();
 
  const [nftPacks, setNFTPacks] = useState<NFTPack[]>([]);

  const mint_nftpack = async (pack: NFTPack) => {
    const data = {
      action: "Add Sticker",
      prompt: pack.keywords,
      wallet: account.address.toString(),
      negative_prompt: pack.negative,
      price: pack.price
    };

    console.log(data)
    
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.sendData(JSON.stringify(data));
    } else {
      console.log("Telegram WebApp not available. Data:", data);
    }
  };

  useEffect(() => {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
    }
    
    const fetchNFTPacks = async () => {
      try {

        const response = await fetch('http://localhost:3001/api/nft-packs');
        const data = await response.json();
        setNFTPacks(data);
      } catch (error) {
        console.error("Error fetching NFT packs:", error);
      }
    };

    fetchNFTPacks();
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {nftPacks.map((pack) => (
        <motion.div 
          key={pack.id} 
          className="bg-gray-700 p-4 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="aspect-square bg-gray-600 rounded-lg mb-2 overflow-hidden">
            <img 
              src={pack.imageUrl} 
              alt={pack.altText} 
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
              }}
            />
          </div>
          <h3 className="text-lg font-semibold mb-1 text-white">{pack.title}</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">{pack.price} Tokens</span>
            <button className="bg-purple-500 text-white py-1 px-3 rounded hover:bg-purple-600 transition-colors duration-200" onClick={mint_nftpack}>Buy</button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StickerMarketplace;