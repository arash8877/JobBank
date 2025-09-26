import { createContext, useState } from "react";

interface IThemeContext {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

interface IThemeContextProvider {
  children: React.ReactNode;
}

//------------------------------------------------------------------------
export const ThemeContext = createContext<IThemeContext>({
  darkMode: false,
  toggleDarkMode: () => {},
});

const ThemeContextProvider = ({ children }: IThemeContextProvider) => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const toggleDarkMode: () => void = () => {
    setDarkMode((prevState) => !prevState);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
