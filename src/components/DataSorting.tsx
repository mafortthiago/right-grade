import { FunctionComponent, useContext } from "react";
import { BsListOl } from "react-icons/bs";
import { themeContext } from "../context/ThemeContext";
import { t } from "i18next";
import { useClassStore } from "../store/classes";

interface DataSortingProps {
  handleOrder: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DataSorting: FunctionComponent<DataSortingProps> = ({ handleOrder }) => {
  const { orderBy } = useClassStore();
  const { theme } = useContext(themeContext);
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleOrder(e);
  };

  const containerClasses =
    "flex items-center mt-2.5 md:mt-0 md:ml-10 flex-col sm:flex-row";
  const labelClasses = "mr-2 max-sm:text-sm";
  const iconContainerClasses = "text-third w-8 h-8 -mr-[6px] z-10";
  const iconClasses = `w-full h-full p-1 rounded ${
    theme === "dark" ? "bg-first" : "bg-second text-light-100"
  }`;
  const selectBaseClasses =
    "focus:outline-none cursor-pointer text-xs xs:text-sm sm:text-base h-8 py-1 pl-2 sm:px-2.5 rounded";
  const selectThemeClasses = theme === "dark" ? "bg-third" : "bg-light-100";

  return (
    <label className={containerClasses}>
      <span className={labelClasses}>{t("dashboard.class.sort")}:</span>
      <div className="flex">
        <span className={iconContainerClasses}>
          <BsListOl className={iconClasses} />
        </span>
        <select
          id="dataSortingSelect"
          className={`${selectBaseClasses} ${selectThemeClasses}`}
          onChange={handleChange}
          value={orderBy}
        >
          <option value="createdAt_desc">
            {t("dashboard.class.order.fromNewestToOldest")}
          </option>
          <option value="createdAt_asc">
            {t("dashboard.class.order.fromOldestToNewest")}
          </option>
          <option value="name_asc">
            {t("dashboard.class.order.fromAToZ")}
          </option>
          <option value="name_desc">
            {t("dashboard.class.order.fromZToA")}
          </option>
        </select>
      </div>
    </label>
  );
};

export default DataSorting;
