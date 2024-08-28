import React from "react";
import { motion } from "framer-motion";

const StickerMarketplace: React.FC = () => {
  const stickers = [
    { id: 1, price: 500, name: "Cool Sticker" },
    { id: 2, price: 1000, name: "Awesome Sticker" },
    { id: 3, price: 750, name: "Funny Sticker" },
    { id: 4, price: 1200, name: "Cute Sticker" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {stickers.map((sticker) => (
        <motion.div 
          key={sticker.id} 
          className="bg-gray-700 p-4 rounded-lg shadow-md"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="aspect-square bg-gray-600 rounded-lg mb-2"></div>
          <h3 className="text-lg font-semibold mb-1 text-white">{sticker.name}</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">{sticker.price} Tokens</span>
            <button className="bg-purple-500 text-white py-1 px-3 rounded hover:bg-purple-600 transition-colors duration-200">Buy</button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StickerMarketplace;