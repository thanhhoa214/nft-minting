import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AllNftListing() {
  return (
    <div>
      <header className="flex justify-between items-center pl-2">
        <h2 className="text-xl font-semibold">Top NFTs minted today</h2>
        <div className="flex items-center gap-2">
          <Button variant={"outline"} className="w-8 h-8 p-1 rounded-full">
            <ChevronLeft size={16} />
          </Button>
          <Button variant={"outline"} className="w-8 h-8 p-1 rounded-full">
            <ChevronRight size={16} />
          </Button>
          <Link to="/listing">
            <Button variant={"link"}>View all</Button>
          </Link>
        </div>
      </header>
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <div className="max-w-60">
              <AspectRatio ratio={12 / 9} className="overflow-hidden">
                <img src="/cute-penguin.png" alt="Cute Penguin" />
              </AspectRatio>
              <div className="flex justify-between items-center pt-2">
                <div>
                  <h3 className="font-semibold">Cute Penguin</h3>
                  <p className="text-sm text-muted-foreground -mt-1">
                    by John Doe
                  </p>
                </div>
                <Avatar>
                  <AvatarImage src="/eth-logo.png" />
                  <AvatarFallback>ETH</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}
