import { createContext, useEffect, useState, ReactNode } from "react";
interface IThemeContext {
  theme: string;
  toogleTheme: () => void;
}
export const themeContext = createContext<IThemeContext>({} as IThemeContext);
interface IThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: IThemeProviderProps) => {
  const [theme, setTheme] = useState<string>("light");
  const toogleTheme = () => {
    if (theme === "dark") {
      window.localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      window.localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem("theme");
    localTheme && setTheme(localTheme);
  }, []);

  return (
    <themeContext.Provider value={{ theme, toogleTheme }}>
      {children}
    </themeContext.Provider>
  );
};
