import Jumbotron from 'react-bootstrap/Jumbotron';

import Container from 'react-bootstrap/Container';

import './Banner.styles.scss';

const Banner = (props) => {
  return (
    <Jumbotron>
      <div id="homepage-banner-overlay">
        <Container className="homepage-banner">
          <h1 >{props.title}</h1>
          <p className="lead">{props.description}</p>
        </Container>
      </div>
    </Jumbotron>
  );
}

export default Banner;