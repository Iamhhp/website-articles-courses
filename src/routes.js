import MainRoute from './components/MainRoute/MainRoute';
import Home from './components/pages/Home/Home';
import Article from './components/pages/Article/Article';
import ArticleEditCreate from './components/pages/ArticleEditCreate/ArticleEditCreate';
import Articles from './components/pages/Articles/Articles';
import Course from './components/pages/Course/Course';
import Courses from './components/pages/Courses/Courses';
import AboutUs from './components/pages/AboutUs/AboutUs';
import NotFound from './components/pages/NotFound/NotFound';

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
