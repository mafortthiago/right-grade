import { FunctionComponent, useContext } from "react";
import { themeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

interface CardProps {
  id: string;
  title: string;
  quantityStudents: number;
  gradeAverage: number;
}

const CardClass: FunctionComponent<CardProps> = ({
  title,
  quantityStudents,
  gradeAverage,
  id,
}) => {
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
        <p className="text-sm">Alunos: {quantityStudents}</p>
        <p className="text-sm">Média geral: {gradeAverage}</p>
      </div>
    </>
  );
};
export default CardClass;
