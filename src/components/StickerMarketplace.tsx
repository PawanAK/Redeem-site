import React from "react";

const StickerMarketplace: React.FC = () => {
  const stickers = [
    { id: 1, price: 500 },
    { id: 2, price: 1000 },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stickers.map((sticker) => (
        <div key={sticker.id} className="bg-gray-700 p-4 rounded-lg">
          <div className="aspect-square bg-gray-600 rounded-lg mb-2"></div>
          <div className="flex justify-between items-center">
            <span>{sticker.price} Tokens</span>
            <button className="bg-pink-500 text-white py-1 px-3 rounded">Buy</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StickerMarketplace;