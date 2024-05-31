import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getOwnedNFTs } from "thirdweb/extensions/erc721";
import { contract, thirdwebClient } from "@/lib/thirdweb";
import { useEffect, useState } from "react";
import { NFT } from "thirdweb";
import { shortenAddress } from "thirdweb/utils";
import { MediaRenderer } from "thirdweb/react";
import { Skeleton } from "../ui/skeleton";
import { useActiveAccount } from "thirdweb/react";

export default function MyNftList() {
  const [loading, setLoading] = useState(false);
  const activeAccount = useActiveAccount();
  const [nfts, setNfts] = useState<NFT[]>([]);

  useEffect(() => {
    if (!activeAccount) return;
    setLoading(true);
    getOwnedNFTs({ contract, owner: activeAccount.address })
      .then(setNfts)
      .finally(() => setLoading(false));
  }, []);
  return <div>MyNftList</div>;
}
