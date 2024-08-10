// This project uses sepolia chain 
import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";

const NFTCollectionContractAddress = process.env.NFT_COLLECTION_CONTRACT_ADDRESS as string;

export const contract = getContract({
    client: client,
    chain: sepolia,
    address: NFTCollectionContractAddress
})

