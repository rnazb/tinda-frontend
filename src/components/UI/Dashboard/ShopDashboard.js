import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getShopProducts } from '../../../services/APICalls/productsAPICalls';
import { getShopOrders, fulfillOrder } from '../../../services/APICalls/ordersAPICalls';

import ProductAddForm from '../Forms/ProductAddForm';
import ShopOrderListItem from '../../TableListItems/ShopOrderListItem';
import ShopSalesListItem from '../../TableListItems/ShopSalesListItem';
import ShopProductListItem from '../../TableListItems/ShopProductListItem';

import LineChart from '../../Charts/LineChart';
import PieChart from '../../Charts/PieChart';

import Button from '../Button';

import {
  Container,
  Card,
  Table,
  Tabs,
  Tab
} from 'react-bootstrap';

import './ShopDashboard.styles.scss';

const ShopDashboard = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [productLabels, setProductLabels] = useState([]);
  const [productSales, setProductSales] = useState([]);
  const [orders, setOrders] = useState([]);
  const [revenueTotal, setRevenueTotal] = useState(0);
  const [salesTotal, setSalesTotal] = useState(0);

  // Add product form state management

  const [addFormIsShown, setAddFormIsShown] = useState(false);

  const showAddFormHandler = () => {
    setAddFormIsShown(true);
  };

  const hideAddFormHandler = () => {
    setAddFormIsShown(false);
  };

  // Tabs state management

  const [key, setKey] = useState('sales');
  const [chartKey, setChartKey] = useState('quarterly-revenue');

  // Load shop products

  useEffect(() => {
    const loadShopProducts = async () => {
      const shopData = await getShopProducts(id);

      setProducts(shopData.loadedProducts);
      setProductLabels(shopData.loadedProductLabels);
      setProductSales(shopData.loadedProductSales);
      setRevenueTotal(shopData.loadedRevenue);
      setSalesTotal(shopData.loadedSales);
    }
    loadShopProducts();
  }, [id]);

  const productsList = products.map(productItem =>
    <ShopProductListItem
      key={productItem.id}
      id={productItem.id}
      name={productItem.name}
      description={productItem.description}
      price={productItem.price}
    />
  );

  // Load shop orders

  useEffect(() => {
    const loadShopOrders = async () => {
      const loadedShopOrders = await getShopOrders(id);
      setOrders(loadedShopOrders);
    };
    loadShopOrders();
  }, [id]);

  let endOfPrevYearRevenue = 0;
  let firstQuarterRevenue = 0;
  let secondQuarterRevenue = 0;
  let thirdQuarterRevenue = 0;
  let fourthQuarterRevenue = 0;

  const ordersList = orders.map(orderItem => {
    const orderValue = orderItem.quantity * orderItem.productPrice;

    const date = new Date(orderItem.fulfillmentDate);
    const getMonth = date.getMonth();

    if (getMonth >= 0 && getMonth < 3 && orderItem.status === 'Completed') {
      firstQuarterRevenue += orderValue;
    }

    if (getMonth >= 3 && getMonth < 6 && orderItem.status === 'Completed') {
      secondQuarterRevenue += orderValue;
    }

    if (getMonth >= 6 && getMonth < 9 && orderItem.status === 'Completed') {
      thirdQuarterRevenue += orderValue;
    }

    if (getMonth >= 9 && getMonth < 12 && orderItem.status === 'Completed') {
      fourthQuarterRevenue += orderValue;
    }

    const fulfillOrderHandler = async (event) => {
      event.preventDefault();
      await fulfillOrder(id, orderItem.id);
      window.location.reload(false);
    };

    return (
      <ShopOrderListItem
        key={orderItem.id}
        name={orderItem.name}
        quantity={orderItem.quantity}
        orderValue={orderValue}
        customer={orderItem.customer}
        status={orderItem.status}
        onSubmit={fulfillOrderHandler}
      />
    );
  });

  // Load sales tracking

  const salesList = products.map(productItem =>
    <ShopSalesListItem
      key={productItem.id}
      name={productItem.name}
      sales={productItem.sales}
      revenue={productItem.revenue}
    />
  );

  const RevenueDisplay = () => {
    return (
      <tr>
        <th colSpan="3">Total Revenue: PHP {revenueTotal.toFixed(2)}</th>
      </tr>
    );
  };

  // Configure quarterly revenue display

  const lineChartLabels = ['Q4', 'Q1', 'Q2', 'Q3', 'Q4'];

  const lineChartData = [{
    label: `Total Revenue: PHP ${revenueTotal.toFixed(2)}`,
    data: [
      endOfPrevYearRevenue,
      firstQuarterRevenue,
      secondQuarterRevenue,
      thirdQuarterRevenue,
      fourthQuarterRevenue
    ],
    fill: false,
    backgroundColor: 'rgb(255, 99, 132)',
    borderColor: 'rgba(255, 99, 132, 0.2)'
  }];

  // Configure product performance display

  let labelBGColors = [];
  let labelBorderColors = [];

  products.map(elem => {
    let r = Math.floor(Math.random() * 255);
    let g = Math.floor(Math.random() * 255);
    let b = Math.floor(Math.random() * 255);
    let backgroundColor = `rgba(${r}, ${g}, ${b}, 0.2)`;
    let borderColor = `rgba(${r}, ${g}, ${b}, 0.4)`;
    labelBorderColors.push(borderColor);
    labelBGColors.push(backgroundColor);
    return () => { };
  });

  const pieChartLabels = productLabels;
  const pieChartData = [{
    label: 'Product Performance',
    data: productSales,
    backgroundColor: labelBGColors,
    borderColor: labelBorderColors,
    borderWidth: 1
  }];

  return (
    <>
      <Container>
        {addFormIsShown && <ProductAddForm onClose={hideAddFormHandler} />}

        <Tabs
          id="shop-dashboard"
          activeKey={key}
          onSelect={key => setKey(key)}
          className="dashboard-tabs"
        >

          <Tab eventKey="sales" title="Sales">

            <Card className="shop-dashboard-card">
              <Card.Body>

                <Tabs
                  id="sales-tracking"
                  activeKey={chartKey}
                  onSelect={chartKey => setChartKey(chartKey)}
                >

                  <Tab eventKey="quarterly-revenue" title="Quarterly Revenue">
                    <LineChart
                      labels={lineChartLabels}
                      data={lineChartData}
                    />
                  </Tab>

                  <Tab eventKey="product-performance" title="Product Performance">
                    <PieChart
                      labels={pieChartLabels}
                      data={pieChartData}
                      salesTotal={salesTotal}
                    />
                  </Tab>

                </Tabs>

                <Table bordered responsive>
                  {
                    revenueTotal > 0 ?
                      <>
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Items Sold</th>
                            <th>Revenue</th>
                          </tr>
                        </thead>
                        <tbody>
                          {salesList}
                          <RevenueDisplay />
                        </tbody>
                      </>
                      :
                      <thead>
                        <tr>
                          <td>
                            No sales have been made yet!
                          </td>
                        </tr>
                      </thead>
                  }
                </Table>
              </Card.Body>
            </Card>

          </Tab>

          <Tab eventKey="products" title="Products">

            <Card className="shop-dashboard-card">
              <Card.Body>
                <Table bordered responsive>
                  {
                    products.length > 0 ?
                      <>
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price </th>
                          </tr>
                        </thead>
                        <tbody>
                          {productsList}
                        </tbody>
                      </>
                      :
                      <thead>
                        <tr>
                          <td>
                            Start adding products!
                          </td>
                        </tr>
                      </thead>
                  }
                </Table>
              </Card.Body>
              <Card.Footer>
                <Button id="add-product-btn" className="primary-btn" onClick={showAddFormHandler}>Add product</Button>
              </Card.Footer>
            </Card>

          </Tab>

          <Tab eventKey="orders" title="Orders">

            <Card className="shop-dashboard-card">
              <Card.Body>
                <Table bordered responsive>
                  {
                    orders.length > 0 ?
                      <>
                        <thead>
                          <tr>
                            <th>Product</th>
                            <th>Quantity</th>
                            <th>Order Value</th>
                            <th>Customer</th>
                            <th>Fulfill Order</th>
                          </tr>
                        </thead>
                        <tbody>
                          {ordersList}
                        </tbody>
                      </>
                      :
                      <thead>
                        <tr>
                          <td>
                            No orders made yet!
                          </td>
                        </tr>
                      </thead>
                  }
                </Table>
              </Card.Body>
            </Card>

          </Tab>

        </Tabs>

      </Container>
    </>
  );
};

export default ShopDashboard;