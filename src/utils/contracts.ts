// This project uses sepolia chain 
import { chain } from "@/app/chain";
import { client } from "@/app/client";
import { getContract } from "thirdweb";

const NFTCollectionContractAddress = process.env.NFT_COLLECTION_CONTRACT_ADDRESS as string;

export const contract = getContract({
    client: client,
    chain: chain,
    address: NFTCollectionContractAddress
})