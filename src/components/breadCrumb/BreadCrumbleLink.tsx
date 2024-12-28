import { FunctionComponent, useContext } from "react";
import { Link } from "react-router-dom";
import { themeContext } from "../../context/ThemeContext";
interface BreadCrumbleLinkProps {
  url: string;
  content: string;
}
const BreadCrumbleLink: FunctionComponent<BreadCrumbleLinkProps> = ({
  url,
  content,
}) => {
  const { theme } = useContext(themeContext);
  return (
    <Link
      to={url}
      className={`ml-0.5 xs:ml-1 px-2 text-xs sm:text-sm flex items-center rounded hover:shadow-sm ${
        theme == "dark"
          ? "bg-third hover:shadow-gray-700"
          : "bg-light-100 hover:shadow-gray-500"
      }`}
    >
      {content}
    </Link>
  );
};

export default BreadCrumbleLink;
