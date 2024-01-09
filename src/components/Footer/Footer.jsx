import { memo, useEffect } from 'react';
import './Footer.css';
import { Container } from 'react-bootstrap';
import useTheme from '../../Hooks/useTheme';

const Footer = () => {
  useEffect(() => {
    console.log('Footer Render!');
  });

  const { colorState } = useTheme();

  return (
    <Container fluid className='container-footer' style={{ backgroundColor: colorState.headerFooter }}>
      <b>Footer</b>
    </Container>
  );
};
export default memo(Footer);
