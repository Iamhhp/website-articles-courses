import { useContext } from 'react';
import { themeContext } from '../context/ThemeContext';

const useTheme = () => {
  const data = useContext(themeContext);

  if (!data) {
    throw new Error('useTheme must use in ThemeContext!');
  }

  return data;
};
export default useTheme;
