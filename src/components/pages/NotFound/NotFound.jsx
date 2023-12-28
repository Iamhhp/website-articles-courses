import { Container } from 'react-bootstrap';
import './NotFound.css';

const NotFound = () => {
  return (
    <Container className='container-not-found'>
      <div className='title'>404</div>
      <div className='desc'>آدرس مورد نظر موجود نمی باشد!</div>
    </Container>
  );
};
export default NotFound;
