import './MainRoute.css';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { memo, useEffect } from 'react';

const MainRoute = () => {
  useEffect(() => {
    console.log('MainRoute Render!');
  });

  return (
    <>
      <Header />
      <div className='container-main-route'>
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
export default memo(MainRoute);
