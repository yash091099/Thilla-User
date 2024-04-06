import React, { useContext, useEffect } from 'react'
import SecondaryButton from './SecondaryButton'
import timerIcon from '../assets/timer.svg'
import Context from '../context/AppContext'
export default function ProductCard(props) {
  const {product}=props;
  // console.log(product,'-----------------product')
  const {setModalProductId,setSelectededProduct,cartProducts} = useContext(Context);

  useEffect(()=>{console.log(props.p_id)},[]);
  const isProductInCart = cartProducts?.some(product => product.product_id === props?.p_id);

  return (
    <div className='w-full flex flex-col items-center justify-center gap-[16px] h-[288px] px-[4px] sm:px-[8px] py-[16px] border-2 border-light-background rounded-md shadow-md'>
      <img className='cursor-pointer w-[120px]' src={props.image} action="product image" onClick={()=>{setModalProductId(props.p_id); props.openProduct(true);setSelectededProduct(product)}}/>
      <div className='flex flex-col gap-[8px] px-[4px] md:px-[16px]'>
        <div className='flex items-center gap-[2px] px-[4px] py-[2px]'>
            <img className='w-[11px]' src={timerIcon} alt="timer"/>
            <p className='text-text text-[9px] font-[700]'>14 mins</p>
        </div>
        <h1 className='text-text text-[13px] font-[700]' onClick={()=>{setModalProductId(props.p_id); props.openProduct(true);setSelectededProduct(product)}}>{props?.name}</h1>
        <div className='flex justify-between items-center'>
            <h1 className='text-text text-[13px] font-[700] mr-3' onClick={()=>{setModalProductId(props.p_id); props.openProduct(true);setSelectededProduct(product)}}>&#8377; {product?.price}</h1>
            <button className='text-dark text-[13px] font-[600] bg-light-background border-2 border-dark px-[12px] md:px-[19.2px] py-[4px] md:py-[7px] rounded-[6px]' onClick={()=>{setModalProductId(props.p_id); props.openProduct(true);setSelectededProduct(product)}}>{isProductInCart?'Update':'Add'}</button>
        </div>
      </div>
    </div>
  )
}
