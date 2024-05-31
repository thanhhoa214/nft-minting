import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import { ConnectButton, darkTheme } from "thirdweb/react";
import { thirdwebClient } from "@/lib/thirdweb";
import ThemeToggler from "./ThemeToggler";

export default function Toolbar() {
  return (
    <div className="flex justify-between">
      <Input
        placeholder="Search NFTs, address, owner, ..."
        className="w-full max-w-sm"
      />

      <div className="flex items-center gap-2">
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
