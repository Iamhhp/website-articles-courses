import { createContext, useReducer } from 'react';

export const themeContext = createContext();
const ThemeContext = ({ children }) => {
  const colorReducer = (state, action) => {
    console.log(action, '////////////////////////////////////////////////');
    switch (action.type) {
      case 'COLOR_HOME':
        return { ...state, home: action.payLoad, headerFooter: action.payLoad };
      case 'COLOR_COURSE':
        return { ...state, course: action.payLoad, headerFooter: action.payLoad };
      case 'COLOR_COURSES':
        return { ...state, courses: action.payLoad, headerFooter: action.payLoad };
      case 'COLOR_ARTICLE':
        return { ...state, article: action.payLoad, headerFooter: action.payLoad };
      case 'COLOR_ARTICLES':
        return { ...state, articles: action.payLoad, headerFooter: action.payLoad };
      case 'COLOR_ABOUT':
        return { ...state, about: action.payLoad, headerFooter: action.payLoad };
      default:
        return state;
    }
  };

  const [colorState, dispatchColor] = useReducer(colorReducer, {
    home: '#2196f3',
    course: '#2196f3',
    courses: '#2196f3',
    article: '#2196f3',
    articles: '#2196f3',
    about: '#2196f3',
    headerFooter: '#2196f3',
  });
  const changeColor = (action) => {
    dispatchColor(action);
  };

  return <themeContext.Provider value={{ colorState, changeColor }}>{children}</themeContext.Provider>;
};
export default ThemeContext;
