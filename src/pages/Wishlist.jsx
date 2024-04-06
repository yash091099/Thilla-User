import React, { useContext } from 'react'
import P1 from '../assets/products/P1.png'
import P2 from '../assets/products/P2.png'
import P3 from '../assets/products/P3.png'
import P4 from '../assets/products/P4.png'
import P5 from '../assets/products/P5.png'
import s1 from '../assets/stores/S1.png'
import s2 from '../assets/stores/S2.png'
import s3 from '../assets/stores/S3.png'
import s4 from '../assets/stores/S4.png'
import s5 from '../assets/stores/S5.png'
import s6 from '../assets/stores/S6.png'
import s7 from '../assets/stores/S7.png'
import s8 from '../assets/stores/S8.png'
import s9 from '../assets/stores/S9.png'
import s10 from '../assets/stores/S10.png'
import s11 from '../assets/stores/S11.png'
import s12 from '../assets/stores/S12.png'
import s13 from '../assets/stores/S13.png'
import ProductCardWishlist from '../components/ProductCardWishlist'
import Context from '../context/AppContext'
import ProductModal from '../components/ProductModal'
import StoresCardWishlist from '../components/StoresCardWishlist'
export default function Wishlist() {
    const {showProductModal, setShowProductModal,setSelectededProduct,setModalProductId, wishlistProducts} = useContext(Context)
    const openProductModal = (productId) => {
        console.log("Opening product with ID:", productId);
        const selectedProduct = wishlistProducts.find(product => product.product_id === productId);
        console.log(selectedProduct, 'Selected product details');

        if (selectedProduct) {
            setSelectededProduct(selectedProduct?.product_details);
            setModalProductId(productId);
            setShowProductModal(true);
        } else {
            console.error('Product not found');
        }
    };


  return (
    <div className='px-[16px] md:px-[80px] py-[60px]'>
        <div className='flex flex-col gap-[64px]'>
            <h1 className='text-text text-[28px] font-[600]'>My Wishlist</h1>
            <div className='flex flex-col gap-[24px]'>
                <h2 className='text-text text-[24px] font-[600]'>Your Wish listed products</h2>
                <div className='flex gap-[8px] md:gap-[32px] overflow-y-auto'>
                    {wishlistProducts.map(i => (<div key={i.id}>
                        <ProductCardWishlist p_id={i.product_id} product={i} openProduct={openProductModal} />
                    </div>))}
                </div>
            </div>
            <div className='flex flex-col gap-[24px]'>
                <h2 className='text-text text-[24px] font-[600]'>Your Wish listed stores</h2>
                <div className='flex gap-[33px] overflow-scroll no-scrollbar'>
                    <StoresCardWishlist image={s1} />
                    <StoresCardWishlist image={s2} />
                    <StoresCardWishlist image={s3} />
                    <StoresCardWishlist image={s4} />
                    <StoresCardWishlist image={s5} />
                    <StoresCardWishlist image={s6} />
                    <StoresCardWishlist image={s7} />
                    <StoresCardWishlist image={s8} />
                    <StoresCardWishlist image={s9} />
                    <StoresCardWishlist image={s10} />
                    <StoresCardWishlist image={s11} />
                    <StoresCardWishlist image={s12} />
                    <StoresCardWishlist image={s13} />
                </div>
            </div>
        </div>
        {showProductModal && <ProductModal onClose={setShowProductModal} />}
    </div>
  )
}
