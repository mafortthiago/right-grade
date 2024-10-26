import {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { themeContext } from "../context/ThemeContext";
import { BsArrowDownSquareFill, BsArrowUpSquareFill } from "react-icons/bs";
import { useTranslation } from "react-i18next";

interface InputNumberProps {
  isGradeFrom0To100: boolean;
}

const InputNumber: FunctionComponent<InputNumberProps> = ({
  isGradeFrom0To100,
}) => {
  const { theme } = useContext(themeContext);
  const [minGrade, setMinGrade] = useState<number>(6);
  const { t } = useTranslation();

  const increaseMinimumNote = useCallback((): void => {
    setMinGrade((prevMinGrade) => {
      const increment = isGradeFrom0To100 ? 5 : 0.5;
      const maxLimit = isGradeFrom0To100 ? 100 : 10;
      return Math.min(prevMinGrade + increment, maxLimit);
    });
  }, [isGradeFrom0To100]);

  const decreaseMinimumNote = useCallback((): void => {
    setMinGrade((prevMinGrade) => {
      const decrement = isGradeFrom0To100 ? 5 : 0.5;
      return Math.max(prevMinGrade - decrement, 0);
    });
  }, [isGradeFrom0To100]);

  useEffect(() => {
    setMinGrade((prevMinGrade) => {
      if (isGradeFrom0To100) {
        return Math.min(prevMinGrade * 10, 100);
      } else {
        return Math.max(prevMinGrade / 10, 0);
      }
    });
  }, [isGradeFrom0To100]);

  return (
    <label className="flex flex-col custom-input-number mt-2 mb-2">
      <span>{t("dashboard.class.register.minimumGrade")}:</span>
      <div className="flex items-center">
        <BsArrowDownSquareFill
          onClick={decreaseMinimumNote}
          className={
            "h-6 w-6 " +
            (minGrade === 0 ? "cursor-not-allowed " : "cursor-pointer ") +
            (theme === "light" ? "hover:brightness-200" : "hover:opacity-75")
          }
        />
        <input
          type="number"
          disabled
          className={
            "border-2 rounded p-1 mt-1 mx-1 w-12 line-second text-center " +
            (theme === "dark" ? "bg-third" : "bg-gray-100")
          }
          value={minGrade}
          onChange={(e) => setMinGrade(Number.parseFloat(e.target.value))}
        />
        <BsArrowUpSquareFill
          className={
            "h-6 w-6 " +
            (minGrade === (isGradeFrom0To100 ? 100 : 10)
              ? "cursor-not-allowed "
              : "cursor-pointer ") +
            (theme === "light" ? "hover:brightness-200" : "hover:opacity-75")
          }
          onClick={increaseMinimumNote}
        />
      </div>
    </label>
  );
};

export default InputNumber;