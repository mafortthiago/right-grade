import { useContext } from "react";
import { themeContext } from "../context/ThemeContext";

const Home = () => {
  const { theme } = useContext(themeContext);
  return (
    <main
      className={
        "h-screen w-full mt-2 rounded " +
        (theme === "dark" ? "bg-third" : "bg-light-200")
      }
    >
      home
    </main>
  );
};

export default Home;
