import './Hero.css';
import { Col, Container, Row } from 'react-bootstrap';
import imgHero from './../../assets/images/hero.svg';
import { PiStudentFill } from 'react-icons/pi';
import { SlControlStart } from 'react-icons/sl';
import { FaRProject } from 'react-icons/fa';
import { RiArticleFill } from 'react-icons/ri';
import { GiTeacher } from 'react-icons/gi';
import CountUp from 'react-countup';
import aos from 'aos';
import 'aos/dist/aos.css';
import { memo, useEffect } from 'react';
import { useStateThemeContext } from '../../Context/ThemeContext';

const Hero = () => {
  useEffect(() => {
    console.log('Hero Render!');
  });

  useEffect(() => {
    aos.init();
  }, []);

  const stateTheme = useStateThemeContext();

  return (
    <Container fluid className='container-hero' style={{ backgroundColor: stateTheme.color }}>
      <Container>
        <Row>
          <Col className='col-sm-12 col-md-6 col-lg-5'>
            <div className='img-hero' data-aos='fade-left'>
              <img src={imgHero} alt='' />
            </div>
          </Col>
          <Col className='col-sm-12 col-md-6 col-lg-7' data-aos='fade-right'>
            <div className='title-hero'>آمارها باعث افتخار ما هستند</div>
            <Row className='row-cols-1 row-cols-sm-2'>
              <Col data-aos='flip-left'>
                <HeroBox title={'تعداد دانشجو'} icon={<PiStudentFill className='icon' />} count={7705} />
              </Col>
              <Col data-aos='flip-left'>
                <HeroBox title={'تعداد پروژه ها'} icon={<FaRProject className='icon' />} count={87} />
              </Col>
              <Col data-aos='flip-left'>
                <HeroBox title={'تعداد مقاله'} icon={<RiArticleFill className='icon' />} count={72} />
              </Col>
              <Col data-aos='flip-left'>
                <HeroBox title={'تعداد دوره ها '} icon={<GiTeacher className='icon' />} count={15} />
              </Col>
            </Row>
            <div className='start-learn'>
              شروع یادگیری <SlControlStart />
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};
export default memo(Hero);

const HeroBox = ({ title, count, icon }) => {
  return (
    <div className='container-heroBox'>
      <div className='title'>
        {icon} {title}
      </div>
      <div className='count'>
        <CountUp start={0} end={count} duration={3} delay={1} />
      </div>
    </div>
  );
};
