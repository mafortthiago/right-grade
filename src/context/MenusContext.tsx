import { createContext, ReactNode, useEffect, useState } from "react";

interface IMenusContext {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
  isConfigOpen: boolean;
  setIsConfigOpen: (isConfigOpen: boolean) => void;
}
interface IMenusProviderProps {
  children: ReactNode;
}
export const IMenusContext = createContext<IMenusContext>({} as IMenusContext);
export const MenusProvider = ({ children }: IMenusProviderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isConfigOpen, setIsConfigOpen] = useState<boolean>(false);
  useEffect((): void => {
    if (isConfigOpen && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, [isConfigOpen]);
  useEffect((): void => {
    if (isConfigOpen && isMenuOpen) {
      setIsConfigOpen(false);
    }
  }, [isMenuOpen]);
  return (
    <IMenusContext.Provider
      value={{ isMenuOpen, setIsMenuOpen, isConfigOpen, setIsConfigOpen }}
    >
      {children}
    </IMenusContext.Provider>
  );
};
