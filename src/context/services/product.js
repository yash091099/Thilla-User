// services/login.js
import httpEncap from './httpEncap';
const baseUrl = 'https://thilaa.jethitech.com/api/';
import instance from "./httpInterceptor";

export const searchProduct = (data) => {
  return httpEncap.post(baseUrl + 'search-products', data);
};
export const searchStores= (data) => {
  return httpEncap.post(baseUrl + 'search-stores', data);
};


export const getCartListing = () => {
  const url = `${baseUrl}view-cart`;
  return instance.get(url);
};

export const getProducts= () => {
  const url = `${baseUrl}get-products`;
  return instance.get(url);
}

export const addProductToWishlist = (data) => {
  const url = `${baseUrl}wishlist`;
  return instance.post(url,data);
}
export const getWishlist = () => {
  const url = `${baseUrl}wishlist`;
  return instance.get(url);
}

export const removeProductFromWishlist = (data) => {
  const url = `${baseUrl}wishlist/${data}`;
  return instance.delete(url,data);
}
export const getProductCategoryWise = (id) => {
  const url = `${baseUrl}store-products-page/${id}`;
  return instance.get(url);
};

export const addProductToCart = (data) => {
  const url = `${baseUrl}add-to-cart`;
  return instance.post(url,data);
  
}

export const removeItemFromCart = (data) => {
  const url = `${baseUrl}remove-from-cart`;
  return instance.post(url,data);
}

export const getCartTotal = () => {
  const url = `${baseUrl}cart-total`;
  return instance.get(url);
}

export const placeOrder = () => {
  const url = `${baseUrl}place-order`;
  return instance.post(url);
}