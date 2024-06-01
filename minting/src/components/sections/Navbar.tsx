import { cn } from "@/lib/utils";
import { Home, Palette, PencilRulerIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", route: "/" },
  { icon: Palette, label: "Listing", route: "/nfts" },
  { icon: PencilRulerIcon, label: "Mint", route: "/mint" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <div className="flex flex-col pt-5 md:w-24">
      <Link
        to={"/"}
        className="hidden md:flex flex-col items-center flex-shrink-0 px-2"
      >
        <img src="/logo.svg" />
        <strong>Phenon</strong>
      </Link>

      <div className="hidden md:block px-4 my-4">
        <hr className="border-primary/400" />
      </div>

      <nav className="flex-1 p-1 fixed bottom-0 left-0 w-full bg-primary/30 z-20 rounded-t-lg md:static md:p-3 backdrop-filter backdrop-blur-md md:bg-transparent">
        <ul className="flex justify-center md:flex-col md:space-y-4">
          {navItems.map((item) => (
            <li key={item.route}>
              <Link
                to={item.route}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-2.5 text-xs font-medium transition-all duration-200 rounded-lg",
                  ((location.pathname === item.route && item.route === "/") ||
                    (item.route !== "/" &&
                      location.pathname.includes(item.route))) &&
                    "bg-primary text-white"
                )}
              >
                <item.icon />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
