// services/login.js
import httpEncap from './httpEncap';
const baseUrl = 'https://thilaa.jethitech.com/api/';


export const getStores = (data) => {
  return httpEncap.get(baseUrl + 'get-stores', data);
};
export const getCategories = (data) => {
  return httpEncap.get(baseUrl + 'get-categories', data);
};

export const getProductsByStores = (data) => {
  return httpEncap.get(baseUrl + `store-products-page/${data}`);
}



