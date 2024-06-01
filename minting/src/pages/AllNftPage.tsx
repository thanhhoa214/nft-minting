import { contract, thirdwebClient } from "@/lib/thirdweb";
import { shortenAddress } from "thirdweb/utils";
import {
  MediaRenderer,
  useActiveAccount,
  useSendTransaction,
} from "thirdweb/react";
import { Skeleton } from "@/components/ui/skeleton";
import { Link, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useOwners } from "@/hooks/useOwners";
import { useNfts } from "@/hooks/useNfts";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { burn, transferFrom } from "thirdweb/extensions/erc721";
import { Gift, Trash2 } from "lucide-react";
import { NFT, waitForReceipt } from "thirdweb";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { sepolia } from "thirdweb/chains";
import { sepoliaEtherscanUrl } from "@/lib/constants";

export default function AllNftPage() {
  const { loading: nftLoading, nfts, refreshNfts } = useNfts();
  const { loading: ownerLoading, owners } = useOwners();
  const activeAccount = useActiveAccount();
  const { toast } = useToast();
  const address = useParams().address;
  const [showTransferAlert, setShowTransferAlert] = useState(false);
  const [showBurnAlert, setShowBurnAlert] = useState(false);
  const [destinationAddress, setDestinationAddress] = useState("");
  const [selectedNft, setSelectedNft] = useState<NFT>();
  const [selectedOwner, setSelectedOwner] = useState<string>(address || "all");
  const { mutateAsync: sendTransaction } = useSendTransaction();

  const filteredNfts = nfts.filter((nft) =>
    selectedOwner === "all" ? true : nft.owner === selectedOwner
  );

  const transferNft = async () => {
    if (!selectedNft || !destinationAddress) return;
    if (!selectedNft.owner) return;
    try {
      const preparedTx = transferFrom({
        contract,
        from: selectedNft.owner,
        to: destinationAddress,
        tokenId: selectedNft.id,
      });
      const { transactionHash } = await sendTransaction(preparedTx);
      await waitForReceipt({
        client: thirdwebClient,
        chain: sepolia,
        transactionHash,
      });
      toast({
        description: (
          <p>
            Transaction has been confirmed. NFT has been transfered to{" "}
            <Link to={`${sepoliaEtherscanUrl}/address/${destinationAddress}`}>
              {shortenAddress(destinationAddress)}
            </Link>{" "}
            successfully. Check the transaction on{" "}
            <Link
              to={`${sepoliaEtherscanUrl}/tx/${transactionHash}`}
              className="font-semibold"
            >
              Etherscan
            </Link>
            .
          </p>
        ),
        variant: "success",
      });
      refreshNfts();
    } catch (error) {
      toast({
        description: (
          <p>
            Transaction failed. Please check if the address is valid and try
            again.
          </p>
        ),
        variant: "destructive",
      });
    }
  };

  const burnNft = async () => {
    if (!selectedNft) return;
    const preparedTx = burn({ contract, tokenId: selectedNft.id });
    const { transactionHash } = await sendTransaction(preparedTx);
    await waitForReceipt({
      client: thirdwebClient,
      chain: sepolia,
      transactionHash,
    });
    toast({
      description: (
        <p>
          Transaction has been confirmed. NFT burned successfully. Check the
          transaction on{" "}
          <Link to={`${sepoliaEtherscanUrl}/tx/${transactionHash}`}>
            Etherscan
          </Link>
          .
        </p>
      ),
      variant: "success",
    });
    refreshNfts();
  };

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-4xl font-bold">
          All NFTs{" "}
          {!nftLoading && (
            <span className="text-base text-foreground/60">
              ({nfts.length} items)
            </span>
          )}
        </h1>

        {!ownerLoading && (
          <div>
            <Select value={selectedOwner} onValueChange={setSelectedOwner}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"all"}>All owners</SelectItem>
                {owners.map((owner) => (
                  <SelectItem key={owner.owner} value={owner.owner}>
                    {shortenAddress(owner.owner)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </header>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {nftLoading
          ? Array.from({ length: 8 }, (_, index) => (
              <li key={index}>
                <Skeleton className="w-full h-40" />
                <div className="pt-2">
                  <div className="mb-3">
                    <Skeleton className="h-5 w-2/3 mb-2" />
                    <Skeleton className="h-4 w-1/2 " />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </li>
            ))
          : filteredNfts.map((nft) => (
              <li key={nft.id}>
                <MediaRenderer
                  client={thirdwebClient}
                  src={nft.metadata.image}
                  className="!w-full !h-40 aspect-square object-cover rounded-lg"
                  style={{
                    backgroundColor: nft.metadata.background_color
                      ? nft.metadata.background_color
                      : "#00000070",
                  }}
                />
                <div className="pt-2 space-y-2">
                  <div>
                    <h3 className="font-semibold">{nft.metadata.name}</h3>
                    <p className="text-sm">
                      by {nft.owner ? shortenAddress(nft.owner) : "unknown"}
                    </p>
                  </div>
                  {nft.metadata.description && (
                    <p className="text-sm text-muted-foreground h-10">
                      {nft.metadata.description.length > 50
                        ? nft.metadata.description.slice(0, 50) + "..."
                        : nft.metadata.description}
                    </p>
                  )}
                  {activeAccount?.address === nft.owner && (
                    <div className="flex justify-end gap-1">
                      <Button
                        size={"sm"}
                        className="gap-1"
                        onClick={() => {
                          setShowTransferAlert(true);
                          setSelectedNft(nft);
                        }}
                      >
                        <Gift size={20} />
                        Gift a friend
                      </Button>
                      <Button
                        size={"sm"}
                        variant={"destructiveGhost"}
                        onClick={() => {
                          setShowBurnAlert(true);
                          setSelectedNft(nft);
                        }}
                        className="gap-1"
                      >
                        <Trash2 size={20} /> Burn
                      </Button>
                    </div>
                  )}
                </div>
              </li>
            ))}
      </ul>

      <AlertDialog open={showBurnAlert} onOpenChange={setShowBurnAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. You will be unable to access the NFT
              forever.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => burnNft()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showTransferAlert} onOpenChange={setShowTransferAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            {selectedNft && (
              <MediaRenderer
                client={thirdwebClient}
                src={selectedNft.metadata.image}
                className="!w-full !h-40 aspect-square object-cover rounded-lg"
                style={{
                  backgroundColor: selectedNft.metadata.background_color
                    ? selectedNft.metadata.background_color
                    : "#00000070",
                }}
              />
            )}
            <AlertDialogTitle>
              You are going to transfer this NFT to this address
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. You will be unable to regain the
              authority of the NFT.
            </AlertDialogDescription>
            <Input
              placeholder="Destination address, it must be an ETH address"
              className="mt-4"
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
            />
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => transferNft()}>
              Transfer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
