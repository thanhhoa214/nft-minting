import { NFT } from "thirdweb";
import { thirdwebClient } from "@/lib/thirdweb";
import { shortenAddress } from "thirdweb/utils";
import { MediaRenderer } from "thirdweb/react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface NftProperty {
  trait_type: string;
  value: string;
}

export default function NftDetail({
  nft,
  className,
}: {
  nft: NFT;
  className?: string;
}) {
  console.log(nft);
  const properties = nft.metadata.properties as unknown as NftProperty[];

  return (
    <div className={cn("space-y-4", className)}>
      <MediaRenderer
        client={thirdwebClient}
        src={nft.metadata.image}
        className="!w-full object-cover rounded-lg"
        style={{
          backgroundColor: nft.metadata.background_color
            ? nft.metadata.background_color
            : "#00000070",
        }}
      />
      <div className="pt-2 space-y-2">
        <div>
          <h3 className="text-2xl font-bold">
            {nft.metadata.name} #{nft.id.toString()}
          </h3>
          <p>{nft.owner ? shortenAddress(nft.owner) : "unknown"}</p>
        </div>

        <Link to={`https://sepolia.etherscan.io/address/${nft.owner}`}>
          <Button>View contract</Button>
        </Link>
      </div>

      {nft.metadata.description && (
        <div>
          <h2 className="text-lg font-medium">Description</h2>
          <p className="text-muted-foreground">{nft.metadata.description}</p>
        </div>
      )}

      {properties && (
        <div>
          <h2 className="text-lg font-medium">Properties</h2>
          <ul className="list-disc list-inside text-muted-foreground">
            {properties.map(({ trait_type, value }) => (
              <li key={value}>
                <strong>{trait_type}</strong>: {value}
              </li>
            ))}
          </ul>
        </div>
      )}

      {nft.metadata.background_color && (
        <div>
          <h2 className="text-lg font-medium mb-1">Background Color</h2>
          <div
            className="w-fit py-2 px-4 rounded-lg text-primary"
            style={{ backgroundColor: nft.metadata.background_color }}
          >
            {nft.metadata.background_color}
          </div>
        </div>
      )}

      {nft.metadata.external_url && (
        <div>
          <h2 className="text-lg font-medium">External URL</h2>
          <a href={nft.metadata.external_url} target="_blank" rel="noreferrer">
            {nft.metadata.external_url}
          </a>
        </div>
      )}

      {nft.metadata.animation_url && (
        <div>
          <h2 className="text-lg font-medium">Animation URL</h2>
          <a href={nft.metadata.animation_url} target="_blank" rel="noreferrer">
            {nft.metadata.animation_url}
          </a>
        </div>
      )}
    </div>
  );
}
