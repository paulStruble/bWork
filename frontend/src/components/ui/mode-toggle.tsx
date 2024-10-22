import { useTheme } from "next-themes";
import { Button } from "./button";
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}
        className="absolute m-5 rounded-lg top-0 z-10 right-0 outline-none border-none shadow-none"
        >
        <LightModeIcon 
          className="absolute h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" 
        />
        <DarkModeIcon 
          className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
        />
      </Button>
    </>
  );
}

export default ModeToggle;