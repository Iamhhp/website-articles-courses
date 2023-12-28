import './Course.css';
import { Col, Container, Row } from 'react-bootstrap';
import { PiStudent } from 'react-icons/pi';
import { useParams } from 'react-router-dom';
import useFetch from '../../../Hooks/useFetch';
import imgProfile from './../../../assets/images/img-profile.jpg';
import { GiProgression } from 'react-icons/gi';
import AccordionMenu from '../../AccordionMenu/AccordionMenu';
import { FaRegFileVideo } from 'react-icons/fa';

const Course = () => {
  const { idCourse } = useParams();

  const [{ image, title, teacher, descTeacher, studentCount, progressPercent }, isPending] = useFetch(`http://localhost:5000/courses/${idCourse}`);

  return (
    <Container className='container-course'>
      <div className='title-header'>دوره ها</div>
      <Row>
        {isPending ? (
          <b>درحال بارگذاری...</b>
        ) : (
          <>
            <Col>
              <div className='preview-course'>
                <div className='title'>{title}</div>

                <div className='about-teacher'>
                  <div className='image'>
                    <img src={imgProfile} alt='' />
                  </div>

                  <div className='intro'>
                    <div className='name'>{teacher}</div>
                    <div className='desc'>{descTeacher}</div>
                  </div>
                </div>

                <div className='details-course'>
                  <div className='student-count'>
                    <PiStudent className='icon' />
                    <div className='count'>تعداد دانشجو : {studentCount}</div>
                  </div>

                  <div className='progress-course'>
                    <div className='percent'>
                      <GiProgression className='icon' />
                      درصد پیشرقت دوره : {progressPercent}%
                    </div>
                    <div className='progress-bar'>
                      <div className='progress-fill' style={{ width: `${progressPercent}%` }}></div>
                    </div>
                  </div>

                  <button type='button'>ثبت نام</button>
                </div>
              </div>
            </Col>
            <Col>
              <div className='image'>
                <img src={image} alt='' />
              </div>

              <div className='course'>
                <AccordionMenu
                  title={
                    <div className='accordion-title'>
                      <b className='chapter'>معرفی و مقدمه</b>
                      <p className='desc'>برای مشاهده ویدئو های آموزشی کلیک کنید</p>
                    </div>
                  }
                >
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 1</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 1</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 2</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 3</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 4</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 5</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 6</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 7</a>
                  </li>
                </AccordionMenu>

                <AccordionMenu
                  title={
                    <div className='accordion-title'>
                      <b className='chapter'>مفاهیم پایه</b>
                      <p className='desc'>برای مشاهده ویدئو های آموزشی کلیک کنید</p>
                    </div>
                  }
                >
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 1</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 1</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 2</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 3</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 4</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 5</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 6</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 7</a>
                  </li>
                </AccordionMenu>

                <AccordionMenu
                  title={
                    <div className='accordion-title'>
                      <b className='chapter'>آشنایی با قوانین</b>
                      <p className='desc'>برای مشاهده ویدئو های آموزشی کلیک کنید</p>
                    </div>
                  }
                >
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 1</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 1</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 2</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 3</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 4</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 5</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 6</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 7</a>
                  </li>
                </AccordionMenu>

                <AccordionMenu
                  title={
                    <div className='accordion-title'>
                      <b className='chapter'>پروژه پایانی</b>
                      <p className='desc'>برای مشاهده ویدئو های آموزشی کلیک کنید</p>
                    </div>
                  }
                >
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 1</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 1</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 2</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 3</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 4</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 5</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 6</a>
                  </li>
                  <li className='item-accordion'>
                    <FaRegFileVideo className='icon-item' />
                    <a href=''>ویوئو آموزشی - 7</a>
                  </li>
                </AccordionMenu>
              </div>

              <div className='container-comment'>
                <div className='title'>نظرات</div>
                <textarea name='comment' id='' cols='30' rows='5'></textarea>
                <button type='button'>ارسال نظر</button>
              </div>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
};
export default Course;
