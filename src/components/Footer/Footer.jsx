import { memo, useEffect } from 'react';
import './Footer.css';
import { Container } from 'react-bootstrap';

const Footer = () => {
  useEffect(() => {
    console.log('Footer Render!');
  });

  return (
    <Container fluid className='container-footer'>
      <b>Footer</b>
    </Container>
  );
};
export default memo(Footer);
