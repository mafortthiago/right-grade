import { FormEvent, FunctionComponent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { themeContext } from "../context/ThemeContext";
import { BsCardText, BsX } from "react-icons/bs";
import Input from "../components/Input";
import InputRadio from "../components/InputRadio";
import InputNumber from "../components/InputNumber";
import InputSubmit from "../components/InputSubmit";
interface ClassRegisterProps {
  setIsAddClss: (isAddClass: boolean) => void;
}
const ClassRegister: FunctionComponent<ClassRegisterProps> = ({
  setIsAddClss,
}) => {
  const { t } = useTranslation();
  const { theme } = useContext(themeContext);
  const [isGradeFrom0To100, setIsGradeFrom0To100] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
  };
  return (
    <>
      <div
        className={
          "absolute w-full h-full left-0 mt-2 flex justify-center " +
          (theme === "dark" ? "bg-dark/80" : "bg-light-200/75")
        }
      >
        <form
          className={
            "m-4 w-full lg:w-1/2 flex flex-col rounded px-5 pt-5 pb-2 h-fit lg:mt-20 mt-4 " +
            (theme === "dark" ? "bg-third" : "bg-light-100")
          }
        >
          <section className="flex items-center h-5 w-full justify-between mb-3">
            <h2 className="font-semibold">
              {t("dashboard.class.register.title")}
            </h2>
            <BsX
              className="h-7 w-7 cursor-pointer hover:bg-red-300 rounded hover:text-third "
              onClick={() => setIsAddClss(false)}
            />
          </section>
          <Input
            textLabel={t("dashboard.class.register.name")}
            type="text"
            icon={BsCardText}
            value={name}
            setValue={setName}
          />
          <InputRadio setIsGradeFrom0To100={setIsGradeFrom0To100} />
          <InputNumber isGradeFrom0To100={isGradeFrom0To100} />
          <InputSubmit
            value={t("dashboard.class.register.title")}
            handleSubmit={handleSubmit}
          />
        </form>
      </div>
    </>
  );
};

export default ClassRegister;
