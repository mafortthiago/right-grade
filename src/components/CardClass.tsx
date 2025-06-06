import { FunctionComponent, useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { BsClipboardDataFill, BsPeopleFill, BsRulers } from "react-icons/bs";
import CardOptions from "./class/CardOptions";
import { Group } from "../store/classes";

interface CardProps {
  group: Group;
}

/**
 * CardClass component displays information about a class group.
 * It shows the class title, number of students, grade average, and minimum grade.
 * The component is styled based on the current theme and is clickable to navigate to the class details.
 *
 * @param {CardProps} props - The properties {@link CardProps}.
 * @returns {JSX.Element} The rendered CardClass component.
 */
const CardClass: FunctionComponent<CardProps> = ({
  group,
}: CardProps): JSX.Element => {
  const { theme } = useContext(themeContext);
  const navigate = useNavigate();
  const handleCardDetail = () => {
    navigate(`/group/${group.id}`);
  };
  return (
    <div className="relative">
      <div
        className={
          "cursor-pointer mt-6 p-4 rounded m-4 border-2 outline-4 outline w-60 min-h-36 hover:shadow-2xl " +
          (theme === "dark"
            ? "bg-third outline-third border-light-100 hover:shadow-gray-800"
            : "bg-light-100 outline-light-100 hover:shadow-gray-400")
        }
        onClick={handleCardDetail}
      >
        <h3 className="font-medium border-b-2 border-first mb-2">
          {group.name}
        </h3>
        <p className="text-sm flex items-center">
          <BsPeopleFill className="mr-1" />
          {t("dashboard.class.students")}: {group.studentsQuantity}
        </p>
        <p className="text-sm flex items-center">
          <BsClipboardDataFill className="mr-1" />
          {t("dashboard.class.gradeAverage")}: {group.gradesAverage.toFixed(2)}
        </p>
        <p className="text-sm flex items-center">
          <BsRulers className="mr-1" />
          {t("dashboard.class.minimumGrade")}: {group.minimumGrade}
        </p>
      </div>
      <CardOptions group={group} />
    </div>
  );
};
export default CardClass;
