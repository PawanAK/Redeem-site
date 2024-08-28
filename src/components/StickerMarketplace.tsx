import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Account,Ed25519PrivateKey, AccountAddress, Aptos, AptosConfig, Network, NetworkToNetworkName } from "@aptos-labs/ts-sdk";

interface NFTPack {
  title: string;
  price: number;
  id: number;
  negative: string;
  keywords: string;
  imageUrl: string;
  altText: string;
}

const config = new AptosConfig({ network: Network.DEVNET });
    const aptos = new Aptos(config);

async function transferCoin(
  sender: Account,
  amount: any,
): Promise<string> {
  const transaction = await aptos.transaction.build.simple({
    sender: sender.accountAddress,
    data: {
      function: "0x1::aptos_account::transfer_coins",
      typeArguments: [`${sender.accountAddress}::telegage_token::TeleGageToken`],
      functionArguments: [AccountAddress.fromString("0xf1e9e56bb36fb6b14a0e43bdc08dd13d5712eca1935c63870d1f3cc9827aab51"), amount],
    },
  });

  const senderAuthenticator = aptos.transaction.sign({ signer: sender, transaction });
  const pendingTxn = await aptos.transaction.submit.simple({ transaction, senderAuthenticator });

  return pendingTxn.hash;
}

const StickerMarketplace: React.FC = ({privAdres}) => {
  const privateKey =new Ed25519PrivateKey(privAdres)
  const account = Account.fromPrivateKey({ privateKey: privateKey });
  const [nftPacks, setNFTPacks] = useState<NFTPack[]>([]);

  

  useEffect(() => {
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
  const getBalance = async (accountAddress: AccountAddress, coinTypeAddress: AccountAddress) => {
    const amount = await aptos.getAccountCoinAmount({
      accountAddress,
      coinType: `${coinTypeAddress.toString()}::telegage_token::TeleGageToken`,
    });
  
    return amount;
  };
  const transferToken = async () => {
    await aptos.fundAccount({
      accountAddress: account.accountAddress,
      amount: 100_000_000,
  }); 
    const pendingTxn = await transferCoin(account, 1);
    console.log("Pending transaction:", pendingTxn);

    const transferCoinTransactionHash = await transferCoin(account, 100);
    await aptos.waitForTransaction({ transactionHash: transferCoinTransactionHash });
    console.log(`Bob's updated MoonCoin balance: ${await getBalance( account.accountAddress, account.accountAddress)}.`);
  };

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
            <button className="bg-purple-500 text-white py-1 px-3 rounded hover:bg-purple-600 transition-colors duration-200" onClick={transferToken}>Buy</button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default StickerMarketplace;