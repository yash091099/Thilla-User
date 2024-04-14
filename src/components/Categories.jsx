import React, { useEffect, useState } from 'react'
import CustomLoader from './loader';
import { getCategories } from '../context/services/stores';
export default function Categories() { 
    const [category, setCategory] = useState('');
    const [data, setData] = useState([]);
    const [loading, setLoading] = React.useState(false);

      useEffect(() => {
         const fetchData = async () => {
           const response = await getCategories();
           if (response?.data?.success) {
            console.log(response?.data?.categories,'categories');
             setData(response?.data?.categories);
           }
         }   
         fetchData();
      },[])

  return (
    <div className='flex 2xl:justify-center gap-[14px] md:gap-[34px] pt-[12px] px-[16px] w-full bg-light-background overflow-scroll no-scrollbar'>
      {loading && <CustomLoader />} 
      {data && data.map((item, index) => {
            return (
                  <div key={item.id} className={`cursor-pointer flex flex-col justify-center items-center gap-[4px] px-[8px] pb-[16px] ${category === item.name ? 'border-b-2 border-text':''}`} onClick={()=>{setCategory(item.name)}}>
<img className='w-[36px]' src={`${item?.image?.includes('http') ? item.image : `https://thilaa.jethitech.com/storage/${item.image}`}`} alt="category_icon" />
                        <p className='text-text text-[16px] font-[500]'>{item.name}</p>
                  </div>
            )
      })}
    </div>
  )
}
