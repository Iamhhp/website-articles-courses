import './Home.css';
import Hero from '../../components/Hero/Hero';
import CardArticle from '../../components/CardArticle/CardArticle';
import useFetch from '../../Hooks/useFetch';
import { Container } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import CardCourse from '../../components/CardCourse/CardCourse';
import NoResponse from '../NoResponse/NoResponse';

const Home = () => {
  useEffect(() => {
    console.log('Home Render!');
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [dataArticles, isPendingArticle] = useFetch('https://dbserver.liara.run/articles');
  const [dataCourses, isPendingCourses] = useFetch('https://dbserver.liara.run/courses');

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

          {isPendingArticle === true ? (
            <SwiperSlide>
              <h3>درحال بارگذاری...</h3>
            </SwiperSlide>
          ) : isPendingArticle.responseState ? (
            <SwiperSlide>
              <NoResponse responseState={isPendingArticle.responseState} />
            </SwiperSlide>
          ) : (
            dataArticles
              .filter((article, i) => i >= 0 && i <= 6)
              .map((article) => (
                <SwiperSlide key={article.id}>
                  <CardArticle {...article} />
                </SwiperSlide>
              ))
          )}
        </Swiper>

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

          {isPendingCourses === true ? (
            <SwiperSlide>
              <h3>در حال بارگذاری...</h3>
            </SwiperSlide>
          ) : isPendingCourses.responseState ? (
            <SwiperSlide>
              <NoResponse responseState={isPendingCourses.responseState} />
            </SwiperSlide>
          ) : (
            dataCourses
              .filter((article, i) => i >= 0 && i <= 6)
              .map((course) => (
                <SwiperSlide key={course.id}>
                  <CardCourse {...course} />
                </SwiperSlide>
              ))
          )}
        </Swiper>
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
