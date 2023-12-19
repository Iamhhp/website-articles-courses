import './MainRoute.css';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const MainRoute = () => {
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
export default MainRoute;
