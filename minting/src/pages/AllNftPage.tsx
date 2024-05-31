import { thirdwebClient } from "@/lib/thirdweb";
import { shortenAddress } from "thirdweb/utils";
import { MediaRenderer } from "thirdweb/react";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "react-router-dom";
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

export default function AllNftPage() {
  const { loading: nftLoading, nfts } = useNfts();
  const { loading: ownerLoading, owners } = useOwners();
  const address = useParams().address;
  const [selectedOwner, setSelectedOwner] = useState<string>(address || "");

  const filteredNfts = nfts.filter((nft) =>
    selectedOwner ? nft.owner === selectedOwner : true
  );

  return (
    <div>
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold">
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
                    <p className="text-sm text-muted-foreground">
                      {nft.metadata.description.length > 50
                        ? nft.metadata.description.slice(0, 50) + "..."
                        : nft.metadata.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
      </ul>
    </div>
  );
}
