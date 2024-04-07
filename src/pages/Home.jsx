import React from 'react'
import Logo from '../assets/Thilaa-Logo.svg'
import SearchBar from '../components/SearchBar'
import PrimaryButton from '../components/PrimaryButton'
import LightButton from '../components/LightButton'
import { Link, useNavigate } from 'react-router-dom'
import CustomLoader from '../components/loader'
export default function Home() {
    const navigate = useNavigate();
    const authToken = localStorage.getItem('token');
    const [loading, setLoading] = React.useState(false);

  return (
    <div className='flex flex-col justify-between h-screen'>
        <div className='flex justify-end items-center gap-[24px] w-full px-[16px] md:px-[128px] py-[32px] mb-[32px] md:mb-[0px]'>
        {authToken?
            <>
                <div className='w-[109px]'>
                <PrimaryButton className="text-center" title="Logout" action={()=>{ localStorage.removeItem('token'); navigate('/home')}} />
                </div>
            </>
         :  
         <>
            <Link className="cursor-pointer text-text text-[16px] font-[500]" to='/register'>Register</Link>
            <div className='w-[109px]'>
                <PrimaryButton title="Login" action={()=>{navigate('/login')}} />
            </div>
         </>
        }
        </div>
        <div className='flex flex-col items-center gap-[32px] -translate-y-[24px]'>
            <img className="cursor-pointer w-[125px] h-[125px]" src={Logo} alt="logo" onClick={()=>{navigate('/home')}}/>
            <div className='w-[80%]'>
<SearchBar setLoadingTrue={() => setLoading(true)} setLoadingFalse={() => setLoading(false)} />
            </div>
            <div className='flex flex-col md:flex-row justify-center items-center gap-[24px]'>
                <div className='w-full md:w-[206px]'>
                    <LightButton title="Search with store" action={()=>{navigate('/root')}} />
                </div>
                <div className='w-full md:w-[230px]'>
                    <LightButton title="Search with product" action={()=>{navigate('/root')}} />
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
        {loading && <CustomLoader />}

    </div>
  )
}
