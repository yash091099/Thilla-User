import React, { useEffect } from 'react'
import SplashScreenImage from '../assets/images/splash-screen.png';
import Logo from '../assets/Logo-white.svg'
import { useNavigate } from 'react-router-dom';
export default function SplashScreen() {
  const navigate = useNavigate();
  useEffect(()=>{setTimeout(()=>{navigate('/home')},1500)},[]);
  return (
    <div className='relative'>
      <img className='w-screen h-screen object-cover' src={SplashScreenImage} alt="Splash Screen" />
      <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/75'></div>
      <img className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px]' src={Logo} alt='logo' />
    </div>
  )
}
