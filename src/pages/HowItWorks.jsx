import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function HowItWorks() {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <Outlet />
      <div className='flex-grow flex justify-center items-center p-4 bg-gray-100'>
        <div className='max-w-4xl w-full text-center'>
          <h1 className='text-2xl font-semibold'>How It Works</h1>
          <div className='mt-4 text-left'>
            <Step title="Step 1: Sign Up" content="Create an account with us using your email. It's quick and easy!" icon="📝" />
            <Step title="Step 2: Configure" content="Set up your preferences and requirements to personalize your experience." icon="⚙️" />
            <Step title="Step 3: Enjoy" content="Start using our services to enhance your daily tasks and improve efficiency!" icon="🎉" />
          </div>
        </div>
      </div>
      <div  className='flex flex-col md:flex-row justify-between gap-[24px] bg-primary-brand w-full px-[16px] md:px-[128px] py-[24px]'>
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
    </div>
  );
}

function Step({ title, content, icon }) {
  return (
    <div className='mt-6'>
      <h3 className='text-lg font-semibold'>{icon} {title}</h3>
      <p className='mt-1'>{content}</p>
    </div>
  );
}


