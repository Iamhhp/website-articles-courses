import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainRoute from './components/MainRoute/MainRoute';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainRoute />}></Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
