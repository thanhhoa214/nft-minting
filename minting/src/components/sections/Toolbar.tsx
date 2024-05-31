import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Images, Settings } from "lucide-react";
import { ConnectButton, darkTheme, useActiveAccount } from "thirdweb/react";
import { thirdwebClient } from "@/lib/thirdweb";
import ThemeToggler from "./ThemeToggler";
import { Link } from "react-router-dom";

export default function Toolbar() {
  const activeAccount = useActiveAccount();

  return (
    <div className="flex justify-between items-center gap-4">
      <Input
        placeholder="Search NFTs, address, owner, ..."
        className="w-full max-w-sm hidden md:block"
      />

      <div className="w-full md:w-fit flex justify-between items-center gap-2">
        {activeAccount && (
          <Link to={"/nfts/" + activeAccount.address} className="mr-auto">
            <Button className="hidden md:block">My Portfolio</Button>
            <Button size={"icon"} className="md:hidden">
              <Images />
            </Button>
          </Link>
        )}

        <Button size={"icon"} variant={"ghost"}>
          <Settings />
        </Button>
        <ThemeToggler />

        <ConnectButton
          client={thirdwebClient}
          theme={darkTheme({
            colors: { accentText: "#a22fee", accentButtonBg: "#a22fee" },
          })}
          connectButton={{
            className:
              "!bg-gradient-to-br from-purple-500 to-blue-500 !text-white ml-2",
          }}
          appMetadata={{
            name: "Phenon",
            url: "https://example.com",
          }}
        />
      </div>
    </div>
  );
}
