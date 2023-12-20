import { FaChalkboardTeacher, FaRegQuestionCircle } from 'react-icons/fa';
import './CardCourse.css';
import { GiDuration } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import { RiMoneyDollarCircleFill } from 'react-icons/ri';
import { PiStudentFill } from 'react-icons/pi';

const CardCourse = ({ id, image, studentCount, title, description, teacher, duration, mainPrice, discountPrice }) => {
  const formattingPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className='card-course'>
      <div className='header'>
        <img className='image' src={image} alt='' />
        <div className='student-count'>
          <div className='count'>{studentCount}</div>
          <div className='container-icon-q'>
            <FaRegQuestionCircle className='icon-q' />
          </div>
          <PiStudentFill className='icon' />
        </div>
      </div>

      <div className='title'>{title}</div>
      <div className='desc'>{description}</div>

      <div className='details-course'>
        <div className='writer'>
          <FaChalkboardTeacher className='icon' />
          مدرس : {teacher}
        </div>
        <div className='duration'>
          {duration}
          <GiDuration className='icon' />
        </div>
      </div>

      <div className='footer'>
        <NavLink>ثبت نام دوره</NavLink>

        <div className='price'>
          {discountPrice ? formattingPrice(discountPrice) : formattingPrice(mainPrice)}
          <RiMoneyDollarCircleFill className='icon' />
        </div>
      </div>
    </div>
  );
};
export default CardCourse;