import { useContext } from 'react';
import { createContext } from 'react';
import useThemeReducer from '../Hooks/useThemeReducer';

const StateThemeContext = createContext();
const ChangeThemeContext = createContext();
const ThemeContextProvider = ({ children }) => {
  const { stateTheme, changeStateTheme } = useThemeReducer();

  return (
    <StateThemeContext.Provider value={stateTheme}>
      <ChangeThemeContext.Provider value={changeStateTheme}>{children}</ChangeThemeContext.Provider>
    </StateThemeContext.Provider>
  );
};
export default ThemeContextProvider;

export const useStateThemeContext = () => {
  const data = useContext(StateThemeContext);

  if (!data) {
    throw new Error('useStateThemeContext must be use in StateThemeContext!');
  }

  return data;
};

export const useChangeThemeContext = () => {
  const data = useContext(ChangeThemeContext);

  if (!data) {
    throw new Error('useChangeThemeContext must be use in StateThemeContext!');
  }

  return data;
};
