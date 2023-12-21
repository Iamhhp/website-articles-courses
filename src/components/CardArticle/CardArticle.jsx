import './CardArticle.css';
import { NavLink } from 'react-router-dom';
import { FaBookReader } from 'react-icons/fa';
import { useEffect } from 'react';

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
      <NavLink to={`/Article/${id}`} className='btn-continue'>
        ادامه مقاله
      </NavLink>

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
