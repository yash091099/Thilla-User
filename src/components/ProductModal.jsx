import React, { useContext, useEffect, useState } from 'react';
import backIcon from '../assets/left-arrow.svg';
import wishlistIcon from '../assets/favoruite-black.svg';
import wishlistIconFilled from '../assets/wishlist.png'; // Ensure you have this icon for filled state
import historyIcon from '../assets/history.svg';
import listIcon from '../assets/list.svg';
import minusIcon from '../assets/minus.svg';
import plusIcon from '../assets/plus.svg';
import ProductCard2 from '../components/ProductCard2';
import PrimaryButton from './PrimaryButton';
import Context from '../context/AppContext';
import CustomLoader from './loader';
import toast from 'react-hot-toast';
import { addProductToWishlist, getProducts, addProductToCart, removeProductFromWishlist } from '../context/services/product';

export default function ProductModal(props) {
    const { setWishListProducts, selectedProduct, refetchWishlist, refetchCartListing, wishlistProducts, cartProducts } = useContext(Context);
    const [productCount, setProductCount] = useState(1);
    const [oftenBoughtProduct, setOftenBoughtProduct] = useState([]);
    const [slider, setSlider] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isInWishlist, setIsInWishlist] = useState(false);
    
    const [isInCart, setIsInCart] = useState(false);
    useEffect(() => {
        setLoading(true);
        getProducts().then((res) => {
            setOftenBoughtProduct(res.data.products);
            setLoading(false);
        });

        setIsInWishlist(wishlistProducts?.some(product => product.product_id === selectedProduct.id));
        let foundProduct = cartProducts?.find(product => product.product_id === selectedProduct.id);
        if (foundProduct) {
            setIsInCart(true);
            setProductCount(foundProduct.quantity);
        }
    }, [selectedProduct, wishlistProducts, cartProducts]);

    const FuncAddToWishlist = async () => {
        if(isInWishlist){
            setLoading(true);
            await removeProductFromWishlist( selectedProduct?.id ).then((res) => {
                // setWishListProducts(res.data.wishlist);
                toast.success('Added to Wishlist');
                setIsInWishlist(false);
            }).catch(error => {
                toast.error('Error adding to Wishlist');
            }).finally(() => {
                setLoading(false);
                refetchWishlist();
                props.onClose(false);
            });

        }else{
            setLoading(true);
            await addProductToWishlist({ product_id: selectedProduct?.id }).then((res) => {
                setWishListProducts(res.data.wishlist);
                toast.success('Added to Wishlist');
                setIsInWishlist(true);
            }).catch(error => {
                toast.error('Error adding to Wishlist');
            }).finally(() => {
                setLoading(false);
                refetchWishlist();
                props.onClose(false);
            });
        }
  
    };

    const addToCart = async () => {
        setLoading(true);
        await addProductToCart({ product_id: selectedProduct?.id, quantity: productCount }).then((res) => {
            refetchCartListing();
            toast.success('Added to Cart');
            setIsInCart(true);
        }).catch(error => {
            toast.error('Error adding to Cart');
        }).finally(() => {
            setLoading(false);
            props.onClose(false);
        });
    };

    if (loading) return <CustomLoader />;

    return (
        <div className='fixed bg-transparent top-0 left-0 right-0 bottom-0'>
            <div className='fixed bg-black/30 top-0 left-0 right-0 bottom-0 backdrop-blur-[2px]' onClick={() => { props.onClose(false) }}></div>
            <div className='fixed bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen lg:w-[1120px] h-screen md:max-h-[90%] overflow-y-auto flex flex-col gap-[24px] md:gap-[8px] p-[16px] md:p-[32px] no-scrollbar'>
                <div className='cursor-pointer flex gap-[4px] items-center mt-[48px] md:mt-[0px]' onClick={() => { props.onClose(false) }}>
                    <img className='' src={backIcon} alt="back" />
                    <p className='text-text text-[16px] font-[600] py-1'>Back</p>
                </div>
                <div className='flex gap-[8px] md:gap-[40px]'>
                    <div className='md:w-1/3 flex justify-center items-center'>
                        <img className="w-[110px] md:w-[200px] max-h-[220px]" src={'https://thilaa.jethitech.com/storage/' + selectedProduct?.image} alt="product" />
                    </div>
                    <div className='md:w-2/3 flex flex-col gap-[8px] xxl:gap-[24px] md:p-[12px] xxl:p-[32px] md:border border-[#A5A5A5] w-full rounded-md shadow-sm'>
                        <div className='flex justify-between items-center gap-[4px]'>
                            <div className='flex-1 flex flex-col gap-[8px]'>
                                <div>
                                    <h1 className='text-text text-[12px] md:text-[16px] font-[600]'>{selectedProduct?.name}</h1>
                                    <p className='text-text text-[12px] font-[400]'>{selectedProduct?.sku}</p>
                                </div>
                                <div className='flex gap-[4px]'>
                                    <p className='text-text text-[12px] md:text-[16px] font-[600]'>&#8377; {selectedProduct?.price}</p>
                                </div>
                                <p className='hidden md:block text-text text-[12px] md:text-[16px] font-[600]'>Total stock quantity : {selectedProduct?.stock_available} </p>
                            </div>
                            <div className='md:hidden flex-1 flex justify-between items-center gap-[4px] w-fit h-fit px-[4px] border-2 border-[#A5A5A5] rounded-md shadow-sm'>
                                <img className='cursor-pointer w-[12px]' src={minusIcon} alt="minus" onClick={() => { setProductCount(prev => { if (prev > 1) prev--; return prev }) }} />
                                <span className='text-dark text-[16px] font-[600]'>{productCount}</span>
                                <img className='cursor-pointer w-[12px]' src={plusIcon} alt="plus" onClick={() => { setProductCount(prev => prev + 1) }} />
                            </div>
                        </div>
                        <div className='flex flex-col gap-[16px]'>
                            <div className='hidden md:flex items-center gap-[16px]'>
                                <div className='md:flex-1 flex justify-between items-center px-[32px] py-[2px] border border-[#A5A5A5] rounded-md shadow-sm'>
                                    <img className='cursor-pointer' src={minusIcon} alt="minus" onClick={() => { setProductCount(prev => { if (prev > 1) prev--; return prev }) }} />
                                    <span className='text-dark text-[16px] font-[600]'>{productCount}</span>
                                    <img className='cursor-pointer' src={plusIcon} alt="plus" onClick={() => { setProductCount(prev => prev + 1) }} />
                                </div>
                                <div className='md:flex-1'>
                                    <button className='text-center text-text text-[16px] font-[600] bg-primary-brand py-[4px] px-[32px] rounded-[6px] w-full' onClick={() => { addToCart() }}>
                                        {isInCart ? 'Update Cart' : 'Add To Cart'}
                                    </button>
                                </div>
                            </div>
                            <div className='flex justify-center gap-[24px]'>
                                <div className='cursor-pointer flex items-center gap-[4px]' onClick={() => { FuncAddToWishlist({ product_id: selectedProduct?.id }); }}>
                                    <img className='w-[14px]' src={isInWishlist ? wishlistIconFilled : wishlistIcon} alt="icon" />
                                    <p className='hidden md:flex text-text text-[12px] font-[600]'>{isInWishlist ? 'In Wishlist' : 'Add to Wishlist'}</p>
                                </div>
                                <div className='cursor-not-allowed flex items-center gap-[4px]'>
                                    <img className='w-[14px]' src={historyIcon} alt="icon" />
                                    <p className='hidden md:flex text-text text-[12px] font-[600]'>Auto Order</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full md:hidden'>
                    <PrimaryButton title={isInCart ? 'Update Cart' : 'Add to Cart'} action={() => { addToCart() }} />
                </div>
                <h1 className='text-text text-[16px] font-[600]'>Often bought with</h1>
                <div className='flex flex-col gap-[32px]'>
                    <div className='flex w-full overflow-x-auto gap-[24px]'>
                        {oftenBoughtProduct?.slice(0, 8).map((product, index) => {
                            return <ProductCard2 key={index} image={product?.image}   product={product} p_id={product?.id} name={product?.name} price={product?.price} />;
                        })}
                    </div>
                    <div className='flex justify-center items-center gap-[8px] py-[]'>
                        <div className={`cursor-pointer rounded-[50%] ${slider === 1 ? 'w-[10px] h-[10px] bg-[#6E9A63]' : 'w-[6px] h-[6px] bg-[#D1D1D1]'}`} onClick={() => setSlider(1)} />
                        <div className={`cursor-pointer rounded-[50%] ${slider === 2 ? 'w-[10px] h-[10px] bg-[#6E9A63]' : 'w-[6px] h-[6px] bg-[#D1D1D1]'}`} onClick={() => setSlider(2)} />
                        <div className={`cursor-pointer rounded-[50%] ${slider === 3 ? 'w-[10px] h-[10px] bg-[#6E9A63]' : 'w-[6px] h-[6px] bg-[#D1D1D1]'}`} onClick={() => setSlider(3)} />
                    </div>
                </div>
            </div>
        </div>
    );
}
