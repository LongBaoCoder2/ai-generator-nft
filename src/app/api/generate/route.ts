import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    const imagePrompt = await req.json();

    if (!imagePrompt) {
        return {
            status: 400,
            body: "Image Prompt is not provided. Make sure you enter the prompt."
        };
    }
    console.log(imagePrompt);

    try {
        const resp = await fetch(
            `https://api.limewire.com/api/image/generation`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'X-Api-Version': 'v1',
                Accept: 'application/json',
                Authorization: `Bearer ${process.env.LIMEWIRE_API_KEY}`
              },
              body: JSON.stringify({
                prompt: imagePrompt.prompt,
                aspect_ratio: '1:1'
              })
            }
          );
        
          const data = await resp.json();
          console.log(data);
          return new Response(data);
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({
            error: "Failed to call api to server.",
            status: 500, 
            header: {
                'Content-type': 'application/json'
            }
        }))

    }
}