import { memo, useEffect } from 'react';
import './OffcanvasMenu.css';
import { useStateThemeContext } from '../../Context/ThemeContext';

const OffcanvasMenu = ({ title, itemMenu, refContainerOffMenu }) => {
  useEffect(() => {
    console.log('OffcanvasMenu Render!');
  });

  const clickHandler = () => {
    refContainerOffMenu.current.firstElementChild.classList.toggle('off-menu-show');

    window.setTimeout(() => {
      refContainerOffMenu.current.classList.toggle('container-off-menu-show');
    }, 500);
  };

  const stateTheme = useStateThemeContext();

  return (
    <div className='container-off-menu' ref={refContainerOffMenu} onClick={clickHandler}>
      <div className='off-menu' style={{ backgroundColor: stateTheme.color }}>
        <div className='title'>{title}</div>
        {itemMenu}
      </div>
    </div>
  );
};
export default memo(OffcanvasMenu);
