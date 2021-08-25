import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTransactionHistory } from '../services/APICalls/ordersAPICalls';

import { Container, Card, Table } from 'react-bootstrap/';

import './profile.styles.scss';

const Profile = () => {
  const { id } = useParams();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadTransactionHistory = async () => {
      const loadedTransactionHistory = await getTransactionHistory(id);
      setOrders(loadedTransactionHistory);
    };
    loadTransactionHistory();
  }, [id]);

  const ordersList = orders.map(orderItem => {

    // Format date-time

    const date = new Date(orderItem.purchasedOn);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();
    const orderDate = `${formattedDate} - ${formattedTime}`

    // Populate order details

    const orderDetails = orderItem.orderDetails.map(orderDetail => {
      const amount = orderDetail.quantity * orderDetail.product.price;

      return (
        <tr key={orderDetail._id}>
          <td>{orderDetail.product.name}</td>
          <td>{orderDetail.quantity}</td>
          <td>{amount}</td>
          <td className={`order-${orderDetail.status.toLowerCase()}`}>{orderDetail.status}</td>
          <td>{orderDetail.vendor.username}</td>
        </tr>
      );
    });

    return (
      <Card className="order-item-card" key={orderItem.id}>
        <Card.Header>
          <h4>Purchased On: {orderDate}</h4>
        </Card.Header>
        <Card.Body>
          <Table bordered responsive>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Vendor</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    );
  });

  return (
    <Container>
      <Card className="transaction-history-card">
        <Card.Header>
          <h2>Transaction History</h2>
        </Card.Header>
        {ordersList.length > 0 ?
          <Card.Body>
            {ordersList}
          </Card.Body>
          :
          <Card.Body>
            <p>No purchases made yet...</p>
          </Card.Body>
        }
      </Card>
    </Container>
  );
};

export default Profile;