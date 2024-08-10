"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ConnectButton, MediaRenderer, useActiveAccount } from 'thirdweb/react';
import { client } from '@/app/client';
import NFTCollection from './NFTCollection';

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

  // const [aiGenerations, setAiGenerations] = useState<AIGeneration[]>([
    // { id: 1, imageUrl: '/path-to-image-1.jpg' },
    // { id: 2, imageUrl: '/path-to-image-2.jpg' },
    // { id: 3, imageUrl: '/path-to-image-3.jpg' },
    // { id: 4, imageUrl: '/path-to-image-4.jpg' },
    // { id: 5, imageUrl: '/path-to-image-5.jpg' },
    // { id: 6, imageUrl: '/path-to-image-6.jpg' },
    // { id: 7, imageUrl: '/path-to-image-7.jpg' },
    // { id: 8, imageUrl: '/path-to-image-8.jpg' },
  // ]);

  const handleSwitchNetwork = () => {
    // Implement network switching logic
    console.log('Switching network...');
  };

  const handleGenerateAndMint = async () => {
    console.log('Generating and minting with prompt:', prompt);
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
(            <div>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter image prompt..."
                className="w-full px-4 py-2 rounded border border-white bg-stone-950"
              />
      
              <button
                type="submit"
                disabled={!prompt || isGenerating || isMinting}
                className="w-full bg-gray-950 text-white px-4 py-2 rounded mb-8"
              >
                {isGenerating ? "Generating..." : isMinting ? "Minting..." : "Generate and Mint"}
              </button>
          </div>)
          : (<div>
              <button onClick={handleGenerateAnother} className="w-full bg-gray-950 text-white px-4 py-2 rounded mb-8">Generate another NFT</button>
            </div>)
        }
        </form>
          {/* <NFTCollection nfts={}/> */}
      </div>
    );
  }
  
};

export default AIGenerator;
