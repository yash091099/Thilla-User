import React, { useContext, useEffect, useState } from 'react';
import LocationPin from '../assets/LocationPin.svg';
import SearchIcon from '../assets/SearchIcon.svg';
import { searchProduct, searchStores } from '../context/services/product';
import logo from '../assets/Thilaa-Logo.svg';
import { getProfile } from '../context/services/profile';
import Context from '../context/AppContext';
import {  useNavigate } from 'react-router-dom';

export default function SearchBar(props) {
    const [search, setSearch] = useState('');
    const [searchResultProducts, setSearchResultProducts] = useState([]);
    const [searchResultStores, setSearchResultStores] = useState([]);
    const [showPanel, setShowPanel] = useState(false);
    const {userProfile,refetchProfile,setSelectededProduct,products,setStoreId} = useContext(Context);
    const navigate=useNavigate()
    // useEffect(() => {
    //     refetchProfile()
    // },[])

    useEffect(() => {
        const fetchProductsAndStores = async () => {
            if (!search) {
                setSearchResultProducts([]);
                setSearchResultStores([]);
                setShowPanel(false);
                return;
            }

            props.setLoadingTrue();
            const productsResponse = await searchProduct({ q: search });
            const storesResponse = await searchStores({ q: search });
            setSearchResultProducts(productsResponse.data?.products || []);
            setSearchResultStores(storesResponse.data?.stores || []);
            setShowPanel(true);
            props.setLoadingFalse();
        };

        fetchProductsAndStores();
    }, [search]);

    return (
        <div className='relative flex w-full border-2 border-primary-brand rounded-[60px]'>
            <div className='flex items-center gap-[8] md:w-fit p-[4px] md:p-[32px] border-r-2 border-primary-brand overflow-hidden md:overflow-visible'>
                <img className="w-[16px] md:w-[24px]" src={LocationPin} alt="Location" />
                <div className='block text-[12px] md:text-[20px] font-[600] bg-transparent'>
                    <select className='outline-none bg-transparent text-ellipsis'>
                    <option>{userProfile?.address_line_1||'Address Line 1'}, {userProfile?.pincode||'xxxxxx'}</option>
                    </select>
                </div>
            </div>
            <div className='flex gap-[8px] items-center pl-[6px] md:pr-[48px] py-[6px] md:py-[32px] w-full overflow-hidden'>
                <img className="w-[12px] md:w-[24px]" src={SearchIcon} alt="Search" />
                <input className='outline-none text-[12px] md:text-[20px] text-text font-[500] md:font-[600] w-full text-ellipsis mr-1' 
                type="text" 
                placeholder="Type your search here" 
                onChange={(e) => setSearch(e.target.value)} />
            </div>
            {showPanel && (
                <div className='absolute top-full left-0 mt-2 w-full bg-white border-2 border-primary-brand rounded-md z-10' style={{maxHeight: '300px', overflow: 'auto'}}>
                    <div className='flex'>
                        <div className='w-1/2 border-r border-primary-brand'>
                            <h3 className='text-center font-semibold'>Stores</h3>
                            <div className='grid grid-cols-1 gap-4 p-4'>
                                {searchResultStores.map(store => (
                                    <div key={store.id} className='flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow cursor-pointer' onClick={() => {setStoreId(store?.id);setSelectededProduct(products.find(product => product.store_id === store.id)); navigate('/root/store')}}>
                                        <span>{store.name}</span>
                                        <img src={store?.passport_photo || logo} alt="Store" className='w-10 h-10 rounded-full' />
                                    </div>
                                ))}
                                                                {!searchResultStores.length && <p className='text-center'>No stores found</p>}

                            </div>
                        </div>
                        <div className='w-1/2'>
                            <h3 className='text-center font-semibold'>Products</h3>
                            <div className='grid grid-cols-1 gap-4 p-4'>
                                {searchResultProducts.map(product => (
                                    <div key={product.id} className='flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow cursor-pointer' onClick={() => {setStoreId(product?.store_id);setSelectededProduct(product); navigate('/root/store')}}>
                                        <span>{product.name}</span>
                                        <img src={product?.image || logo} alt="Product" className='w-10 h-10 rounded-full' />
                                    </div>
                                ))}
                                {!searchResultProducts.length && <p className='text-center'>No products found</p>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
