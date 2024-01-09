import { useLocation } from 'react-router-dom';
import useTheme from '../../Hooks/useTheme';
import './Theme.css';
import { useEffect, useRef } from 'react';

const Theme = () => {
  const { stateColor, changeColor } = useTheme();
  const pathUrl = useLocation().pathname;
  const action = useRef({ type: '', payLoad: '#2196f3' });
  useEffect(() => {
    if (pathUrl.includes('Home')) {
      action.current.type = 'COLOR_HOME';
    } else if (pathUrl.includes('Courses')) {
      action.current.type = 'COLOR_COURSES';
    } else if (pathUrl.includes('Course')) {
      action.current.type = 'COLOR_COURSE';
    } else if (pathUrl.includes('Articles')) {
      action.current.type = 'COLOR_ARTICLES';
    } else if (pathUrl.includes('Article')) {
      action.current.type = 'COLOR_ARTICLE';
    } else if (pathUrl.includes('About')) {
      action.current.type = 'COLOR_ABOUT';
    }
  }, [pathUrl]);

  return (
    <div className='theme' style={{ boxShadow: `0px 0px 15px 1px ${action.current.payLoad}` }}>
      <label htmlFor='theme'>Theme</label>
      <input
        type='color'
        name=''
        id='theme'
        defaultValue={'#2196f3'}
        onChange={(e) => {
          action.current.payLoad = e.target.value;
          changeColor(action.current);
        }}
      />
    </div>
  );
};
export default Theme;
