import {
  FormEvent,
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { themeContext } from "../context/ThemeContext";
import CardClass from "../components/CardClass";
import Pagination from "../components/Pagination";
import useMobileDetect from "../hooks/useMobileDetected";
import ClassRegister from "./ClassRegister";
import { Group, useClassStore } from "../store/classes";
import { useAuthStore } from "../store/auth";
import Loading from "../components/Loading";
import InputSearch from "../components/InputSearch";
import Snackbar, { ISnackbar } from "../components/Snackbar";
import AddClassCard from "../components/AddClassCard";
import DataSorting from "../components/DataSorting";

const Dashboard: FunctionComponent = () => {
  const isMobile: boolean = useMobileDetect();
  const { t } = useTranslation();
  const { theme } = useContext(themeContext);
  const { getGroups, groups } = useClassStore();
  const { id } = useAuthStore();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cardsPerPage, setCardsPerPage] = useState<number>(7);
  const [searchValue, setSearchValue] = useState<string>("");
  const [quantityCards, setQuantityCards] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const snackbarData = useRef<ISnackbar>({
    title: "Erro",
    body: "Erro ao obter os dados, verifique sua conexão com a internet.",
    isError: false,
  });
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [cards, setCards] = useState<Group[]>([]);
  const [isAddClass, setIsAddClass] = useState<boolean>(false);
  const lastPostIndex = currentPage * cardsPerPage;
  const firstPostIndex = lastPostIndex - cardsPerPage;
  const loadGroups = async (orderBy: string) => {
    setLoading(true);
    let token = "";
    let storedToken = localStorage.getItem("jwt");
    if (storedToken) {
      token = storedToken;
    }
    try {
      await getGroups(id, token, orderBy);
    } catch (error: any) {
      setSnackbarVisible(true);
      snackbarData.current.title = "Erro ao obter turmas";
      snackbarData.current.body =
        "verifique sua conexão com a internet ou contate o desenvolvedor.";
      snackbarData.current.isError = true;
    }

    setLoading(false);
  };

  useEffect(() => {
    loadGroups("createdAt_desc");
  }, []);

  useEffect(() => {
    if (groups.length > 0) {
      getClasses();
    }
  }, [currentPage, groups, firstPostIndex, lastPostIndex]);

  useEffect(() => {
    if (isMobile) {
      setCardsPerPage(3);
    } else {
      setCardsPerPage(7);
    }
  }, [isMobile]);

  const getClasses = () => {
    const newGroups = groups.filter((g) => g.name.includes(searchValue));
    setCards(newGroups.slice(firstPostIndex, lastPostIndex));
    setQuantityCards(newGroups.length);
  };

  const handleClick = (e: FormEvent) => {
    e.preventDefault();
    getClasses();
  };

  const handleOrder = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await loadGroups(e.target.value);
  };
  return (
    <>
      {isAddClass && (
        <ClassRegister
          setIsAddClass={setIsAddClass}
          setSnackBarVisible={setSnackbarVisible}
          snackbarData={snackbarData.current}
        />
      )}
      <main
        className={
          "w-full h-screen flex flex-col items-center mt-2 rounded " +
          (theme === "dark"
            ? "bg-gradient-to-t from-third to-dark"
            : "bg-gradient-to-t from-light-100 to-light-200")
        }
      >
        <h2 className="font-semibold text-center mt-4 text-lg mb-2.5">
          {t("dashboard.title")}
        </h2>
        {loading ? (
          <>
            <Loading size="large" />
          </>
        ) : (
          <>
            <div className="flex flex-col md:flex-row width-3/4 items-center">
              <InputSearch
                handleClick={handleClick}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
              <DataSorting handleOrder={handleOrder} />
            </div>

            <div className="flex flex-wrap justify-center items-center">
              {currentPage === 1 && (
                <AddClassCard
                  isAddClass={isAddClass}
                  setIsAddClass={setIsAddClass}
                />
              )}
              {cards.map((card: Group) => (
                <CardClass
                  id={card.id}
                  title={card.name}
                  quantityStudents={card.quantityStudents}
                  gradeAverage={card.gradeAverage}
                  minimumGrade={card.minimumGrade}
                />
              ))}
            </div>
            {cards.length !== 0 && (
              <>
                <Pagination
                  currentPage={currentPage}
                  quantityCards={quantityCards}
                  cardsPerPage={cardsPerPage}
                  setCurrentPage={setCurrentPage}
                />
                <p className="text-sm max-md:mt-1.5">
                  {t("dashboard.pagination.description", {
                    quantity: cardsPerPage,
                  })}
                </p>
              </>
            )}
          </>
        )}
        {snackbarVisible ? <Snackbar snackbar={snackbarData.current} /> : <></>}
      </main>
    </>
  );
};

export default Dashboard;
