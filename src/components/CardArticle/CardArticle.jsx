import './CardArticle.css';
import { Link } from 'react-router-dom';
import { FaBookReader } from 'react-icons/fa';
import { useEffect } from 'react';
import useTheme from './../../Hooks/useTheme';

const CardArticle = ({ id, image, title, description, writer, readingTime }) => {
  useEffect(() => {
    console.log('CardArticle Render!');
  });
  const { colorState } = useTheme();

  return (
    <div className='card-article' style={{ borderColor: colorState.headerFooter, boxShadow: `0px 0px 5px 1px ${colorState.headerFooter}` }}>
      <img src={image} alt='' />

      <div className='title'>
        {title}-{id}
      </div>
      <div className='desc'>{description}</div>
      <Link to={`/Article/${id}`} className='btn-continue'>
        ادامه مقاله
      </Link>

      <div className='footer'>
        <div className='writer'>نویسنده : {writer}</div>
        <div className='readingTime'>
          <div className='time'>{readingTime}</div>
          <FaBookReader className='icon' />
        </div>
      </div>
    </div>
  );
};
export default CardArticle;
