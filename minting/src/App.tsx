import "./App.css";
import { ThirdwebProvider, ConnectButton } from "thirdweb/react";
import { thirdwebClient } from "./lib/thirdweb";

function App() {
  return (
    <ThirdwebProvider>
      <main className="p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
        <div className="py-20">

          <div className="flex justify-center mb-20">
            <ConnectButton
              client={thirdwebClient}
              appMetadata={{
                name: "Example app",
                url: "https://example.com",
              }}
            />
          </div>
        </div>
      </main>
    </ThirdwebProvider>
  );
}

export default App;
