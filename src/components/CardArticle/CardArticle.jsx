import './CardArticle.css';
import { Link } from 'react-router-dom';
import { FaBookReader } from 'react-icons/fa';
import { memo, useEffect } from 'react';

const CardArticle = ({ id, image, title, description, writer, readingTime }) => {
  useEffect(() => {
    console.log('CardArticle Render!');
  });

  return (
    <div className='card-article'>
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
export default memo(CardArticle);
