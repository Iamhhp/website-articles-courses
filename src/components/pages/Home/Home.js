import Hero from '../../Hero/Hero';
import './Home.css';

const Home = () => {
  return (
    <>
      <Hero />
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path
          fill='#2196f3'
          d='M0 224l30-32c30-32 90-96 150-101.3 60-5.7 120 48.3 180 90.6 60 42.7 120 74.7 180 69.4 60-5.7 120-47.7 180-69.4C780 160 840 160 900 144c60-16 120-48 180-26.7 60 21.7 120 95.7 180 90.7s120-91 150-133.3l30-42.7V0H0z'
        ></path>
      </svg>
    </>
  );
};
export default Home;
