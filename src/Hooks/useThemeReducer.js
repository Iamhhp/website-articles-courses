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
        return { color: '#030637' };
      case ACTION_TYPE.LIGHT:
        return { color: '#00A9FF' };
      default:
        return state;
    }
  };

  const [stateTheme, dispatch] = useReducer(themeReducer, initializeStateTheme);

  const changeTheme = (actionType) => {
    dispatch({ type: actionType });
  };

  return {
    stateTheme,
    changeTheme,
  };
};
export default useThemeReducer;
