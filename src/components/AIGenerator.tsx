"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  ConnectButton,
  MediaRenderer,
  useActiveAccount,
  useReadContract,
} from "thirdweb/react";
import { client } from "@/app/client";
import NFTCollection from "./NFTCollection";
import {
  getNFTs,
  getOwnedNFTs,
  ownerOf,
  totalSupply,
} from "thirdweb/extensions/erc721";
import { contract } from "@/utils/contracts";
import { upload } from "thirdweb/storage";
import { NFT } from "thirdweb";
import { chain } from "@/app/chain";

interface AIGeneration {
  id: number;
  imageUrl: string;
}

const AIGenerator: React.FC = () => {
  const account = useActiveAccount();
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  // const [nfts, setOwnedNFTs] = useState<NFT[] | null>(null);

  // const getOwnedNFTs = useCallback(async () => {
  //   console.log("Start getNFT");

  //   try {
  //     const ownedNFTs: NFT[] = [];
  //     const totalNFTSupply = await totalSupply({ contract });
  //     console.log(`Total Supply: ${totalNFTSupply}`);

  //     const nfts = await getNFTs({
  //       contract: contract,
  //       start: 0,
  //       count: parseInt(totalNFTSupply.toString()),
  //     });

  //     console.log(`nfts: ${JSON.stringify(nfts)}`);

  //     for (let nft of nfts) {
  //       const owner = await ownerOf({
  //         contract: contract,
  //         tokenId: nft.id,
  //       });
  //       if (owner === account?.address) {
  //         ownedNFTs.push(nft);
  //       }
  //     }
  //     console.log(`ownedNFTs: ${JSON.stringify(ownedNFTs)}`);

  //     setOwnedNFTs(ownedNFTs);
  //   } catch (error) {
  //     console.error("Error fetching NFTs:", error);
  //     setOwnedNFTs([]);
  //   }
  // }, [account]);

  // const fetchNFT = useCallback(async () => {
  //   if (account) {
  //     await getOwnedNFTs();
  //   }
  // }, [account, getOwnedNFTs]);

  // useEffect(() => {
  //   let isSubscribed = true;

  //   fetchNFT().catch(console.error);

  //   return () => {
  //     isSubscribed = false;
  //   };
  // }, [fetchNFT]);

  const { data: nfts, refetch: refetchNFTs } = useReadContract(getNFTs, {
    contract: contract,
    count: 1,
  });

  // setOwnedNFTs(data || []);
  console.log(`getNFTs: ${nfts}`);

  const ownedNFTs = useReadContract(getOwnedNFTs, {
    contract,
    owner: account?.address || "",
  });
  console.log(`ownedNFTs: ${ownedNFTs.data}`);

  const handleGenerateAndMint = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) {
        throw new Error("Failed to generate image.");
      }

      const data = await res.json();
      const imageBlob = await fetch(data.data[0].asset_url).then((img) =>
        img.blob()
      );
      const imageFile = new File([imageBlob], "image.png", {
        type: "image/png",
      });
      console.log(imageFile);

      const imageUri = await upload({ client: client, files: [imageFile] });

      console.log(imageUri);
      setGeneratedImage(imageUri);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateAnother = () => {
    if (!isGenerating || !isMinting) {
      return;
    }

    setPrompt("");
    setGeneratedImage(null);
  };

  if (account) {
    return (
      <div className="flex flex-col items-center gap-4 p-5">
        <ConnectButton client={client} chain={chain} />

        <div className="my-4">
          {generatedImage ? (
            <MediaRenderer
              client={client}
              className="w-[300px] h-[300px] rounded-lg"
              src={generatedImage}
              alt="Generated NFT"
            />
          ) : (
            <div className="w-[300px] h-[250px] rounded-lg border border-gray-700 p-4 mb-4 border-dashed flex justify-center items-center text-center">
              <p className="text-gray-500">
                {isGenerating
                  ? "Generating image..."
                  : "Let's prompt and generate your creation"}
              </p>
            </div>
          )}
        </div>

        <form onSubmit={handleGenerateAndMint}>
          {!isGenerating || isMinting ? (
            <div>
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
                {isGenerating
                  ? "Generating..."
                  : isMinting
                  ? "Minting..."
                  : "Generate and Mint"}
              </button>
            </div>
          ) : (
            <div className="p-5">
              <button
                onClick={handleGenerateAnother}
                className="w-full bg-gray-950 text-white px-4 py-2 rounded mb-8"
              >
                Generate another NFT
              </button>
            </div>
          )}
        </form>

        <NFTCollection nfts={nfts!} />
      </div>
    );
  }
};

export default AIGenerator;
