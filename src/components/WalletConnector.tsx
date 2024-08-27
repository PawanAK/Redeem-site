import React from "react";
import { WalletSelector } from "@aptos-labs/wallet-adapter-ant-design";
import { motion } from "framer-motion";

export const WalletConnector: React.FC = () => {
  return (
    <div className="bg-gray-900 p-8 rounded-2xl shadow-lg max-w-md w-full mx-4">
      <motion.h2 
        className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Connect Your Wallet
      </motion.h2>
      <motion.div
        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px] rounded-full"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="bg-gray-900 rounded-full">
          <WalletSelector />
        </div>
      </motion.div>
    </div>
  );
};