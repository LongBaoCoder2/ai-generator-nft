"use client";

import { client } from "@/app/client";
import React from "react";
import { NFT } from "thirdweb";
import { MediaRenderer } from "thirdweb/react";

type NFTCollectionProps = {
  nfts: NFT[];
};

const NFTCollection = ({ nfts }: NFTCollectionProps) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <h2 className="text-xl font-semibold">AI Collection:</h2>

      <div className="grid grid-cols-4 gap-4">
        {nfts && nfts.length > 0 ? (
          nfts.map((nft) => (
            <div key={nft.id} className="aspect-square relative">
              <MediaRenderer client={client} src={nft.tokenURI} />
            </div>
          ))
        ) : (
          <div>
            <h3>No NFT Yet.</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default NFTCollection;
