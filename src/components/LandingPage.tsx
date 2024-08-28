import React from "react";
import { motion } from "framer-motion";
import { WalletConnector } from "./WalletConnector";

export const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <motion.h1 
        className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to TeleGage
      </motion.h1>
      <motion.p 
        className="text-lg mb-8 max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        TeleGage is a unique platform that combines Telegram and blockchain technology. 
        Connect your wallet to access exclusive stickers, NFTs, and more!
      </motion.p>
      <WalletConnector />
    </div>
  );
};