import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import TopBanner from "../components/home/TopBanner";

const Home = () => {
  const { theme } = useContext(themeContext);
  const mainContainerClasses =
    "w-full flex flex-col items-center mt-2 rounded p-6 min-h-[70vh]";
  const mainThemeClasses =
    theme === "dark"
      ? "bg-gradient-to-t from-third to-dark"
      : "bg-gradient-to-t from-light-100 to-light-200";
  return (
    <main className={`${mainContainerClasses} ${mainThemeClasses}`}>
      <TopBanner />
    </main>
  );
};

export default Home;
