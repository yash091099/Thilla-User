import React, { useContext,useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import LocationPin from '../assets/LocationPin.svg';
import SearchIcon from '../assets/SearchIcon.svg';
import favoruiteIcon from '../assets/favoruite.svg'
import menuIcon from '../assets/menu-list-icon.svg'
import Logo from '../assets/Thilaa-Logo.svg'
import cartIcon from '../assets/cart.svg'
import Context from '../context/AppContext';
import { getProfile } from '../context/services/profile';
import debounce from 'lodash.debounce'; // Import debounce

export default function NavBar() {
    const {setShowCart,userProfile,refetchProfile, wishlistProducts, cartProducts,searchInputProductNavbar, setSearchInputProductNavbar,updateAddress } = useContext(Context)
   
    const navigate = useNavigate();
    const authToken = localStorage.getItem('token');
    // useEffect(() => {
    //     refetchProfile();
    // },[])
  return (
    <div className='flex flex-col gap-[24px] md:bg-light-brand w-full px-[24px] md:px-[128px] py-[16px]'>
        <div className='flex items-center justify-between gap-[8px] md:gap-[64px] w-full'>
            <img className="cursor-pointer w-[50px] sm:w-[125px]" src={Logo} alt="logo" onClick={()=>{navigate('/home')}}/>
            {/* <h1 className='cursor-pointer text-text text-[32px] md:text-[56px] font-[600]' onClick={()=>{navigate('/home')}}>Thilaa</h1> */}
            <div className='hidden lg:flex w-full border-2 border-primary-brand rounded-[60px]'>
                <div className='flex gap-[8] px-[32px] py-[20px] border-r-2 border-primary-brand'>
                    <img className="w-[24px]" src={LocationPin} alt="Location" />
                    <div className='text-[20px] font-[600] bg-transparent'>
                        <select className='outline-none bg-transparent'>
                        <option>{userProfile?.address_line_1||'Address Line 1'}, {userProfile?.pincode||'xxxxxx'}</option>
                        </select>
                    </div>
                </div>
                <div className='flex gap-[8px] items-center pl-[16px] pr-[48px] py-[20px] w-full'>
                    <img className="w-[24px]" src={SearchIcon} alt="Search" />
                    <input className='outline-none text-[20px] text-text font-[600] bg-transparent w-full' value={searchInputProductNavbar} onChange={(e)=>{setSearchInputProductNavbar(e.target.value)}} type="text" placeholder="Type your search here" />
                </div>
            </div>
            <div className="flex md:hidden">
                <img className="w-[24px]" src={menuIcon} alt="menu" />
            </div>
            <div className='hidden md:flex gap-[24px] items-center min-w-fit'>
                <div className='cursor-pointer flex gap-[4px] items-center' onClick={()=>{navigate('/root/wishlist')}}>
                    <img className="w-[18px]" src={favoruiteIcon} alt="favoruite" />
                    <span>{wishlistProducts ? wishlistProducts.length:0}</span>
                </div>
                <div className='cursor-pointer flex gap-[4px] items-center' onClick={()=>{setShowCart(true)}}>
                    <img className="w-[18px]"  src={cartIcon} alt="favoruite" />
                    <span>{cartProducts ? cartProducts.length:0}</span>
                </div>
                {
                authToken ? <button className='bg-text text-white text-[16px] font-500 px-[32px] py-[16px] rounded-[6px]' 
                onClick={   ()=>{localStorage.removeItem('token'); 
                            navigate('/')}
                }>Logout</button> : 
                <>
                <Link className="hidden sm:block text-text text-[16px] font-[500]" to="/register">Register</Link>
                <button className='hidden sm:block bg-text text-white text-[16px] font-500 px-[32px] py-[16px] rounded-[6px]' onClick={()=>{navigate('/login')}}>Login</button>
                </>
                }
            </div>
        </div>

        <div>
        <div className='lg:hidden flex w-full border-2 border-primary-brand bg-white rounded-[60px]'>
                <div className='flex-1 flex gap-[8] px-[16px] py-[10px] border-r-2 border-primary-brand overflow-hidden'>
                    <img className="w-[12px] lg:w-[24px]" src={LocationPin} alt="Location" />
                    <div className='text-[10px] lg:text-[20px] font-[600]'>
                        <select className='outline-none bg-transparent'>
                        <option>{userProfile?.address_line_1||'Address Line 1'}, {userProfile?.pincode||'xxxxxx'}</option>
                        </select>
                    </div>
                </div>
                <div className='flex-1 flex gap-[8px] items-center pl-[16px] pr-[24px] py-[10px] w-full'>
                    <img className="w-[12px] lg:w-[24px]" src={SearchIcon} alt="Search" />
                    <input className='outline-none text-[12px] lg:text-[20px] text-text font-[500] lg:font-[600] bg-transparent w-full text-ellipsis' value={searchInputProductNavbar} onChange={(e)=>{setSearchInputProductNavbar(e.target.value)}} type="text" placeholder="Type your search here" />
                </div>
            </div>
        </div>
    </div>
  )
}
