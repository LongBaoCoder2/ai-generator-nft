import { createThirdwebClient } from "thirdweb"

// refer to https://portal.thirdweb.com/typescript/v5/client on how to get a client ID
const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
if (!clientId) {
    throw new Error("Client ID is not provided.");
}


export const client = createThirdwebClient({
    clientId: clientId
});