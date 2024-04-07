import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';

export default function ContactUs() {
  return (
    <div className='flex flex-col min-h-screen'>
      <NavBar />
      <Outlet />
      <div className='flex-grow flex flex-col justify-center bg-gray-100'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl m-auto p-4'>
          <Card title="Email Us" content="contact@example.com" icon="✉️" />
          <Card title="Call Us" content="+1234567890" icon="📞" />
          <Card title="Visit Us" content="123 Example St, City" icon="📍" />
        </div>
        <div className='text-center p-8'>
          <h2 className='text-2xl font-semibold'>More Information</h2>
          <p className='mt-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
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

function Card({ title, content, icon }) {
  return (
    <div className='bg-white shadow-lg rounded-lg p-4 text-center'>
      <h3 className='text-lg font-semibold'>{icon} {title}</h3>
      <p className='mt-2'>{content}</p>
    </div>
  );
}

