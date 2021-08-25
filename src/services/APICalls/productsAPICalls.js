import axios from 'axios';

const callURL = process.env.REACT_APP_SERVER || 'http://localhost:4000';

export const getProducts = async () => {
  const response = await axios({
    method: 'GET',
    url: `${callURL}/api/products/`,
    withCredentials: true
  });

  const productsData = response.data;
  const loadedProducts = [];

  for (let index in productsData) {
    loadedProducts.push({
      id: productsData[index]._id,
      name: productsData[index].name,
      description: productsData[index].description,
      price: productsData[index].price,
      images: productsData[index].images,
      owner: productsData[index].owner,
      averageRating: productsData[index].averageRating
    });
  };

  return loadedProducts;
};


export const getSingleProduct = async (productId) => {
  const response = await axios({
    method: 'GET',
    url: `${callURL}/api/products/${productId}`,
    withCredentials: true
  });

  return response.data;
};

export const getShopIndex = async (shopId) => {
  const response = await axios({
    method: 'GET',
    url: `${callURL}/api/products/shop/${shopId}`,
    withCredentials: true
  });
  return response.data;
};

export const getShopProducts = async (shopId) => {
  const response = await axios({
    method: 'GET',
    url: `${callURL}/api/products/shop/${shopId}`,
    withCredentials: true
  });
  const productsData = response.data;

  const loadedProducts = [];
  const loadedProductLabels = [];
  const loadedProductSales = [];
  let loadedRevenue = 0;
  let loadedSales = 0;

  for (let index in productsData) {
    loadedProducts.push({
      id: productsData[index]._id,
      name: productsData[index].name,
      description: productsData[index].description,
      price: productsData[index].price,
      sales: productsData[index].sales,
      revenue: productsData[index].revenue
    });

    loadedRevenue += productsData[index].revenue;
    loadedSales += productsData[index].sales;

    loadedProductLabels.push(productsData[index].name);
    loadedProductSales.push(productsData[index].sales);
  }

  const shopData = {
    loadedProducts: loadedProducts,
    loadedProductLabels: loadedProductLabels,
    loadedProductSales: loadedProductSales,
    loadedRevenue: loadedRevenue,
    loadedSales: loadedSales
  };

  return shopData;
};

export const getAverageSellerRating = async (shopId) => {
  const response = await axios({
    method: 'GET',
    url: `${callURL}/api/products/shop/${shopId}/averagerating`,
    withCredentials: true
  });
  return response.data;
};

export const addProduct = async (formData) => {
  return await axios({
    method: 'POST',
    url: `${callURL}/api/products/`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  });
};


export const editProduct = async (productData, productId) => {
  return await axios({
    method: 'PUT',
    url: `${callURL}/api/products/${productId}/`,
    data: productData,
    headers: {
      'Content-Type': 'application/json'
    },
    withCredentials: true
  });
};

export const deleteProduct = async (productId) => {
  return await axios({
    method: 'DELETE',
    url: `${callURL}/api/products/${productId}`,
    withCredentials: true
  });
};

export const addProductImages = async (formData, productId) => {
  return await axios({
    method: 'POST',
    url: `${callURL}/api/products/${productId}/images/upload`,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    withCredentials: true
  });
};

export const deleteProductImages = async (data, productId) => {
  const deleteImages = true;
  return await axios({
    method: 'DELETE',
    url: `${callURL}/api/products/${productId}/images/delete`,
    data: { data, productId, deleteImages },
    withCredentials: true
  });
};