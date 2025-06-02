import { useContext } from "react";
import { useTranslation } from "react-i18next";
import CustomLink from "./CustomLink";
import { themeContext } from "../context/ThemeContext";
import useMobileDetect from "../hooks/useMobileDetected";
import { BsXLg } from "react-icons/bs";
import { IMenusContext } from "../context/MenusContext";
import { useAuthStore } from "../store/authentication/auth";

const Navbar = () => {
  const { t } = useTranslation();
  const { theme } = useContext(themeContext);
  const isMobile = useMobileDetect();
  const { isMenuOpen, setIsMenuOpen } = useContext(IMenusContext);
  const { isAuthenticated } = useAuthStore();
  const handleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative justify-end z-50">
      <div className="md:hidden w-5 cursor-pointer" onClick={handleMenu}>
        {isMenuOpen ? (
          <>
            <BsXLg className="ml-0.5" />
          </>
        ) : (
          <>
            <div
              className={
                "h-1 w-full rounded " +
                (theme === "dark" ? "bg-light-200" : "bg-dark")
              }
            ></div>
            <div
              className={
                "h-1 w-full mt-0.5 rounded " +
                (theme === "dark" ? "bg-light-200" : "bg-dark")
              }
            ></div>
            <div
              className={
                "h-1 w-full mt-0.5 rounded " +
                (theme === "dark" ? "bg-light-200" : "bg-dark")
              }
            ></div>
          </>
        )}
      </div>
      {!isAuthenticated ? (
        <ul
          className={
            "flex-col max-md:w-24 max-md:absolute top-6 -right-10 max-md:border-x border-light-100 md:flex-row text-ligth justify-between font-semibold " +
            (theme === "dark" ? "bg-dark " : "bg-light-200 ") +
            (isMenuOpen || !isMobile ? "flex" : "hidden")
          }
        >
          <li className="p-2 hover:text-second cursor-pointer text-center">
            <CustomLink
              to="/"
              activeClass={
                "border-b " +
                (theme === "dark" ? "border-white" : "border-dark")
              }
              onClick={handleMenu}
            >
              {t("header.navbar.home")}
            </CustomLink>
          </li>
          <li className="p-2 hover:text-second cursor-pointer text-center">
            <CustomLink
              to="/login"
              activeClass={
                "border-b " +
                (theme === "dark" ? "border-white" : "border-dark")
              }
              onClick={handleMenu}
            >
              {t("header.navbar.login")}
            </CustomLink>
          </li>
          <li className="p-2 md:mr-6 hover:text-second cursor-pointer text-center">
            <CustomLink
              to="/register"
              activeClass={
                "border-b " +
                (theme === "dark" ? "border-white" : "border-dark")
              }
              onClick={handleMenu}
            >
              {t("header.navbar.register")}
            </CustomLink>
          </li>
        </ul>
      ) : (
        <ul
          className={
            "flex-col max-md:w-28 max-md:absolute top-6 -right-12 max-md:border-x border-light-100 md:flex-row text-ligth justify-between font-semibold " +
            (theme === "dark" ? "bg-dark " : "bg-light-200 ") +
            (isMenuOpen || !isMobile ? "flex" : "hidden")
          }
        >
          <li className="p-2 hover:text-second cursor-pointer">
            <CustomLink
              to="/dashboard"
              activeClass={
                "border-b " +
                (theme === "dark" ? "border-white" : "border-dark")
              }
              onClick={handleMenu}
            >
              {t("header.navbar.dashboard")}
            </CustomLink>
          </li>
          <li className="p-2 hover:text-second cursor-pointer">
            <CustomLink
              to="/profile"
              activeClass={
                "border-b " +
                (theme === "dark" ? "border-white" : "border-dark")
              }
              onClick={handleMenu}
            >
              {t("header.navbar.myProfile")}
            </CustomLink>
          </li>
        </ul>
      )}
    </nav>
  );
};
export default Navbar;
