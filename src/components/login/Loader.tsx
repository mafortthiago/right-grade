import React, { useContext } from "react";
import { PropagateLoader } from "react-spinners";
import { themeContext } from "../../context/ThemeContext";

const Loader: React.FC = () => {
  const { theme } = useContext(themeContext);
  return (
    <div
      className={`flex items-center justify-center min-h-screen ${
        theme == "dark" ? "bg-third" : "bg-light-100"
      }`}
    >
      <PropagateLoader color={`${theme == "dark" ? "#CCE8CC" : "#3B7080"}`} />
    </div>
  );
};

export default Loader;
