import React, { useContext, useEffect, useState } from 'react';
import Categories from '../components/Categories';
import StoresCardT1 from '../components/StoresCardT1';
import StoresCardT2 from '../components/StoresCardT2';
import leftArrow from '../assets/arrow-left.svg';
import rightArrow from '../assets/arrow-right.svg';
import Logo from '../assets/Thilaa-Logo.svg';
import CustomLoader from '../components/loader';
import { getStores } from '../context/services/stores';
import Context from '../context/AppContext';

export default function SearchResult() {
  const { searchInputProductNavbar } = useContext(Context);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [noStoreFound, setNoStoreFound] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getStores();
        if (response?.data?.success) {
          const stores = response.data.stores;
          const filteredStores = searchInputProductNavbar?.trim()
            ? stores.filter(store => store.name.toLowerCase().includes(searchInputProductNavbar.trim().toLowerCase()))
            : stores;
          if (filteredStores.length === 0) {
            setNoStoreFound(true);
          } else {
            setData(filteredStores);
            setNoStoreFound(false);
          }
        }
      } catch (error) {
        console.error('Error fetching stores:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [searchInputProductNavbar]);

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleShowLess = () => {
    setShowAll(false);
  };

  return (
    <div className='flex flex-col justify-between gap-[79px]'>
      {loading && <CustomLoader />}
      {!loading && noStoreFound && (
        <div className='flex justify-center items-center h-[500px]'>
          <h2 className='text-text text-[20px] font-[600]'>No Store Found</h2>
        </div>
      )}
      {!noStoreFound && (
        <div className='w-full p-[24px] md:p-[0px]'>
          <Categories />
          <div className='flex lg:justify-center gap-[50.75px] mt-[48px] overflow-scroll no-scrollbar'>
            <div className='flex w-[70%] max-w-[70%] flex-wrap justify-start gap-[50.75px] px-[16px]'>
              {data.slice(0, showAll ? data.length : 7).map((item) => (
                <StoresCardT1 key={item.user_id} image={item.front_photo} id={item.id}  name={item.name} isSaved={false} />
              ))}
            </div>
            {data.length > 7 && !showAll && (
              <div className='flex flex-col justify-end min-w-[68px] mb-[50px]' onClick={handleShowAll}>
                <img className="cursor-pointer bg-text w-[55px] h-[55px] rounded-[50%] p-[11px] mb-[32px]" src={leftArrow} alt="Show All" />
                <h1 className='cursor-pointer text-text text-[16px] font-[500] mb-[4px] hover:underline'>Show All</h1>
                <p className='text-text text-[12px] font-[400]'>{`Show ${data.length - 7} more`}</p>
              </div>
            )}
            {data.length > 7 && showAll && (
              <div className='flex flex-col justify-end min-w-[68px] mb-[50px]' onClick={handleShowLess}>
                <img className="cursor-pointer bg-text w-[55px] h-[55px] rounded-[50%] p-[11px] mb-[32px]" src={rightArrow} alt="Show Less" />
                <h1 className='cursor-pointer text-text text-[16px] font-[500] mb-[4px] hover:underline'>Show Less</h1>
              </div>
            )}
          </div>
          <div className='flex flex-col gap-[25px] mt-[48px] max-w-[1274px] mx-auto px-[16px]'>
            <h1 className='text-left text-text text-[20px] font-[600]'>Stores to help you save</h1>
            <div className='flex flex-wrap md:grid md:grid-cols-3  max-w-[1274px] md:py-[16px] overflow-scroll no-scrollbar'>
              {data.map((item, index) => (
                <StoresCardT2 key={index} image={item?.front_photo} id={item.id}  name={item?.name} isSaved={false} />
              ))} 
            </div>
          </div>
        </div>
      )}
      <div className='flex flex-col justify-center items-center gap-[24px] bg-[#F5F5F5] px-[24px] py-[32px] w-full'>
        <img className='w-[125px]' src={Logo} alt='logo' />
        <div className='flex flex-col justify-center items-center gap-[6px]'>
          <h2 className='text-text text-[20px] font-[600]'>There's more to explore</h2>
          <p className='text-text text-[16px] font-[400]'>Shop {data?.length} more (and counting) in your area.</p>
        </div>
      </div>
    </div>
  );
}
