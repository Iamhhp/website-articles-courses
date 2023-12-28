import { useRoutes } from 'react-router-dom';
import listRoute from './routes';

const App = () => {
  const routes = useRoutes(listRoute);
  return routes;
};
export default App;
