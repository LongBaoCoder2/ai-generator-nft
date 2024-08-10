"use client";

import React, { useState } from 'react';
import { ConnectButton, MediaRenderer, useActiveAccount, useReadContract } from 'thirdweb/react';
import { client } from '@/app/client';
import NFTCollection from './NFTCollection';
import { getNFTs } from 'thirdweb/extensions/erc721';
import { contract } from '@/utils/contracts';
import { upload } from 'thirdweb/storage';

interface AIGeneration {
  id: number;
  imageUrl: string;
}

const AIGenerator: React.FC = () => {
  const account = useActiveAccount();

  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMinting, setIsMinting] = useState(false);

  const { data: nfts, isLoading } = useReadContract(
    getNFTs,
    {
      contract: contract
    }
  )

  const handleSwitchNetwork = () => {
    // Implement network switching logic
    console.log('Switching network...');
  };

  const handleGenerateAndMint = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      })

      if (!res.ok) {
        throw new Error("Failed to generate image.");
      }

      const data = await res.json();
      const imageBlob = await fetch(data.data[0].asset_url).then((img) => img.blob());
      const imageFile = new File([imageBlob], "image.png", {type: "image/png"});
      const imageUri = await upload({client: client,
                                     files: [imageFile]})
      
      setGeneratedImage(imageUri);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateAnother = () => {

  }

  if (account) {
    return (
      <div className="flex flex-col items-center gap-4 p-5">
          <ConnectButton
            client={client} 
          />
  
          <div className='my-4'>
            {generatedImage ? (
              <MediaRenderer 
                client={client}
                className='w-[300px] h-[300px] rounded-lg'
                src={generatedImage} 
                alt="Generated NFT" />
            ) : (
              <div className='w-[300px] h-[250px] rounded-lg border border-gray-700 p-4 mb-4 border-dashed flex justify-center items-center text-center'>
                <p className="text-gray-500">{isGenerating ? "Generating image..." : "Let's prompt and generate your creation"}</p>
              </div>
            )}
          </div>
  

            
          <form onSubmit={handleGenerateAndMint}>
            {!isGenerating || isMinting ? 
              (<div>
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter image prompt..."
                    className="w-full px-4 py-2 rounded border border-white bg-stone-950 my-3"
                  />
          
                  <button
                    type="submit"
                    disabled={!prompt || isGenerating || isMinting}
                    className="w-full bg-gray-950 text-white px-4 py-2 rounded mb-8 cursor-pointer"
                  >
                    {isGenerating ? "Generating..." : isMinting ? "Minting..." : "Generate and Mint"}
                  </button>
              </div>)
            : (<div className='p-5'>
                <button onClick={handleGenerateAnother} className="w-full bg-gray-950 text-white px-4 py-2 rounded mb-8">Generate another NFT</button>
              </div>)
        }
        </form>


        <NFTCollection nfts={nfts} />
      </div>
    );
  }
  
};

export default AIGenerator;
