import './MainRoute.css';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { memo, useEffect } from 'react';
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

        <Theme />
      </div>
      <Footer />
    </>
  );
};
export default memo(MainRoute);
