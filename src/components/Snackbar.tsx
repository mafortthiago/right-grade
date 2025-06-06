import { FunctionComponent, useContext, useEffect, useState } from "react";
import { BsCheckSquareFill, BsXSquareFill } from "react-icons/bs";
import { themeContext } from "../context/ThemeContext";
export interface ISnackbar {
  title: string;
  body: string;
  isError: boolean;
}
interface SnackbarProps {
  snackbar: ISnackbar;
}

const Snackbar: FunctionComponent<SnackbarProps> = ({ snackbar }) => {
  const { isError, title, body } = snackbar;
  const [seconds, setSeconds] = useState<number>(5);
  const [shouldRender, setShouldRender] = useState(true);
  const { theme } = useContext(themeContext);

  const containerBaseClasses =
    "animate-slide-in-left flex items-center left-6 top-10 fixed max-sm:w-5/6 clip-path-snackbar md:top-24 md:left-8 z-50 bg-gradient-to-r p-2 rounded-lg";
  const containerThemeClasses =
    theme === "dark"
      ? "to-gray-900 from-zinc-900 text-white"
      : "to-zinc-100 from-slate-100";

  const iconClasses = `w-10 h-10 mr-2 ${
    isError ? "text-red-400" : "text-green-700"
  }`;
  const titleClasses = "text-sm md:text-base";
  const bodyClasses = "text-xs md:text-sm";
  const timerTextClasses = "text-xs flex items-center ml-2 md:ml-4 md:text-sm";
  const timerBarClasses = "w-2 bg-first ml-1 rounded";

  useEffect(() => {
    setShouldRender(true);
    setSeconds(5);
    const interval = setInterval(() => {
      setSeconds((prevSeconds: number) => {
        if (prevSeconds === 1) {
          clearInterval(interval);
          setShouldRender(false);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [snackbar]);

  if (!shouldRender) return null;
  return (
    <div className={`${containerBaseClasses} ${containerThemeClasses}`}>
      {isError ? (
        <BsXSquareFill className={iconClasses} />
      ) : (
        <BsCheckSquareFill className={iconClasses} />
      )}

      <section>
        <h3 className={titleClasses}>{title}</h3>
        <p className={bodyClasses}>{body}</p>
      </section>
      <span className={timerTextClasses}>{seconds}s</span>
      <div
        className={timerBarClasses}
        style={{ height: `${seconds * 4}px` }}
      ></div>
    </div>
  );
};

export default Snackbar;
