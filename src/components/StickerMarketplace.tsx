"use client"

import React, { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useWallet } from "@aptos-labs/wallet-adapter-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Loader2, ShoppingCart, AlertCircle } from "lucide-react"

interface NFTPack {
  title: string
  price: number
  id: number
  negative: string
  keywords: string
  imageUrl: string
  altText: string
}

export default function StickerMarketplace() {
  const { account } = useWallet()
  const [nftPacks, setNFTPacks] = useState<NFTPack[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const mintNftPack = async (pack: NFTPack) => {
    const data = {
      action: "Add Sticker",
      prompt: pack.keywords,
      wallet: account?.address.toString(),
      negative_prompt: pack.negative,
      price: pack.price
    }

    console.log("Minting NFT pack:", data)

    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.sendData(JSON.stringify(data))
    } else {
      console.error("Telegram WebApp is not available")
    }
  }

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      window.Telegram.WebApp.ready()
    }
    
    const fetchNFTPacks = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://telegage-server.onrender.com/api/nft-packs')
        if (!response.ok) {
          throw new Error('Failed to fetch NFT packs')
        }
        const data = await response.json()
        setNFTPacks(data)
      } catch (error) {
        console.error("Error fetching NFT packs:", error)
        setError('Failed to load NFT packs. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchNFTPacks()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-lg font-semibold text-red-500">{error}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-1 py-2 max-w-screen-xl bg-gray-900">
      
      <div className="grid grid-cols-2 gap-1 sm:grid-cols-3 sm:gap-2 lg:grid-cols-4 xl:grid-cols-5">
        <AnimatePresence>
          {nftPacks.map((pack) => (
            <motion.div
              key={pack.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="bg-gray-800 overflow-hidden h-full flex flex-col rounded-lg shadow-md">
                <CardHeader className="p-0">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={pack.imageUrl}
                      alt={pack.altText}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = 'https://via.placeholder.com/400?text=Image+Not+Found'
                      }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-2 flex-grow">
                  <CardTitle className="text-sm font-semibold mb-1 text-white truncate">{pack.title}</CardTitle>
                  <Badge variant="secondary" className="mb-1 text-xs px-1 py-0">
                    {pack.price} Tokens
                  </Badge>
                  <p className="text-xs text-gray-400 line-clamp-2" title={pack.keywords}>
                    {pack.keywords}
                  </p>
                </CardContent>
                <CardFooter className="p-2 pt-0">
                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs py-1 px-2 rounded"
                    onClick={() => mintNftPack(pack)}
                  >
                    <ShoppingCart className="w-3 h-3 mr-1" />
                    Buy Pack
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}