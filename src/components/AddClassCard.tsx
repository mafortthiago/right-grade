import { FunctionComponent, useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import { BsPlusSquare } from "react-icons/bs";
import { t } from "i18next";
interface AddClassCardProps {
  isAddClass: boolean;
  setIsAddClass: (isAddClass: boolean) => void;
}
const AddClassCard: FunctionComponent<AddClassCardProps> = ({
  isAddClass,
  setIsAddClass,
}) => {
  const { theme } = useContext(themeContext);
  return (
    <div
      onClick={() => setIsAddClass(!isAddClass)}
      className={
        "flex flex-col cursor-pointer mt-6 p-4 rounded m-4 border-2 outline-4 outline w-60 h-32 hover:shadow-2xl items-center justify-center " +
        (theme === "dark"
          ? "bg-third outline-third border-light-100 hover:shadow-gray-800"
          : "bg-light-100 outline-light-100 hover:shadow-gray-400")
      }
    >
      <h3>{t("dashboard.addClass")}</h3>
      <BsPlusSquare className="w-12 h-10 mt-2 text-gray-300" />
    </div>
  );
};

export default AddClassCard;
