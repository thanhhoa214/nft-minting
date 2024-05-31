import "./App.css";
import { ThirdwebProvider } from "thirdweb/react";
import Navbar from "./components/sections/Navbar";
import Toolbar from "./components/sections/Toolbar";

function App() {
  return (
    <ThirdwebProvider>
      <div className="min-h-[100vh] flex">
        <Navbar />
        <main className="p-4 border-l flex-grow">
          <Toolbar />
        </main>
      </div>
    </ThirdwebProvider>
  );
}

export default App;
