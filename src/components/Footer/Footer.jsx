import { memo, useEffect } from 'react';
import './Footer.css';
import { Container } from 'react-bootstrap';
import { useStateThemeContext } from '../../Context/ThemeContext';

const Footer = () => {
  useEffect(() => {
    console.log('Footer Render!');
  });

  const stateTheme = useStateThemeContext();
  return (
    <Container fluid className='container-footer' style={{ backgroundColor: stateTheme.color }}>
      <b>Footer</b>
    </Container>
  );
};
export default memo(Footer);
