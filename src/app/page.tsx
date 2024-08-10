import { ConnectEmbed } from "thirdweb/react";
import { client } from "./client";
import AIGenerator from "@/components/AIGenerator";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center gap-8 m-[20px]">

        <header className="font-bold text-5xl">
          <h1>
            AI Generator with NFT
          </h1>
        </header>

        <main>
          <ConnectEmbed client={client}/>
        </main>

        <AIGenerator />
    </div>
  );
}
