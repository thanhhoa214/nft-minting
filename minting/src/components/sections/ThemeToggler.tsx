import { useDarkMode } from "usehooks-ts";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useEffect } from "react";

export default function ThemeToggler() {
  const { isDarkMode, toggle } = useDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <Button size={"icon"} variant={"ghost"} onClick={toggle}>
      {isDarkMode ? <Sun /> : <Moon />}
    </Button>
  );
}
