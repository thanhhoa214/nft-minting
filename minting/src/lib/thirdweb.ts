import { createThirdwebClient, getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";

export const contractAddress = "0xADaB00e8261b5DeE9e0BF98811966d5a1Bc050b1";
export const thirdwebClient = createThirdwebClient({
  clientId: "d367550fec701ae0e3590625da63c486",
});

export const contract = getContract({
  client: thirdwebClient,
  chain: sepolia,
  address: contractAddress,
});
