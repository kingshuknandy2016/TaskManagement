import { useTheme } from "../context/ThemeContext";
import { IconButton } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <IconButton
      onClick={toggleTheme}
      color="inherit"
      aria-label="toggle theme"
      className="hover:bg-gray-100 dark:hover:bg-gray-800"
    >
      {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
  );
};

export default ThemeToggle;
