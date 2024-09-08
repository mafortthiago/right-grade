import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { themeContext } from "../context/ThemeContext";
import CardClass from "../components/CardClass";
import fakeData from "./fakeClasses.json";
import Pagination from "../components/Pagination";
import useMobileDetect from "../hooks/useMobileDetected";
import { BsPlusSquare, BsPlusSquareFill } from "react-icons/bs";
import ClassRegister from "./ClassRegister";

const Dashboard: FunctionComponent = () => {
  const isMobile: boolean = useMobileDetect();
  const { t } = useTranslation();
  const { theme } = useContext(themeContext);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage, setCardsPerPage] = useState<number>(7);
  const [isAddClass, setIsAddClss] = useState<boolean>(false);
  const lastPostIndex = currentPage * cardsPerPage;
  const firstPostIndex = lastPostIndex - cardsPerPage;
  const quantityCards = fakeData.length;
  const currentCards = fakeData.slice(firstPostIndex, lastPostIndex);
  useEffect(() => {
    if (isMobile) {
      setCardsPerPage(3);
    } else {
      setCardsPerPage(7);
    }
  }, [isMobile]);
  return (
    <>
      {isAddClass && <ClassRegister setIsAddClss={setIsAddClss} />}
      <main
        className={
          "w-full h-screen flex flex-col items-center mt-2 rounded " +
          (theme === "dark"
            ? "bg-gradient-to-t from-third to-dark"
            : "bg-gradient-to-t from-light-100 to-light-200")
        }
      >
        <h2 className="font-semibold text-center mt-4 text-lg">
          {t("dashboard.title")}
        </h2>
        <div className="flex flex-wrap justify-center items-center">
          {currentPage === 1 && (
            <div
              onClick={() => setIsAddClss(!isAddClass)}
              className={
                "flex flex-col cursor-pointer mt-6 p-4 rounded m-4 border-2 outline-4 outline w-60 h-32 hover:shadow-2xl items-center justify-center " +
                (theme === "dark"
                  ? "bg-third outline-third border-light-100 hover:shadow-gray-800"
                  : "bg-light-100 outline-light-100 hover:shadow-gray-400")
              }
            >
              <h3>Cadastrar nova turma</h3>
              <BsPlusSquare className="w-12 h-10 mt-2 text-gray-300" />
            </div>
          )}

          {currentCards.map((card) => (
            <CardClass
              title={card.title}
              quantityStudents={card.quantityStudents}
              gradeAverage={card.gradeAverage}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          quantityCards={quantityCards}
          cardsPerPage={cardsPerPage}
          setCurrentPage={setCurrentPage}
        />
        <p className="text-sm max-md:mt-1.5">
          Exibindo {cardsPerPage} turmas por página
        </p>
      </main>
    </>
  );
};

export default Dashboard;
