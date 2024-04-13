import React from 'react';
import Logo from '../assets/Thilaa-Logo.svg';
import SearchBar from '../components/SearchBar';
import PrimaryButton from '../components/PrimaryButton';
import LightButton from '../components/LightButton';
import { Link, useNavigate } from 'react-router-dom';
import CustomLoader from '../components/loader';

export default function Home() {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('token');
  const [loading, setLoading] = React.useState(false);

  return (
    <div className='flex flex-col justify-between h-screen'>
      <div className='flex justify-end items-center gap-4 w-full px-4 md:px-16 py-8'>
        {authToken ? (
          <>
            <div className='w-28'>
              <PrimaryButton className="text-center" title="Logout" action={() => { localStorage.removeItem('token'); navigate('/home'); }} />
            </div>
          </>
        ) : (
          <>
            <Link className="cursor-pointer text-sm font-medium" to='/register'>Register</Link>
            <div className='w-28'>
              <PrimaryButton title="Login" action={() => { navigate('/login'); }} />
            </div>
          </>
        )}
      </div>
      <div className='flex flex-col items-center gap-[7rem] -translate-y-6x'>
        <img className="cursor-pointer w-32 h-32" src={Logo} alt="logo" onClick={() => { navigate('/home'); }} />
        <div className='w-4/5'>
          <SearchBar setLoadingTrue={() => setLoading(true)} setLoadingFalse={() => setLoading(false)} />
        </div>
        <div className='flex flex-col md:flex-row justify-center items-center gap-4'>
          <div className='w-full md:w-52'>
            <LightButton title="Search with store" action={() => { navigate('/root'); }} />
          </div>
          <div className='w-full md:w-56'>
            <LightButton title="Search with product" action={() => { navigate('/root'); }} />
          </div>
        </div>
      </div>
      <div className='flex flex-col md:flex-row justify-between gap-6 bg-primary-brand w-full px-4 md:px-16 py-6'>
        <div className='flex flex-col md:flex-row gap-3 md:gap-6'>
          <Link className='text-sm font-medium' to="/about">About</Link>
          <Link className='text-sm font-medium' to="/root">Store</Link>
          <Link className='text-sm font-medium' to="/howitworks">How it works?</Link>
        </div>
        <div className='flex flex-col md:flex-row gap-3 md:gap-6'>
          <Link className='text-sm font-medium' to="/privacypolicy">Privacy Policy</Link>
          <Link className='text-sm font-medium' to="/termcondition">Terms & Conditions</Link>
          <Link className='text-sm font-medium' to="/contact">Contact</Link>
          <Link className='text-sm font-medium' to="/settings">Settings</Link>
        </div>
      </div>
      {loading && <CustomLoader />}
    </div>
  );
}
