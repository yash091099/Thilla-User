import React, { useContext, useEffect, useState } from 'react';
import closeIcon from '../assets/close-icon.svg';
import rightArrowIcon from '../assets/right-arrow.svg';
import { getProducts, addProductToCart, removeItemFromCart, getCartTotal, placeOrder } from '../context/services/product';
import Context from '../context/AppContext';
import ProductCardWishlist from './ProductCardWishlist';
import timerIcon from '../assets/timer-big.svg';
import CustomLoader from './loader';
import toast from 'react-hot-toast';

export default function CartModal(props) {
    const { setShowProductModal, cartProducts, setCartProducts, refetchCartListing } = useContext(Context);
    const [beforeCheckOutProduct, setBeforeCheckOutProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cartTotal, setCartTotal] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setLoading(true);
        const fetchProducts = async () => {
            const productsResponse = await getProducts();
            setProducts(productsResponse.data.products);
            setBeforeCheckOutProduct(productsResponse.data.products.sort(() => 0.5 - Math.random()).slice(0, 2));
            const cartTotalResponse = await getCartTotal();
            setCartTotal(cartTotalResponse.data.cart_total);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const handleQuantityChange = async (product, increment) => {
        setLoading(true);
        if (increment) {
            await addProductToCart({ product_id: product.product_id, quantity: 1 });
        } else {
            if (product.quantity === 1) {
                await removeItemFromCart({ product_id: product.product_id });
            } else {
                await addProductToCart({ product_id: product.product_id, quantity: -1 });
            }
        }
        await refetchCartListing();
        setLoading(false);
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        const orderResponse = await placeOrder();
        if (orderResponse?.data?.success) {
            console.log(orderResponse?.data.order)
            console.log(orderResponse?.data?.order,'---------------========')
            setOrderDetails(orderResponse?.data.order);
            toast.success(`Order for amount ${orderResponse?.data?.order?.amount} placed successfully with id ${orderResponse?.data?.order?.id}`, { duration: 4000 });
            refetchCartListing();
            setShowOrderModal(true);
            setTimeout(() => {
                
                displayRazorpay(orderResponse?.data?.order)
            },2000);
            props.onClose(true); // Prevent the modal from closing by keeping it open
        } else {
            setLoading(false);
        }
    };
    function loadScript(src) {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => {
            resolve(true);
          };
          script.onerror = () => {
            resolve(false);
          };
          document.body.appendChild(script);
        });
      }
    
  
    async function displayRazorpay(order) {
        setLoading(true);
        const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    
        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            setLoading(false);
            return;
        }
    console.log((Number(orderDetails?.amount) + 15) * 100);
    console.log(typeof(order),order,'----------------order-------------------');
    const totalAmountInPaise = Math.ceil(Number(order?.amount) + Number(15)) * 100;

        const options = {
            key: "rzp_test_FELPeq7HeVvV2w",
            amount: totalAmountInPaise,
            currency: 'INR',
            name: "Thilla",
            description: "Testing Thilla",
            order_id: orderDetails?.order_id,
            handler: async function (response) {
                try {
                    const verificationResponse = await verifySignature({
                        variables: {
                            input: {
                                orderId: response.razorpay_order_id,
                                paymentId: response.razorpay_payment_id,
                                signature: response.razorpay_signature
                            }
                        }
                    });
                    if (verificationResponse.data.verifyPaymentSignature.status === "SUCCESS") {
                        setLoading(false);
                        navigate("/home");
                    } else {
                        navigate("/home");

                        toast.error("Payment verification failed");
                    }
                } catch (error) {
                    console.error('Error verifying payment signature:', error);
                    setLoading(false);
                    navigate("/home");
                }
            },
            prefill: {
                name: "Thilla",
                email: "contact@thilla.com",
                contact: "6377955567"
            },
            theme: {
                color: "#61dafb"
            },
            modal: {
                ondismiss: function () {
                    setLoading(false);
                }
            }
        };
    
        try {
            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (err) {
            console.error("Error during payment creation or Razorpay modal opening:", err);
            setLoading(false);
        }
    }
    
    return (
        <div className="fixed bg-transparent top-0 left-0 right-0 bottom-0">
            {loading && <CustomLoader />}
            <div className="fixed bg-transparent top-0 left-0 right-0 bottom-0" onClick={() => { props.onClose(false); }}></div>
            <div className="fixed md:top-[10px] md:right-[20px] flex flex-col gap-[16px] max-h-[100vh] md:max-h-[80vh] overflow-y-auto no-scrollbar p-[32px] bg-light-background w-full md:w-[511px] border border-gray-200 rounded-md shadow-md">
                <div className="flex justify-between">
                    <h1>My Cart</h1>
                    <img src={closeIcon} alt="close" onClick={() => { props.onClose(false); }} />
                </div>
                <div className="flex justify-between bg-white p-[16px] rounded-[6px]">
                    <div className="flex flex-col gap-[16px] w-full">
                        <div className="flex gap-[8px] items-center">
                            <img src={timerIcon} alt="timer" />
                            <div>
                                <h2>Delivery in 12 mins</h2>
                                <p>{cartProducts?.length} items</p>
                            </div>
                        </div>
                        {cartProducts.map(product => (
                            <div key={product.id} className="flex flex-wrap justify-between items-center gap-[8px]">
                                <div className="flex flex-wrap gap-[8px]">
                                    <img className="border-2 border-subtle-text w-[90px]" src={products.find(p => p.id === product.product_id)?.image?products.find(p => p.id === product.product_id)?.image?.includes('https://') ? products.find(p => p.id === product.product_id)?.image : `https://thilaa.jethitech.com/storage/${products.find(p => p.id === product.product_id)?.image}`:''} alt="product" />
                                    <div className="flex flex-col justify-between w-[131px]">
                                        <h1 className="text-text text-[14px] font-[500]">{product.name}</h1>
                                        <p className="text-text text-[14px] font-[400]">{product.quantity}x{product.unit_name}</p>
                                        <div className="flex gap-[4px]">
                                            <p className="text-text text-[14px] font-[400]">&#8377; {product.price}</p>
                                            <p className="text-[#A5A5A5] text-[14px] font-[400] line-through">&#8377; {product.price}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-[16px] text-light-background text-[16px] bg-[#2B9512] px-[16px] py-[8px] rounded-md">
                                    <span className='cursor-pointer' onClick={() => handleQuantityChange(product, false)}>-</span>
                                    <span>{product.quantity}</span>
                                    <span className='cursor-pointer' onClick={() => handleQuantityChange(product, true)}>+</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between bg-white p-[16px] rounded-[6px]">
                    <div className="flex gap-[16px] items-center">
                        <div className='flex flex-col gap-[24px]'>
                            <h2 className='text-text text-[16px] font-[500]'>Before you Checkout</h2>
                            <div className='flex flex-wrap gap-[32px]'>
                                {beforeCheckOutProduct.map(product => (
                                  <ProductCardWishlist 
    key={product.id} 
    product={{ product_details: product }} 
    p_id={product.id} 
    image={product.image} 
    name={product.name} 
    price={product.price} 
    openProduct={setShowProductModal} 
/>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-[16px] bg-white p-[16px] rounded-[6px]">
                    <h1 className="text-[16px] font-[500]">Amount</h1>
                    <div className="flex justify-between">
                        <p>MRP</p>
                        <p>&#8377; {cartTotal}</p>
                    </div>
                {Number(cartTotal)>0&&    <div className="flex justify-between">
                        <p>Delivery Charges</p>
                        <p>&#8377; 15</p>
                    </div>}
                </div>
                <div className="flex justify-between items-center bg-primary-brand px-[16px] py-[8px] rounded-md">
                    <div>
                    <h1 className="text-text text-[16px] font-[600]">&#8377; {Number(cartTotal) + ((Number(cartTotal) > 0) ? 15 : 0)}</h1>
                        <p>TOTAL</p>
                    </div>
                    <div className="cursor-pointer flex gap-[4px]" onClick={handlePlaceOrder}>
                        <p>Proceed</p>
                        <img src={rightArrowIcon} alt="Link" />
                    </div>
                </div>
            </div>
            {/* {showOrderModal && (
                <div className="fixed bg-transparent top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                    <div className="bg-white p-[32px] rounded-md">
                        <h1>Order Details</h1>
                        <p>Order ID: {orderDetails?.order_id}</p>
                        <p>Status: {orderDetails?.status}</p>
                        <p>Total: &#8377; {Number(orderDetails?.amount)+15}</p>
                        <div className="flex gap-[8px] mt-[16px]">
                            <button onClick={handlePayment}>Proceed to Payment</button>
                            <button onClick={() => setShowOrderModal(false)}>Close</button>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
}
