import { FunctionComponent, useContext } from "react";
import { BsCaretLeftSquareFill, BsCaretRightSquareFill } from "react-icons/bs";
import { themeContext } from "../context/ThemeContext";

interface PaginationProps {
  currentPage: number;
  quantityCards: number;
  cardsPerPage: number;
  setCurrentPage: (n: number) => void;
}

const Pagination: FunctionComponent<PaginationProps> = ({
  quantityCards,
  cardsPerPage,
  currentPage,
  setCurrentPage,
}) => {
  const { theme } = useContext(themeContext);

  const numberPages: number = Math.ceil(quantityCards / cardsPerPage);
  const pageNumbers: number[] = Array.from(
    { length: numberPages },
    (_, i) => i + 1
  );
  return (
    <div className="flex max-md:flex-col items-center mt-2">
      <div
        className={
          "flex items-center cursor-pointer hover:opacity-80 " +
          (currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer")
        }
        onClick={() => {
          if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
          }
        }}
      >
        <span>
          <BsCaretLeftSquareFill />
        </span>
        <span className="mx-2 ">Anterior</span>
      </div>
      <div className="flex max-md:my-2">
        {pageNumbers.map((page) => (
          <span
            key={page}
            className={
              "p-2 m-0.5 w-8 h-8 flex rounded border border-gray-300 items-center justify-center cursor-pointer " +
              (theme === "dark"
                ? "bg-gradient-to-t from-third to-dark hover:brightness-200 "
                : "bg-gradient-to-t from-light-100 to-light-200 hover:shadow-gray-400 hover:shadow-sm ") +
              (page === currentPage ? "font-bold" : "")
            }
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </span>
        ))}
      </div>
      <div
        className={
          "flex items-center cursor-pointer hover:opacity-80 " +
          (currentPage === pageNumbers.length
            ? "cursor-not-allowed"
            : "cursor-pointer")
        }
        onClick={() => {
          if (currentPage < numberPages) {
            setCurrentPage(currentPage + 1);
          }
        }}
      >
        <span className="mx-2">Próxima</span>
        <span>
          <BsCaretRightSquareFill />
        </span>
      </div>
    </div>
  );
};
export default Pagination;
