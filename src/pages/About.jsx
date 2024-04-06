import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Company from '../assets/images/delivery.jpg';

export default function About() {
  return (
    <div className='flex flex-col justify-between min-h-screen'>
      <NavBar />
      <Outlet />
      <div className='flex flex-col items-center px-[16px] py-[16px] text-center overflow-hidden bg-gray-100'>
        <h1 className='text-3xl font-bold mb-[8px] text-primary-brand'>About Us</h1>
        <p className='text-md max-w-4xl mb-[8px]'>
          Welcome to [Your Company Name], where we believe in providing quality products and services. Our mission is to enhance the lives of our customers through innovative solutions. Established in [Year], we have grown from a small startup to a leading player in our industry.
        </p>
        <img className='w-full max-w-xs h-auto mb-[8px] rounded-lg shadow-lg' src={Company} alt='Company Building' />
      </div>
      <div className='px-[16px] py-[16px] bg-white'>
        <h2 className='text-xl font-semibold mb-[4px] text-left text-primary-brand'>Our Journey</h2>
        <p className='text-sm mb-[8px] text-left'>
          Our journey began in [City, Country], with a small team of dedicated individuals passionate about making a difference. Over the years, we have expanded our reach and diversified our offerings, always staying true to our core values of integrity, innovation, and quality.
        </p>
        <h2 className='text-xl font-semibold mb-[4px] text-left text-primary-brand'>Meet the Team</h2>
        <div className='grid grid-cols-1 md:grid-cols-6 gap-[8px]'>
          <TeamMember image='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZWx8ZW58MHx8MHx8fDA%3D' name='Jane Doe' role='Founder & CEO' />
          <TeamMember image='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZWx8ZW58MHx8MHx8fDA%3D' name='Jane Doe' role='Founder & CEO' />
          <TeamMember image='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZWx8ZW58MHx8MHx8fDA%3D' name='Jane Doe' role='Founder & CEO' />
          <TeamMember image='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZWx8ZW58MHx8MHx8fDA%3D' name='Jane Doe' role='Founder & CEO' />
          <TeamMember image='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZWx8ZW58MHx8MHx8fDA%3D' name='Jane Doe' role='Founder & CEO' />
          <TeamMember image='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9kZWx8ZW58MHx8MHx8fDA%3D' name='Jane Doe' role='Founder & CEO' />
        </div>
      </div>

      <div className='flex flex-col md:flex-row justify-between gap-[24px] bg-primary-brand w-full px-[16px] md:px-[128px] py-[24px]'>
        <div className='flex flex-col md:flex-row gap-[12px] md:gap-[24px]'>
          <Link className='text-text text-[16px] font-[500]' to="/about">About</Link>
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

function TeamMember({ image, name, role }) {
  return (
    <div className='flex flex-col items-center'>
      <img className='w-24 h-24 rounded-full mb-2' src={image} alt={name} />
      <h3 className='font-semibold'>{name}</h3>
      <p className='text-xs'>{role}</p>
    </div>
  );
}
