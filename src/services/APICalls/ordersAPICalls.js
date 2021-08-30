import axios from "axios";

const callURL = process.env.NODE_ENV === 'production' ?
  process.env.REACT_APP_SERVER : 'http://localhost:4000';

export const getShopOrders = async (shopId) => {
  const response = await axios({
    method: 'GET',
    url: `${callURL}/api/orders/shop/${shopId}`,
    withCredentials: true
  });
  const ordersData = response.data;
  const loadedOrders = [];

  if (ordersData.length > 0) {
    for (let index in ordersData) {
      loadedOrders.push({
        id: ordersData[index]?._id,
        name: ordersData[index].product?.name,
        quantity: ordersData[index]?.quantity,
        productPrice: ordersData[index].product?.price,
        status: ordersData[index]?.status,
        customer: ordersData[index]?.customer.username,
        fulfillmentDate: ordersData[index]?.updatedAt
      });
    }
  }

  return loadedOrders;
};


export const getTransactionHistory = async (userId) => {
  const response = await axios({
    method: 'GET',
    url: `${callURL}/api/orders/profile/${userId}`,
    withCredentials: true
  });

  const ordersData = response.data;
  const loadedOrders = [];

  for (let index in ordersData) {
    loadedOrders.push({
      id: ordersData[index]._id,
      purchasedOn: ordersData[index].purchasedOn,
      totalAmount: ordersData[index].totalAmount,
      orderDetails: ordersData[index].orderDetails
    });
  }

  return loadedOrders;
};


export const placeOrder = async (orderList) => {
  return await axios({
    method: 'POST',
    url: `${callURL}/api/orders`,
    data: orderList,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
};


export const fulfillOrder = async (orderId, orderItemId) => {
  return await axios({
    method: "PUT",
    url: `${callURL}/api/orders/shop/${orderId}/fulfill`,
    data: {
      orderDetailId: orderItemId
    },
    withCredentials: true
  });
};