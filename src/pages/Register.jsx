import React, { useEffect, useState } from 'react'
import rectangleImage from '../assets/images/rectangle.png';
import eye from '../assets/hide-password.svg';
import Logo from '../assets/Thilaa-Logo.svg'
import PrimaryButton from '../components/PrimaryButton';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
export default function Register() {
    const navigate = useNavigate();
    const  [hidePassword, setHidePassword] = useState(true);
    const authToken = localStorage.getItem('token');
    useEffect(() => {
        if (authToken) {
        navigate('/');
    } }, [authToken]);
    const [checked, setChecked] = useState(false);
    const [data, setData] = useState({ email: '', password: '', phone: '', name: '', password_confirmation: '' });
    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        if(!checked){
            return toast.error('Please agree to the terms and conditions');
        }
        if (!data.email || !data.password || !data.phone || !data.name || !data.password_confirmation) {
            return toast.error('Please fill all fields');
        }
        if(data.password.length < 8){
            return toast.error('Password must be at least 8 characters');
        }
        if(data.password !== data.password_confirmation){
            return toast.error('Passwords do not match');
        }

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://thilaa.jethitech.com/api/onboard-customer',
            data : data
          };

        await axios.request(config)
        .then((response) => {
        console.log(JSON.stringify(response.data));
        if(response.data.success === true){
            toast.success(response.data.message);
            return navigate('/login');
        }
        return toast.error(response.data.message);
        }
        )
        .catch((error) => {
        console.log(error);
        });

    };  
  return (
    <div className='flex gap-[64px]'>
     <div className='hidden sm:flex flex-1 relative'>
        {/* <h1 className='absolute top-4 left-4 text-text text-[56px] font-[600]'>Thilaa</h1> */}
        <img className='w-[871px] h-screen object-cover' src={rectangleImage} alt='img' />
      </div>
      <div className='flex-1 flex flex-col justify-between items-center h-screen'>
            <img className='w-[100px] pt-[8px]' src={Logo} alt='logo' />
            <div className='flex flex-col gap-[8px] w-[327px] px-[16px] sm:px-[0px]'>
                <h1 className='text-text text-[20px] font-[600]'>Sign Up</h1>
                <div className='flex flex-col gap-[8px]'>
                    <div className='flex flex-col gap-[8px]'>
                        <p className="text-text text-[16px] font-[600]">Full Name</p>
                        <input className='outline-none w-full px-[8px] py-[4px] md:py-[8px] border border-text rounded-md' 
                        type="text" 
                        placeholder='Enter full name' 
                        name='name'
                        value={data.name}
                        onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                        <p className="text-text text-[16px] font-[600]">Email</p>
                        <input className='outline-none w-full px-[8px] py-[4px] md:py-[8px] border border-text rounded-md' 
                        type="email" 
                        placeholder='Enter email'
                        name='email' 
                        value={data.email}
                        onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                        <p className="text-text text-[16px] font-[600]">Phone number</p>
                        <input className='outline-none w-full px-[8px] py-[4px] md:py-[8px] border border-text rounded-md' 
                        type="text" 
                        name='phone'
                        placeholder='Enter phone number' 
                        value={data.phone}
                        onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                        <p className="text-text text-[16px] font-[600]">Password</p>
                        <div className='flex gap-[8px] items-center px-[8px] py-[4px] md:py-[8px] border border-text rounded-md'>
                            <input className='outline-none w-full' 
                            type={`${hidePassword ? 'password':'text'}`} 
                            placeholder='Enter password'
                            name='password'
                            value={data.password}
                            onChange={handleChange}
                            />
                            <img className="cursor-pointer" src={eye} alt="show password" onClick={()=>{setHidePassword(prev => !prev)}}/>
                        </div>
                    </div>
                    <div className='flex flex-col gap-[8px]'>
                        <p className="text-text text-[16px] font-[600]">Confirm Password</p>
                        <div className='flex gap-[8px] items-center px-[8px] py-[4px] md:py-[8px] border border-text rounded-md'>
                            <input className='outline-none w-full' 
                            type={`${hidePassword ? 'password':'text'}`} 
                            placeholder='Confirm the password'
                            name='password_confirmation'
                            value={data.password_confirmation}
                            onChange={handleChange}
                            />
                            <img className="cursor-pointer" src={eye} alt="show password" onClick={()=>{setHidePassword(prev => !prev)}}/>
                        </div>
                    </div>
                    <div className='flex gap-[8px] items-center'>
                        <input type="checkbox" 
                        onClick={()=>{setChecked(prev => !prev); console.log(checked)}}
                        />
                        <p className='text-text text-[12px] font-[400]'>I agree with Privacy Policy and Terms & Conditions</p>
                    </div>
                </div>
                <PrimaryButton title="Sign Up" action={handleSubmit} />
                <div className='flex gap-2 justify-center items-center'>
                    <p className='text-text text-[14px] font-[400]'>Already have an account? </p>
                    <Link className="text-text text-[14px] font-[600]" to="/login">Login</Link>
                </div>
            </div>
            <div></div>
      </div>
    </div>
  )
}
