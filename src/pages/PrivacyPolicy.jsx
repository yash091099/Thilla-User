import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function PrivacyPolicy() {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <NavBar />
      <Outlet />
      <div className='flex-grow flex justify-center items-center bg-gray-100'>
        <div className='max-w-4xl w-full p-4 text-center'>
          <h1 className='text-2xl font-semibold'>Privacy Policy</h1>
          <p className='mt-2'>Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website, other sites we own and operate.</p>
          <div className='text-left mt-4'>
            <Section title="Information Collection" content="We collect information when you register on our site, subscribe to a newsletter, fill out a form, or enter information on our site." />
            <Section title="Use of Information" content="Any of the information we collect from you may be used in one of the following ways: To personalize your experience, to improve our website, to improve customer service, and to process transactions." />
            <Section title="Information Protection" content="We implement a variety of security measures to maintain the safety of your personal information when you enter, submit, or access your personal information." />
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

function Section({ title, content }) {
  return (
    <div className='mt-6'>
      <h3 className='text-lg font-semibold'>{title}</h3>
      <p className='mt-1'>{content}</p>
    </div>
  );
}
