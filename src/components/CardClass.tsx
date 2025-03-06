import { FunctionComponent, useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { t } from "i18next";
import { BsClipboardDataFill, BsPeopleFill, BsRulers } from "react-icons/bs";

interface CardProps {
  id: string;
  title: string;
  quantityStudents: number;
  minimumGrade: number;
  gradeAverage: number;
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
  title,
  quantityStudents,
  gradeAverage,
  minimumGrade,
  id,
}: CardProps): JSX.Element => {
  const { theme } = useContext(themeContext);
  const navigate = useNavigate();
  const handleCardDetail = () => {
    navigate(`/group/${id}`);
  };
  return (
    <>
      <div
        className={
          "cursor-pointer mt-6 p-4 rounded m-4 border-2 outline-4 outline w-60 h-32 hover:shadow-2xl " +
          (theme === "dark"
            ? "bg-third outline-third border-light-100 hover:shadow-gray-800"
            : "bg-light-100 outline-light-100 hover:shadow-gray-400")
        }
        onClick={handleCardDetail}
      >
        <h3 className="font-medium border-b-2 border-first mb-2">{title}</h3>
        <p className="text-sm flex items-center">
          <BsPeopleFill className="mr-1" />
          {t("dashboard.class.students")}: {quantityStudents}
        </p>
        <p className="text-sm flex items-center">
          <BsClipboardDataFill className="mr-1" />
          {t("dashboard.class.gradeAverage")}: {gradeAverage}
        </p>
        <p className="text-sm flex items-center">
          <BsRulers className="mr-1" />
          {t("dashboard.class.minimumGrade")}: {minimumGrade}
        </p>
      </div>
    </>
  );
};
export default CardClass;
