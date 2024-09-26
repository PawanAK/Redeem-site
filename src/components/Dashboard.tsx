import React, { useState, useEffect } from "react";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import StickerMarketplace from "./StickerMarketplace";
import NFTCard from "./NFTCard";
import { IndexerClient } from "aptos";

export const Dashboard: React.FC = () => {
  const { account } = useWallet();
  const { userId } = useParams<{ userId: string }>();
  const [balance, setBalance] = useState(0);
  const [activeTab, setActiveTab] = useState("my nfts");
  const [nfts, setNfts] = useState<any[]>([]);
  const [custodialAddress, setCustodialAddress] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustodialAddress = async () => {
      const res = await fetch(`https://telegage-server.onrender.com/api/community-user/${userId}`);
      const data = await res.json();
      if (data.custodialAddress) {
        console.log("Custodial Address:", data.custodialAddress);
        setCustodialAddress(data.custodialAddress);

        const client = new IndexerClient("https://api.testnet.aptoslabs.com/v1/graphql");
        const TokenBalance = await client.getAccountCoinsData(data.custodialAddress);
        const teleGageToken = TokenBalance.current_fungible_asset_balances.find(
          token => token.asset_type === "0xf1e9e56bb36fb6b14a0e43bdc08dd13d5712eca1935c63870d1f3cc9827aab51::telegage_token::TeleGageToken"
        );
        if (teleGageToken) {
          setBalance(teleGageToken.amount / 1000000); // Assuming 6 decimal places
        }
      }
    };

    const fetchAccountNFTs = async () => {
      if (account?.address) {
        const query = `
          query MyQuery {
            current_token_ownerships_v2(
              offset: 0
              where: {owner_address: {_eq: "0x23eb0d8f041a17f8060b017f0b75329d69a27a2b995e70cdeec3257583fbed80"}}
            ) {
              owner_address
              current_token_data {
                collection_id
                token_name
                current_collection {
                  collection_name
                }
                token_uri
              }
            }
          }
        `;

        try {
          const response = await fetch("https://aptos-testnet.nodit.io/ZuOqJg-EQaAgC2j_0G-0xFOlVz-XZO4c/v1/graphql", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ query }),
          });

          const result = await response.json();
          console.log("result nffff",result);
          const accountNFTs = result.data.current_token_ownerships_v2;

          console.log("Account NFTs:", accountNFTs);
          setNfts(accountNFTs);
        } catch (error) {
          console.error("Error fetching account NFTs:", error);
        }
      }
    };


    fetchAccountNFTs();
    fetchCustodialAddress();
  }, [account?.address, userId]);

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <motion.header 
        className="bg-gradient-to-r from-purple-800 to-indigo-800 rounded-lg shadow-lg p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">TeleGage Dashboard</h1>
            <p className="text-purple-200">Welcome to your personal sticker hub!</p>
          </div>
          <motion.div 
            className="text-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-2xl font-bold text-white mb-1">{balance.toFixed(2)} TELE</p>
            <p className="text-sm text-purple-200">Balance</p>
          </motion.div>
        </div>
        <div className="mt-4 pt-4 border-t border-purple-700">
          <p className="text-sm text-purple-300">
            Wallet: <span className="font-mono bg-purple-900 px-2 py-1 rounded">{account?.address.slice(0, 6)}...{account?.address.slice(-4)}</span>
          </p>
          {custodialAddress && (
            <p className="text-sm text-purple-300 mt-1">
              Custodial: <span className="font-mono bg-purple-900 px-2 py-1 rounded">{custodialAddress.slice(0, 6)}...{custodialAddress.slice(-4)}</span>
            </p>
          )}
        </div>
      </motion.header>
      
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {nfts.map((nft, index) => (
                <NFTCard
                  key={index}
                  collectionName={nft.current_token_data.current_collection.collection_name}
                  tokenUri={nft.current_token_data.token_uri}
                  tokenName={nft.current_token_data.token_name || `Sticker #${nft.current_token_data.token_properties?.['Sticker #']}`}
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