import './MainRoute.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { memo, useEffect } from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Theme from '../Theme/Theme';

const MainRoute = () => {
  const navigate = useNavigate();
  useEffect(() => {
    console.log('MainRoute Render!');
  });

  useEffect(() => {
    if (window.location.pathname === '/') {
      navigate('/Home');
    }
  }, []);

  return (
    <>
      <Header />
      <div className='container-main-route'>
        <Outlet />
      </div>
      <Theme />
      <Footer />
    </>
  );
};
export default memo(MainRoute);
