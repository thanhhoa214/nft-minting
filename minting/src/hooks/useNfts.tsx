import { contract } from "@/lib/thirdweb";
import { PromiseType } from "@/lib/types";
import { useEffect, useState } from "react";
import { getNFTs } from "thirdweb/extensions/erc721";

export function useNfts() {
  const [loading, setLoading] = useState(false);
  const [nfts, setNfts] = useState<PromiseType<ReturnType<typeof getNFTs>>>([]);
  const fetchNfts = () => {
    setLoading(true);
    getNFTs({ contract, includeOwners: true })
      .then(setNfts)
      .finally(() => setLoading(false));
  };

  useEffect(() => fetchNfts(), []);

  return { loading, nfts, refreshNfts: fetchNfts };
}
