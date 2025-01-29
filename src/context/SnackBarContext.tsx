import React, {
  createContext,
  useContext,
  useState,
  FunctionComponent,
} from "react";
import Snackbar, { ISnackbar } from "../components/Snackbar";

interface SnackbarContextProps {
  showSnackbar: (snackbar: ISnackbar) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
  undefined
);

interface SnackbarProviderProps {
  children: React.ReactNode;
}

export const SnackbarProvider: FunctionComponent<SnackbarProviderProps> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<ISnackbar | null>(null);
  const showSnackbar = (snackbar: ISnackbar) => {
    setSnackbar(snackbar);
    setTimeout(() => {
      setSnackbar(null);
    }, 5000);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      {snackbar && <Snackbar snackbar={snackbar} />}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};
