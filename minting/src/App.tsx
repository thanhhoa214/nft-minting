import "./App.css";
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "./components/sections/Navbar";
import Toolbar from "./components/sections/Toolbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <ThirdwebProvider>
      <div className="min-h-[100vh] flex flex-col-reverse pb-16 md:flex-row md:pb-0">
        <Navbar />
        <main className="p-4 border-l border-primary/20 flex-grow space-y-8">
          <Toolbar />
          <Outlet />
        </main>
      </div>
      <Toaster />
    </ThirdwebProvider>
  );
}

export default App;
