import React, { useContext } from 'react';
import Context from '../context/AppContext';
import timerIcon from '../assets/timer.svg';

export default function ProductCardWishlist(props) {
    const { cartProducts, setModalProductId, setSelectededProduct } = useContext(Context);
    const productDetails = props.product?.product_details;
    const isProductInCart = cartProducts?.some(product => product.product_id === productDetails?.id);

    const handleProductClick = () => {
        console.log(productDetails)
        setModalProductId(productDetails?.id);
        setSelectededProduct(productDetails);
        props.openProduct(productDetails?.id);
    };

    return (
        <div className='flex flex-col items-center justify-center gap-[16px] w-[140px] md:w-[184px] h-[288px] py-[16px] border-2 border-light-background rounded-md shadow-md'>
            <img
                className='cursor-pointer w-[140px] h-[100px]'
                src={productDetails?.image?.includes('https://')
                    ? productDetails?.image
                    : `https://thilaa.jethitech.com/storage/${productDetails?.image}`}
                alt="Product Image"
                onClick={() => handleProductClick()}
            />
            <div className='flex flex-col gap-[8px] px-[4px] md:px-[16px]'>
                <div className='flex items-center gap-[2px] px-[4px] py-[2px]'>
                    <img className='w-[11px]' src={timerIcon} alt="timer"/>
                    <p className='text-text text-[9px] font-[700]'>14 mins</p>
                </div>
                <h1 className='text-text text-[13px] font-[700]' onClick={() => handleProductClick()}>
                    {productDetails?.name}
                </h1>
                <div className='flex justify-between items-center'>
                    <h1 className='text-text text-[13px] font-[700] mr-3' onClick={() => handleProductClick()}>
                          ${productDetails?.price}
                    </h1>
                    <button
                        className='text-dark text-[13px] font-[600] bg-light-background border-2 border-dark px-[19.2px] py-[7px] rounded-[6px]'
                        onClick={() => handleProductClick()}
                    >
                        {isProductInCart ? 'Update' : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    );
}
