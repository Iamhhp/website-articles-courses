import MainRoute from './components/MainRoute/MainRoute';
import Home from './pages/Home/Home';
import Article from './pages/Article/Article';
import ArticleEditCreate from './pages/ArticleEditCreate/ArticleEditCreate';
import Articles from './pages/Articles/Articles';
import Course from './pages/Course/Course';
import Courses from './pages/Courses/Courses';
import AboutUs from './pages/AboutUs/AboutUs';
import NotFound from './pages/NotFound/NotFound';

const listRoute = [
  {
    path: '/',
    element: <MainRoute />,
    children: [
      { path: '/Home', element: <Home /> },
      { path: '/Article/:idArticle', element: <Article /> },
      { path: '/Article/:editCreate/:idArticle', element: <ArticleEditCreate /> },
      { path: '/Articles', element: <Articles /> },
      { path: '/Course/:idCourse', element: <Course /> },
      { path: '/Courses', element: <Courses /> },
      { path: '/About-us', element: <AboutUs /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];
export default listRoute;
