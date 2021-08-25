import { Link } from 'react-router-dom';
import { Container, Row, Col, Card } from 'react-bootstrap/';
import Button from '../components/UI/Button';

import { ReactComponent as WebShoppingSVG } from '../assets/web-shopping.svg';
import { ReactComponent as LovingItSVG } from '../assets/loving-it.svg';
import { ReactComponent as AddToCartSVG } from '../assets/addto-cart.svg';
import { ReactComponent as MetricsSVG } from '../assets/metrics.svg';

import shopScreenshot from '../assets/screenshot1.PNG';
import transactionScreenshot from '../assets/screenshot2.PNG';

import './home.styles.scss';

const Home = () => {
  return (
    <>
      <Container id="home-container">

        <Row id="hero-block" className="align-items-center">
          <Col
            className="hero-column"
            xs={{ span: 12, order: 1 }}
            lg={{ span: 6, order: 1 }}
          >
            <WebShoppingSVG />
          </Col>
          <Col
            className="hero-column"
            xs={{ span: 12, order: 2 }}
            lg={{ span: 6, order: 2 }}
          >
            <div id="header-text">
              <h1 id="main-header">Online E-commerce Marketplace</h1>
              <span id="main-blurb"><strong id="welcome-word">Welcome!</strong> Tinda (<em>which means 'to trade' in Filipino</em>) is a demo E-commerce web application where you can choose to become both a customer or a vendor!</span>
              <span id="main-link"><Link to="/market"><Button className="primary-btn">Start Browsing</Button></Link></span>
            </div>
          </Col>
        </Row>


        <h2 className="section-title">Features</h2>


        <Row id="features-block" className="d-flex align-items-stretch">
          <Col
            className="features-column"
            xs={{ span: 12, order: 1 }}
            lg={{ span: 4, order: 1 }}
          >
            <Card className="features-card">
              <LovingItSVG />
              <h3>Community Feedback</h3>
              <div>
                <ul className="features-list">
                  <li>Post user reviews</li>
                  <li>View average seller rating</li>
                  <li>Track transaction history</li>
                </ul>
              </div>
            </Card>
          </Col>
          <Col
            className="features-column"
            xs={{ span: 12, order: 2 }}
            lg={{ span: 4, order: 2 }}
          >
            <Card className="features-card">
              <AddToCartSVG />
              <h3>Store Management</h3>
              <div>
                <ul className="features-list">
                  <li>Add unlimited products</li>
                  <li>Upload product photos</li>
                  <li>Edit prices</li>
                </ul>
              </div>
            </Card>
          </Col>
          <Col
            className="features-column"
            xs={{ span: 12, order: 3 }}
            lg={{ span: 4, order: 3 }}
          >
            <Card className="features-card">
              <MetricsSVG />
              <h3>Sales Tracking & Fulfillment</h3>
              <div>
                <ul className="features-list">
                  <li>Track quarterly revenue</li>
                  <li>Analyze product performance</li>
                  <li>Make smarter decisions</li>
                </ul>
              </div>
            </Card>
          </Col>
        </Row>

        <h2 className="section-title">Screenshots</h2>

        <Row className="screenshots-block align-items-center">
          <Col
            xs={{ span: 12, order: 1 }}
            lg={{ span: 6, order: 1 }}
          >
            <Card.Img src={shopScreenshot} alt="" />
          </Col>
          <Col
            xs={{ span: 12, order: 2 }}
            lg={{ span: 6, order: 2 }}
          >
            <Card className="screenshots-card p-4 mt-4">
              <h4>Product Performance</h4>
              <p>See all of your products in the vendor dashboard and track sales & revenue in real-time. Add, edit, or remove as many products as you'd like.</p>
            </Card>
          </Col>
        </Row>

        <Row className="screenshots-block align-items-center">
          <Col
            xs={{ span: 12, order: 2 }}
            lg={{ span: 6, order: 1 }}
          >
            <Card className="screenshots-card p-4 mt-4">
              <h4>Transaction History</h4>
              <p>As a customer, it's important to keep track of what you have bought and when. Take note of the status of pending orders as well as the responsible vendor.</p>
            </Card>
          </Col>
          <Col
            xs={{ span: 12, order: 1 }}
            lg={{ span: 6, order: 2 }}
          >
            <Card.Img src={transactionScreenshot} alt="" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;