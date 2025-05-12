import { FunctionComponent, useContext, useEffect } from "react";
import { themeContext } from "../context/ThemeContext";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";
import { t } from "i18next";

const ConfirmAccount: FunctionComponent = () => {
  const { theme } = useContext(themeContext);
  const mainContainerClasses =
    "w-full h-screen flex flex-col items-center mt-2 rounded";
  const mainThemeClasses =
    theme === "dark"
      ? "bg-gradient-to-t from-third to-dark"
      : "bg-gradient-to-t from-light-100 to-light-200";
  const cardContainerClasses =
    "w-3/4 flex flex-col mt-2 rounded-xl p-6 border outline mt-12 ";
  const image = "w-full h-32 rounded-xl object-cover";
  const cardThemeClasses = `${
    theme === "dark"
      ? "bg-gradient-to-t from-third to-dark outline-fourth border-light-100 hover:shadow-gray-800"
      : "bg-gradient-to-t from-light-100 to-light-20 outline-light-200 hover:shadow-gray-400"
  }`;
  const h2 = "font-bold text-center";
  const linkContainerClasses =
    "px-4 py-2 rounded font-semibold hover:bg-opacity-80 transition duration-300 mt-2 text-center";
  const linkThemeClasses =
    theme === "dark" ? "bg-first text-dark" : "bg-second text-light-100";

  useEffect(() => {
    confetti({
      particleCount: 300,
      spread: 360,
      origin: { y: 0.6 },
      colors: ["#CCE8CC", "#3B7080", "#141b1f", "#8a8a8a", "#E3E3E3"],
      shapes: ["square", "circle"],
    });
  }, []);

  return (
    <main className={`${mainContainerClasses} ${mainThemeClasses}`}>
      <div className={`${cardContainerClasses} ${cardThemeClasses}`}>
        <img
          src="https://lh3.googleusercontent.com/pw/AP1GczO3HFM9jP49EiN1CPDcUXMKFjdP7OG_UCOcoPaquLjJN_pilA3P53hxjKE6kGyoUruJ1LL4qdeNtbYlzx-BYifTN8Z9XLWhmoB8XxoB7myhbrL8doJQZxY2gMA1993xyaAmlXZp75K9dgg3rO2mnATv=w1366-h287-s-no-gm"
          alt=""
          className={`${image}`}
        />
      </div>
      <div className={`${cardContainerClasses} ${cardThemeClasses}`}>
        <h2 className={h2}>
          {t("authentication.register.confirmAccount.title")}
        </h2>
        <p className="text-center">
          {t("authentication.register.confirmAccount.description")}
        </p>
        <Link
          to={"/login"}
          className={`${linkContainerClasses} ${linkThemeClasses}`}
        >
          {t("authetication.login.title")}
        </Link>
      </div>
    </main>
  );
};

export default ConfirmAccount;
