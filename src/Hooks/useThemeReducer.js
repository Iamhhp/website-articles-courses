import { useReducer } from 'react';

export const ACTION_TYPE = {
  DARK: 'darkTheme',
  LIGHT: 'lightTheme',
};

const useThemeReducer = () => {
  const initializeStateTheme = { color: '#00A9FF' };

  const themeReducer = (state, action) => {
    switch (action.type) {
      case ACTION_TYPE.DARK:
        return { color: '#00A9FF' };
      case ACTION_TYPE.LIGHT:
        return { color: '#030637' };
      default:
        return state;
    }
  };

  const [stateTheme, dispatch] = useReducer(themeReducer, initializeStateTheme);

  const changeStateTheme = (actionType) => {
    dispatch({ type: actionType });
  };

  return {
    stateTheme,
    changeStateTheme,
  };
};
export default useThemeReducer;
