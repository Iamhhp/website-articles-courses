import './Theme.css';
import { MdOutlineDarkMode } from 'react-icons/md';
import { CiLight } from 'react-icons/ci';
import { useChangeThemeContext, useStateThemeContext } from '../../Context/ThemeContext';
import { ACTION_TYPE } from '../../Hooks/useThemeReducer';

const Theme = () => {
  const stateTheme = useStateThemeContext();
  const changeTheme = useChangeThemeContext();

  const clickHandlerTheme = () => {
    if (stateTheme.color === '#00A9FF') {
      changeTheme(ACTION_TYPE.DARK);
    } else {
      changeTheme(ACTION_TYPE.LIGHT);
    }
  };

  console.log(stateTheme);

  return (
    <div className='container-theme' onClick={clickHandlerTheme} style={{ borderColor: stateTheme.color, boxShadow: `0px 0px 5px 1px ${stateTheme.color}` }}>
      <MdOutlineDarkMode style={{ color: stateTheme.color }} className={stateTheme.color === '#00A9FF' ? 'icon' : 'icon icon-show'} />
      <CiLight style={{ color: stateTheme.color }} className={stateTheme.color === '#00A9FF' ? 'icon icon-show' : 'icon'} />
    </div>
  );
};
export default Theme;
