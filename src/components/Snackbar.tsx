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
  //theme: string;
}
const Snackbar: FunctionComponent<SnackbarProps> = ({ snackbar }) => {
  const { isError, title, body } = snackbar;
  const [seconds, setSeconds] = useState<number>(5);
  const [shouldRender, setShouldRender] = useState(true);
  const { theme } = useContext(themeContext);
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
    <div
      className={`animate-slide-in-left flex items-center top-20 absolute max-sm:w-5/6 clip-path-snackbar md:top-24 md:left-8 z-20 bg-gradient-to-r p-2 rounded-lg ${
        theme == "dark"
          ? "to-gray-900 from-zinc-900 text-white"
          : "to-zinc-100 from-slate-100"
      }`}
    >
      {isError ? (
        <BsXSquareFill className={`w-10 h-10 text-red-400 mr-2`} />
      ) : (
        <BsCheckSquareFill className={`w-10 h-10 text-green-700 mr-2`} />
      )}

      <section>
        <h3>{title}</h3>
        <p className="text-sm">{body}</p>
      </section>
      <span className="text-xs flex items-center ml-2 md:ml-4 md:text-sm">
        {seconds}s
      </span>
      <div
        className={`w-2 bg-first ml-1 rounded`}
        style={{ height: `${seconds * 4}px` }}
      ></div>
    </div>
  );
};

export default Snackbar;
