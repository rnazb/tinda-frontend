import Banner from '../components/Banner/Banner';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './notFound.styles.scss';

const NotFound = () => {
  return (
    <>
      <Banner
        title="Page not found!"
        description="We couldn't find the page you were looking for..."
      />
      <Container id="page-not-found-container">
        <p>Click <Link to='market'>here</Link> to go back to the market</p>
      </Container>
    </>
  );
};

export default NotFound;