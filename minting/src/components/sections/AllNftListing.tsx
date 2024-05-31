import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { thirdwebClient } from "@/lib/thirdweb";
import { shortenAddress } from "thirdweb/utils";
import { MediaRenderer } from "thirdweb/react";
import { Skeleton } from "../ui/skeleton";
import { useNfts } from "@/hooks/useNfts";

export default function AllNftListing() {
  const { loading, nfts } = useNfts();

  return (
    <Carousel>
      <header className="flex justify-between items-center pl-2 mb-2">
        <h2 className="text-xl font-semibold">
          Top NFTs <span className="hidden md:inline">minted today</span>
        </h2>
        <div className="flex items-center gap-2">
          <CarouselPrevious className="relative left-0 top-0 translate-y-0" />
          <CarouselNext className="relative left-0 top-0 translate-y-0" />
          <Link to="/nfts">
            <Button variant={"link"}>View all</Button>
          </Link>
        </div>
      </header>
      <CarouselContent>
        {loading
          ? Array.from({ length: 6 }, (_, index) => (
              <CarouselItem
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
                key={index}
              >
                <div className="max-w-60">
                  <Skeleton className="w-full h-40" />
                  <div className="pt-2">
                    <div className="mb-3">
                      <Skeleton className="h-5 w-2/3 mb-2" />
                      <Skeleton className="h-4 w-1/2 " />
                    </div>
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </CarouselItem>
            ))
          : nfts.map((nft) => (
              <CarouselItem
                key={nft.id}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 rounded-lg cursor-pointer"
              >
                <div className="max-w-60">
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
                </div>
              </CarouselItem>
            ))}
      </CarouselContent>
    </Carousel>
  );
}
