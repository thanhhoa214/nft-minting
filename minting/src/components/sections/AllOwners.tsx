import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { CheckCircle, Copy } from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import { shortenAddress } from "thirdweb/utils";
import { useCopyToClipboard } from "usehooks-ts";
import { useToast } from "../ui/use-toast";
import { useOwners } from "@/hooks/useOwners";
import { Link } from "react-router-dom";

export default function AllOwners() {
  const { toast } = useToast();
  const { loading, owners } = useOwners();
  const [, copy] = useCopyToClipboard();

  const copyToClipboard = async (text: string) => {
    await copy(text);
    toast({
      description: (
        <p className="flex gap-2 items-center">
          <CheckCircle size={20} /> Address copied to clipboard
        </p>
      ),
      variant: "success",
    });
  };

  return (
    <Carousel>
      <header className="flex justify-between items-center pl-2 mb-2">
        <h2 className="text-xl font-semibold">HODLers</h2>
        <div className="flex items-center gap-2">
          <CarouselPrevious className="relative left-0 top-0 translate-y-0" />
          <CarouselNext className="relative left-0 top-0 translate-y-0" />
        </div>
      </header>
      <CarouselContent>
        {loading
          ? Array.from({ length: 4 }, (_, index) => (
              <CarouselItem
                className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6"
                key={index}
              >
                <div className=" border border-solid rounded-lg p-2 pb-3">
                  <Skeleton className="h-8 w-full" />
                  <div className="flex justify-end items-center gap-2 mt-2">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </CarouselItem>
            ))
          : owners.map((owner) => (
              <CarouselItem
                key={owner.owner}
                className="md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 rounded-lg"
              >
                <div className=" border border-solid rounded-lg p-2 pb-3">
                  <p className="p-2 text-right">
                    {shortenAddress(owner.owner, 9)}
                  </p>
                  <div className="flex justify-end items-center gap-2">
                    <Link to={`/nfts/${owner.owner}`}>
                      <Button size={"sm"}>View NFTs</Button>
                    </Link>
                    <Button
                      variant="outline"
                      size={"icon"}
                      className="gap-1 w-9 h-9"
                      title="Copy address"
                      onClick={() => copyToClipboard(owner.owner)}
                    >
                      <Copy size={16} />
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
      </CarouselContent>
    </Carousel>
  );
}
