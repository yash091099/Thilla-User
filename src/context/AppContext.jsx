import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { getCartListing,getWishlist } from "./services/product";
import { getProfile } from "./services/profile";
import { getProducts } from "./services/product";

const Context = createContext({});
export default Context;

export function AppContext({ children }) {

  const [showProductModal, setShowProductModal] = useState(false);
  const [modalProductId, setModalProductId] = useState(undefined);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedProduct, setSelectededProduct] = useState(JSON.parse(localStorage.getItem('selectedProduct')) || {});
  const [searchInputProductNavbar, setSearchInputProductNavbar] = useState('');
  const [userProfile, setUserProfile] = useState({});
  const [products, setProducts] = useState([]);
  const [storeId, setStoreId] = useState(localStorage.getItem('storeId'));

  const [showCart, setShowCart] = useState(false);
  const [wishlistProducts, setWishListProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState();


  const setNotificationsOn=()=>{
    setShowNotifications(!showNotifications)
  }
useEffect(() => {
  getProfile().then((res) => {
    console.log(res.data.profile,'------------------cart listing response')
    setUserProfile(res.data.profile||[]);
  }); 

  getProducts().then((res) => {
    console.log(res.data.products,'------------------product listing response')
    setProducts(res.data.products||[]);
  })
 },[])

  useEffect(() => {
    getCartListing().then((res) => {
      console.log(res.data.cart_items,'------------------cart listing response')
      setCartProducts(res.data.cart_items||[]);
    });
    getWishlist().then((res) => {
      console.log(res.data.wishlist,'------------------wishlist response')
      setWishListProducts(res.data.wishlist||[]);
    })
  },[])
  
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    // Update local storage when authToken changes
    if (authToken) {
      localStorage.setItem('authToken', authToken);
    } else {
      localStorage.removeItem('authToken');
    }
  }, [authToken]);
  const refetchWishlist = () => {
    getWishlist().then((res) => {
      console.log(res.data.wishlist,'------------------wishlist response')
      setWishListProducts(res.data.wishlist||[]);
    })
  }
  const refetchCartListing = () => {
    getCartListing().then((res) => {
      console.log(res.data.cart_items,'------------------cart_items response')
      setCartProducts(res.data.cart_items||[]);
    })
  }
  const refetchProfile = () => {
    getProfile().then((res) => {
      console.log(res.data.profile,'------------------cart listing response')
      setUserProfile(res.data.profile||[]);
    });   }

  return (
    <Context.Provider
      value={{
        showProductModal,
        refetchCartListing,
        setShowProductModal,
        setSelectededProduct,
        setStoreId,
        storeId,
        selectedProduct,
        showNotifications,
        searchInputProductNavbar, setSearchInputProductNavbar,
        setShowNotifications,
        setNotificationsOn,
        showCart,
        setShowCart,
        wishlistProducts,
        setWishListProducts,
        cartProducts, 
        refetchWishlist,
        setCartProducts,
        modalProductId,
        setModalProductId,
        products,
        authToken, 
        setAuthToken, 
        refreshToken,
        setRefreshToken,
        userProfile,
        setUserProfile,
        refetchProfile

      }}
    >
      {children}
    </Context.Provider>
  );
}
