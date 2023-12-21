import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainRoute from './components/MainRoute/MainRoute';
import Home from './components/pages/Home/Home';
import Article from './components/pages/Article/Article';
import ArticleEditCreate from './components/pages/ArticleEditCreate/ArticleEditCreate';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainRoute />}>
          <Route path='/Home' element={<Home />} />
          <Route path='/Article/:idArticle' element={<Article />} />
          <Route path='/Article/:editCreate/:idArticle' element={<ArticleEditCreate />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
