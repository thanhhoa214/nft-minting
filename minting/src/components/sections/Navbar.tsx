import { cn } from "@/lib/utils";
import { Home, Palette } from "lucide-react";
import { useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", route: "/" },
  { icon: Palette, label: "Listing", route: "/nfts" },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <div className="flex flex-col pt-5 w-24">
      <div className="flex flex-col items-center flex-shrink-0 px-2">
        <img src="/logo.svg" />
        <strong>Phenon</strong>
      </div>

      <div className="px-4 my-4">
        <hr className="border-gray-200" />
      </div>

      <div className="flex flex-col flex-1 px-3">
        <nav className="flex-1 space-y-2">
          <ul>
            {navItems.map((item) => (
              <li key={item.route}>
                <a
                  href="#"
                  className={cn(
                    "flex flex-col items-center gap-1 px-4 py-2.5 text-xs font-medium transition-all duration-200 rounded-lg",
                    location.pathname === item.route && "bg-primary text-white"
                  )}
                >
                  <item.icon />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="pb-4 mt-20">
          <button
            type="button"
            className="flex flex-col items-center justify-between w-full p-2 text-sm font-medium text-gray-900 transition-all duration-200 rounded-lg hover:bg-gray-100"
          >
            <img
              className="flex-shrink-0 object-cover w-10 h-10 rounded-full"
              src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/vertical-menu/2/avatar-male.png"
              alt=""
            />
            Jacob
          </button>
        </div>
      </div>
    </div>
  );
}
