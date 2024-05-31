import { contract } from "@/lib/thirdweb";
import { PromiseType } from "@/lib/types";
import { useEffect, useState } from "react";
import { getAllOwners } from "thirdweb/extensions/erc721";

export function useOwners() {
  const [loading, setLoading] = useState(false);
  const [owners, setOwners] = useState<
    PromiseType<ReturnType<typeof getAllOwners>>
  >([]);

  useEffect(() => {
    setLoading(true);
    getAllOwners({ contract })
      .then((owners) => {
        const uniqueOwners = owners.filter(
          (owner, index, self) =>
            index === self.findIndex((t) => t.owner === owner.owner)
        );
        setOwners(uniqueOwners);
      })
      .finally(() => setLoading(false));
  }, []);

  return { loading, owners };
}
