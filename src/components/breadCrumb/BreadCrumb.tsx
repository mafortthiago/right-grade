import { FunctionComponent, useContext, useEffect, useState } from "react";
import { BsHouseFill } from "react-icons/bs";
import { themeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { CaretRight } from "./CaretRight";
import BreadCrumbleLink from "./BreadCrumbleLink";
import { t } from "i18next";
import { useClassStore } from "../../store/classes";

const BreadCrumb: FunctionComponent = () => {
  const { theme } = useContext(themeContext);
  const { groups } = useClassStore();
  const [currentPaths, setCurrentPaths] = useState<string[]>([]);

  useEffect(() => {
    pathsConstructor();
  }, []);

  const loadGroup = (id: string) => {
    const group = groups.filter((g) => g.id == id)[0];
    return group;
  };

  const pathsConstructor = () => {
    const currentPath = window.location.pathname;
    const currentPathEachs = currentPath
      .split("/")
      .filter((part) => part.trim())
      .map((part) => {
        if (part.includes("group")) {
          return t("dashboard.title");
        } else {
          const group = loadGroup(part);
          return group.name;
        }
      });
    setCurrentPaths(currentPathEachs);
  };

  return (
    <div className="absolute left-7 top-20 flex md:top-24 md:left-8">
      <Link
        to={"/dashboard"}
        className={`p-2 rounded hover:shadow-sm ${
          theme == "dark"
            ? "bg-third hover:shadow-gray-700"
            : "bg-light-100 hover:shadow-gray-500"
        }`}
      >
        <BsHouseFill className="max-xs:w-3" />
      </Link>
      {currentPaths.map((p) => (
        <>
          <CaretRight />
          <BreadCrumbleLink
            url={p == t("dashboard.title") ? `/dashboard` : ""}
            content={p}
          />
        </>
      ))}
    </div>
  );
};

export default BreadCrumb;
