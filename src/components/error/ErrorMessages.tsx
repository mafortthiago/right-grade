import { FunctionComponent, useContext } from "react";
import { ErrorMessages as IErrorMessages } from "../../util/errorTranslator";
import { themeContext } from "../../context/ThemeContext";

interface ErrorMessages {
  error: IErrorMessages;
}

const ErrorMessages: FunctionComponent<ErrorMessages> = ({ error }) => {
  const { theme } = useContext(themeContext);
  return (
    <>
      {Object.keys(error).length > 0 &&
        Object.values(error).map((e) => (
          <p
            className={`text-sm mb-1 ${
              theme == "dark"
                ? "bg-third text-red-200"
                : "bg-light-100 text-red-500 border border-red-500"
            }  p-1 rounded`}
          >
            {e}
          </p>
        ))}
    </>
  );
};

export default ErrorMessages;
