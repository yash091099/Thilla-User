import React, { useContext } from 'react'
import { Outlet, Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import NotificationsModal from '../components/NotificationsModal'
import Context from '../context/AppContext'
import CartModal from '../components/CartModal'

export default function Root() {
  const {showNotifications, setShowNotifications, showCart, setShowCart} = useContext(Context)
  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <div>
        <NavBar />
        <Outlet />
      </div>
      <div className='flex flex-col md:flex-row justify-between gap-[24px] bg-primary-brand w-full px-[16px] md:px-[128px] py-[24px]'>
            <div className='flex flex-col md:flex-row gap-[12px] md:gap-[24px]'>
                <Link className='text-text text-[16px] font-[500]' to="/about">About</Link>
                {/* <Link className='text-text text-[16px] font-[500]' to="/root">Product</Link> */}
                <Link className='text-text text-[16px] font-[500]' to="/root">Store</Link>
                <Link className='text-text text-[16px] font-[500]' to="/howitworks">How it works?</Link>
            </div>
            <div className='flex flex-col md:flex-row gap-[12px] md:gap-[24px]'>
                <Link className='text-text text-[16px] font-[500]' to="/privacypolicy">Privacy Policy</Link>
                <Link className='text-text text-[16px] font-[500]' to="/termcondition">Terms & Conditions</Link>
                <Link className='text-text text-[16px] font-[500]' to="/contact">Contact</Link>
                <Link className='text-text text-[16px] font-[500]' to="/settings">Settings</Link>
            </div>
        </div>
      {showNotifications&&<NotificationsModal onClose={setShowNotifications}/>}
      {showCart && <CartModal onClose={setShowCart} />}
    </div>
  )
}
