import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import './MainRoute.css';

const MainRoute = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default MainRoute;
