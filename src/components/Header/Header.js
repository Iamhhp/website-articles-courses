import './Header.css';
import { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { FaChevronUp } from 'react-icons/fa';
import persianDate from 'persian-date';
import OffcanvasMenu from '../OffcanvasMenu/OffcanvasMenu';
import { RiMenuFoldFill } from 'react-icons/ri';

const Header = () => {
  const time = useRef(null);
  useEffect(() => {
    const timer = window.setInterval(() => {
      const timeDate = new persianDate(new Date()).format('HH:mm:ss dddd');
      time.current.innerText = timeDate;

      // Function Cleanup
      return () => {
        window.clearInterval(timer);
      };
    }, 1000);
  }, []);

  const itemHeaderMenu = (
    <>
      <li>
        <a href=''>خانه</a>
      </li>
      <li>
        <a href=''>دوره ها</a>
      </li>
      <li className='dropDown-menu'>
        <a href='' className='main-menu'>
          مقالات <FaChevronUp className='icons' />
        </a>

        <div className='sub-menu'>
          <a href=''>ایجاد مقاله</a>
        </div>
      </li>
      <li>
        <a href=''>درباره ما</a>
      </li>
    </>
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
      <div className='header-sec-r'>
        <div className='lbl-site'>وب سایت آموزشی</div>
        <div className='time' ref={time}></div>
      </div>

      <OffcanvasMenu title={'منو اصلی'} itemMenu={itemHeaderMenu} refContainerOffMenu={refContainerOffMenu} />

      <div className='icon-off-menu' onClick={clickHandlerIconOffMenu}>
        <RiMenuFoldFill />
      </div>
      <ul className='header-menu'>{itemHeaderMenu}</ul>
    </Container>
  );
};
export default Header;
