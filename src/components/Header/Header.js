import './Header.css';
import { useEffect, useRef } from 'react';
import { Container } from 'react-bootstrap';
import { FaChevronUp } from 'react-icons/fa';
import persianDate from 'persian-date';

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

  return (
    <Container fluid className='container-header'>
      <div className='header-sec-r'>
        <div className='lbl-site'>وب سایت آموزشی</div>
        <div className='time' ref={time}></div>
      </div>
      <ul className='header-menu'>
        <li>
          <a href=''>خانه</a>
        </li>

        <li>
          <a href=''>دوره ها</a>
        </li>

        <li className='dropDown-menu'>
          <a href='' className='main-menu'>
            <FaChevronUp className='icons' /> مقالات
          </a>

          <div className='sub-menu'>
            <a href=''>ایجاد مقاله</a>
          </div>
        </li>

        <li>
          <a href=''>درباره ما</a>
        </li>
      </ul>
    </Container>
  );
};
export default Header;
