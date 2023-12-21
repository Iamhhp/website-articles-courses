import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainRoute from './components/MainRoute/MainRoute';
import Home from './components/pages/Home/Home';
import Article from './components/pages/Article/Article';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainRoute />}>
          <Route path='/Home' element={<Home />} />
          <Route path='/Article/:idArticle' element={<Article />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
