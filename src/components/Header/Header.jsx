import './Header.css';
import { memo, useEffect, useMemo, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { FaChevronUp } from 'react-icons/fa';
import persianDate from 'persian-date';
import OffcanvasMenu from '../OffcanvasMenu/OffcanvasMenu';
import { RiMenuFoldFill } from 'react-icons/ri';
import { NavLink } from 'react-router-dom';

const Header = () => {
  useEffect(() => {
    console.log('Header Render!');
  });

  const time = useRef(null);
  useEffect(() => {
    const timer = window.setInterval(() => {
      const timeDate = new persianDate(new Date()).format('HH:mm:ss dddd');
      time.current.innerText = timeDate;
    }, 1000);

    // Function Cleanup
    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const itemHeaderMenu = useMemo(
    () => (
      <>
        <li>
          <NavLink to={'/Home'}>خانه</NavLink>
        </li>
        <li>
          <NavLink to={'/Courses'}>دوره ها</NavLink>
        </li>
        <li className='dropDown-menu'>
          <NavLink to={'Articles'} className='main-menu'>
            مقالات <FaChevronUp className='icons' />
          </NavLink>

          <div className='sub-menu'>
            <NavLink to={'Article/Create/0'}>ایجاد مقاله</NavLink>
          </div>
        </li>
        <li>
          <NavLink to={'/About-us'}>درباره ما</NavLink>
        </li>
      </>
    ),
    []
  );

  const refContainerOffMenu = useRef(null);
  const clickHandlerIconOffMenu = () => {
    refContainerOffMenu.current.classList.add('container-off-menu-show');

    window.setTimeout(() => {
      refContainerOffMenu.current.firstElementChild.classList.add('off-menu-show');
    }, 100);
  };

  return (
    <Container fluid className='container-header'>
      <OffcanvasMenu title={'منو اصلی'} itemMenu={itemHeaderMenu} refContainerOffMenu={refContainerOffMenu} />

      <div className='icon-off-menu' onClick={clickHandlerIconOffMenu}>
        <RiMenuFoldFill />
      </div>
      <ul className='header-menu'>{itemHeaderMenu}</ul>

      <div className='header-sec-r'>
        <div className='lbl-site'>وب سایت آموزشی</div>
        <div className='time' ref={time}></div>
      </div>
    </Container>
  );
};
export default memo(Header);
