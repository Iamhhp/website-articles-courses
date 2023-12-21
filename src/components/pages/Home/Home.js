import './Home.css';
import Hero from '../../Hero/Hero';
import CardArticle from '../../CardArticle/CardArticle';
import useFetch from '../../../Hooks/useFetch';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import CardCourse from '../../CardCourse/CardCourse';

const Home = () => {
  useEffect(() => {
    console.log('Home Render!');
  });

  const [dataArticles, isPendingArticle] = useFetch('http://localhost:5000/articles');
  const [dataArticlesNewest, setDataArticlesNewest] = useState([]);
  useEffect(() => {
    const dataNewest = dataArticles.filter((article, i) => i >= 0 && i <= 6);
    setDataArticlesNewest([...dataNewest]);
  }, [dataArticles]);

  const [dataCourses, isPendingCourses] = useFetch('http://localhost:5000/courses');
  const [dataCoursesNewest, setDataCoursesNewest] = useState([]);
  useEffect(() => {
    const dataNewest = dataCourses.filter((course, i) => i >= 0 && i <= 6);
    setDataCoursesNewest([...dataNewest]);
  }, [dataCourses]);

  return (
    <>
      <Hero />
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path
          fill='#2196f3'
          d='M0 224l30-32c30-32 90-96 150-101.3 60-5.7 120 48.3 180 90.6 60 42.7 120 74.7 180 69.4 60-5.7 120-47.7 180-69.4C780 160 840 160 900 144c60-16 120-48 180-26.7 60 21.7 120 95.7 180 90.7s120-91 150-133.3l30-42.7V0H0z'
        ></path>
      </svg>

      <Container>
        {isPendingArticle ? (
          <h3>درحال بارگذاری...</h3>
        ) : (
          <Swiper
            className='my-swiper'
            breakpoints={{ 1200: { slidesPerView: 3 }, 768: { slidesPerView: 2 }, 576: { slidesPerView: 1 } }}
            spaceBetween={40}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            modules={[Autoplay]}
          >
            <div className='header-swiper'>
              <div className='title'>جدیدترین مقالات</div>
              <BtnSwiper />
            </div>

            {dataArticlesNewest.map((article) => (
              <SwiperSlide key={article.id}>
                <CardArticle {...article} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {isPendingCourses ? (
          <h3>در حال بارگذاری...</h3>
        ) : (
          <Swiper
            className='my-swiper'
            breakpoints={{ 1200: { slidesPerView: 3 }, 768: { slidesPerView: 2 }, 576: { slidesPerView: 1 } }}
            spaceBetween={40}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            modules={[Autoplay]}
          >
            <div className='header-swiper'>
              <div className='title'>جدیدترین مقالات</div>
              <BtnSwiper />
            </div>

            {dataCoursesNewest.map((course) => (
              <SwiperSlide key={course.id}>
                <CardCourse {...course} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </Container>
    </>
  );
};
export default Home;

const BtnSwiper = () => {
  const swiper = useSwiper();
  return (
    <div className='btn-swiper'>
      <button
        type='button'
        className='btn-backward'
        onClick={() => {
          swiper.slidePrev();
        }}
      >
        <FaArrowCircleRight className='icon' />
      </button>

      <button
        type='button'
        className='btn-forward'
        onClick={() => {
          swiper.slideNext();
        }}
      >
        <FaArrowCircleLeft className='icon' />
      </button>
    </div>
  );
};
