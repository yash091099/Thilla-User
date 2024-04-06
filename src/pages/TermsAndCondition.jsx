import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function TermsAndCondition() {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <Outlet />
      <div className='flex-grow flex justify-center items-center bg-gray-100'>
        <div className='max-w-4xl w-full p-4 text-center'>
          <h1 className='text-2xl font-semibold'>Terms & Conditions</h1>
          <p className='mt-2'>Please read these terms and conditions carefully before using Our Service.</p>
          <div className='mt-4 text-left'>
            <h2 className='text-xl font-semibold'>Introduction</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in neque et nisl consectetur convallis.</p>
            <h2 className='text-xl font-semibold mt-4'>Usage Policy</h2>
            <p>Aliquam tincidunt mauris eu risus. Vestibulum auctor dapibus neque.</p>
            <h2 className='text-xl font-semibold mt-4'>Privacy Policy</h2>
            <p>Review our Privacy Policy regarding personal information provided by you, which is part of these Terms.</p>
          </div>
        </div>
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
    </div>
  );
}


