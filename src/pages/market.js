import Container from 'react-bootstrap/Container';
import Products from '../components/Products/Products';

import './market.styles.scss';

const Market = () => {
  return (
    <>
      <Container id="market-container">
        <Products />
      </Container>
    </>
  );
};

export default Market;