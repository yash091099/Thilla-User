import React, { useContext, useState } from 'react'
import P1 from '../assets/products/P1.png'
import P2 from '../assets/products/P2.png'
import P3 from '../assets/products/P3.png'
import P4 from '../assets/products/P4.png'
import P5 from '../assets/products/P5.png'
import store from '../assets/stores/S2.png';
import ProductCard from '../components/ProductCard'
import ProductModal from '../components/ProductModal'
import Context from '../context/AppContext'
export default function Store() {
    const {showProductModal, setShowProductModal} = useContext(Context);
    const [displayType, setDisplayType] = useState(1);
    const storeCategories = ['Snacks','Product', 'Dairy & Eggs', 'Beverages', 'Meat & Seafood', 'Snacks & Candy', 'Frozen', 'Bakery', 'Deli', 'Prepared Foods', 'Dry Goods & Pasta', 'Condiments & Sauces', 'Canned Goods & Soups', 'Breakfast', 'Household', 'Baking Essentials', 'Oils, Vinegars, & Spices', 'Health Care', 'Personal Care', 'Kitchen Supplies', 'Baby', 'Pets', 'Miscellaneous Sales']
    const [productCategory, setProductCategory] = useState('Snacks')
    
    
    
    function catButton(category) {
        return <button className={`text-left text-text text-[16px] font-[500] px-[16px] py-[4px] rounded-[6px] ${productCategory === category ? 'bg-primary-brand':''}`} onClick={()=>{setProductCategory(category)}}>{category}</button>
    }
    function box(flag) {
        return (
            <div className={`h-[4.86px] w-[5px] rounded-[1px] ${flag ? 'bg-black':'bg-[#CECECE]'}`}/>
        )
    }
  return (
    <div className='max-w-[1433px] mx-auto mb-[79px] px-[24px]'>
      <div className='hidden md:flex justify-start w-full mt-[32px] mb-[24px] px-[32px]'>
        <p className='text-[#A5A5A5] text-[14px] font-[400]'>Showing 1-12 of 50 item(s)</p>
      </div>
      <div className='flex flex-col md:flex-row md:gap-[64px]'>
        <div className='md:w-1/4'>
            <div className='flex flex-col gap-[8px] p-[24px] border-2 border-light-background rounded-md shadow-md'>
                <div className='flex flex-col justify-center items-center gap-[8px]'>
                    <img className="w-[40px]" src={store} alt="store image" />
                    <div className='flex flex-col items-center gap-[4px]'>
                        <h1 className='text-text text-[16px] font-[500]'>Brand Name</h1>
                        <p className='text-center text-text text-[12px] font-[400]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ipsum quasi commodi minima voluptatum asi commodi minima voluptatum</p>
                        <p className='text-center text-text text-[12px] font-[400]'>Contact, location and address</p>
                    </div>
                </div>
                <div className='hidden md:flex flex-col gap-[8px]'>
                    {storeCategories.map((item)=>catButton(item))}
                </div>
                <div className='md:hidden px-[24px]' >
                    <select className='w-full' onChange={(e)=>{setProductCategory(e.target.value)}}>
                        {storeCategories.map((item)=><option value={item}>{item}</option>)}
                    </select>
                </div>
            </div>
        </div>
        <div className=''>
            <div className='md:hidden py-[16px] px-[32px]'>
                <p className='text-[#A5A5A5] text-[14px] font-[400]'>Showing 1-12 of 50 item(s)</p>
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-[12px] justify-content-center w-full'>
                <ProductCard p_id={1} image={P1} openProduct={setShowProductModal} />
                <ProductCard p_id={2} image={P2} openProduct={setShowProductModal} />
                <ProductCard p_id={3} image={P3} openProduct={setShowProductModal} />
                <ProductCard p_id={4} image={P4} openProduct={setShowProductModal} />
                <ProductCard p_id={5} image={P5} openProduct={setShowProductModal} />
                <ProductCard p_id={1} image={P1} openProduct={setShowProductModal} />
                <ProductCard p_id={2} image={P2} openProduct={setShowProductModal} />
                <ProductCard p_id={3} image={P3} openProduct={setShowProductModal} />
                <ProductCard p_id={4} image={P4} openProduct={setShowProductModal} />
                <ProductCard p_id={5} image={P5} openProduct={setShowProductModal} />
                <ProductCard p_id={1} image={P1} openProduct={setShowProductModal} />
                <ProductCard p_id={2} image={P2} openProduct={setShowProductModal} />
                <ProductCard p_id={3} image={P3} openProduct={setShowProductModal} />
                <ProductCard p_id={4} image={P4} openProduct={setShowProductModal} />
                <ProductCard p_id={5} image={P5} openProduct={setShowProductModal} />
                <ProductCard p_id={1} image={P1} openProduct={setShowProductModal} />
                <ProductCard p_id={2} image={P2} openProduct={setShowProductModal} />
                <ProductCard p_id={3} image={P3} openProduct={setShowProductModal} />
                <ProductCard p_id={4} image={P4} openProduct={setShowProductModal} />
                <ProductCard p_id={5} image={P5} openProduct={setShowProductModal} />
            </div>
            <div className='flex justify-center mt-[24px]'>
                <button className='bg-text text-white text-[16px] font-500 px-[32px] py-[16px] rounded-[6px]' onClick={()=>{}}>Load More</button>
            </div>
        </div>
      </div>
      {showProductModal && <ProductModal  onClose={setShowProductModal} />}
    </div>
  )
}



//previous code

// <div className='flex flex-col sm:flex-row gap-[8px] md:gap-[16px]'>
//             <div className='flex justify-between items-center p-[8px] w-[120px] md:w-[180px] border-2 border-light-bakground'>
//                 <div className='grid grid-cols-2 gap-[1px]' onClick={()=>setDisplayType(1)}>
//                     {[1,2,3,4,5,6].map(()=>box(displayType===1))}
//                 </div>
//                 <div className='grid grid-cols-3 gap-[1px]' onClick={()=>setDisplayType(2)}>
//                     {[1,2,3,4,5,6,7,8,9].map(()=>box(displayType===2))}
//                 </div>
//                 <div className='grid grid-cols-4 gap-[1px]' onClick={()=>setDisplayType(3)}>
//                     {[1,2,3,4,5,6,7,8,9,10,11,12].map(()=>box(displayType===3))}
//                 </div>
//                 {/* <p>2</p>
//                 <p>3</p> */}
//                 <div className='flex flex-col gap-[1px]' onClick={()=>setDisplayType(4)}>
//                     {[1,2,3].map(()=>{
//                         return (
//                             <div className='flex gap-[1px] items-end'>
//                                 {box(displayType===4)}
//                                 <hr  className={`w-[17px] h-[1px] rounded-[1px] pb-[2px] ${displayType===4 ? 'bg-black':'bg-[#CECECE]'}`}/>
//                             </div>
//                         )
//                     })}
//                 </div>
//             </div>
//             <div className='flex items-center justify-center px-[9px] h-[34px] w-[120px] md:w-[180px] border-2 border-text rounded-md'>
//                 <select className='outline-none w-full'>
//                     <option>Default Sorting</option>
//                 </select>
//             </div>
//         </div> 