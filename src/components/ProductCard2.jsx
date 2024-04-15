import React, { useContext } from 'react';
import SecondaryButton from './SecondaryButton';
import timerIcon from '../assets/timer.svg';
import Context from '../context/AppContext';
import toast from 'react-hot-toast';
import { addProductToCart } from '../context/services/product';
export default function ProductCard(props) {
    const { cartProducts ,refetchCartListing} = useContext(Context);
    const { image, name, price, p_id } = props;
    const isProductInCart = cartProducts?.some(product => product.product_id === p_id);
    const handleAddOrUpdate = async () => {
        if (isProductInCart) {
          return;
        } else {
            await addProductToCart({ product_id: p_id, quantity: 1 }); // Assume add logic here
            toast.success('Product added to cart');
            refetchCartListing();
            console.log('Product added to cart:', p_id);
        }
        closeModal(); // Close modal after action
    };

    return (
        <div className='flex flex-col items-center justify-center gap-[4px] min-w-[116px] p-[4px] border-2 border-light-background rounded-md shadow-md'>
            <img className='cursor-pointer w-[100px] h-[80px]' src={props.image?.includes('https://') ? image : `https://thilaa.jethitech.com/storage/${image}`} alt="product image" onClick={() => { props.openProduct(true) }}/>
            <div className='flex flex-col gap-[2px] px-[4px] md:px-[8px]'>
                <div className='flex items-center gap-[2px] px-[4px] py-[2px]'>
                    <img className='w-[11px]' src={timerIcon} alt="timer"/>
                    <p className='text-text text-[9px] font-[700]'>14 mins</p>
                </div>
                <h1 className='text-text text-[10px] font-[700]' onClick={() => { props.openProduct(true) }}>{name}</h1>
                <div className='flex justify-between items-center'>
                    <h1 className='text-text text-[10px] font-[700]' onClick={() => { props.openProduct(true) }}> $ {price}</h1>
                    <button className='text-dark text-[10px] font-[600] bg-light-background border-2 border-dark ml-3 px-[19.2px] py-[7px] rounded-[6px]' onClick={ handleAddOrUpdate}>
                        {isProductInCart ? 'In Cart' : 'Add'}
                    </button>
                </div>
            </div>
        </div>
    );
}
