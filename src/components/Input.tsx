import { FunctionComponent, useContext } from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { themeContext } from "../context/ThemeContext";
import { IconType } from "react-icons";

interface InputProps {
  textLabel: string;
  type: "text" | "password" | "number";
  value: string;
  setValue: (value: string) => void;
  icon?: IconType;
  isInputPassword?: boolean;
  isVisible?: boolean;
  setIsVisible?: (isVisible: boolean) => void;
}

const Input: FunctionComponent<InputProps> = ({
  textLabel,
  type,
  value,
  setValue,
  icon: Icon,
  isInputPassword = false,
  isVisible = false,
  setIsVisible,
}) => {
  const { theme } = useContext(themeContext);

  const handleToggleVisibility = () => {
    if (setIsVisible) {
      setIsVisible(!isVisible);
    }
  };

  return (
    <label className="flex-col flex relative mb-4">
      <span>{textLabel}</span>
      <input
        type={isInputPassword && isVisible ? "text" : type}
        className={
          "p-1 w-full border-b-2 border-gray-300 focus:border-b-2 focus:border-second focus:outline-0 " +
          (theme === "dark" ? "bg-third" : "bg-light-100")
        }
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {isInputPassword && (
        <div
          className="absolute right-7 bottom-3.5 cursor-pointer"
          onClick={handleToggleVisibility}
        >
          {isVisible ? <BsEyeSlashFill /> : <BsEyeFill />}
        </div>
      )}
      {Icon && <Icon className="absolute right-2 bottom-4" />}
    </label>
  );
};

export default Input;
