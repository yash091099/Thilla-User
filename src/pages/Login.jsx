import React, { useEffect, useState } from 'react'
import rectangleImage from '../assets/images/rectangle.png';
import eye from '../assets/hide-password.svg';
import Logo from '../assets/Thilaa-Logo.svg'
import PrimaryButton from '../components/PrimaryButton';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Login() {
  const navigate = useNavigate();
  const [hidePassword, setHidePassword] = useState(true);

  const authToken = localStorage.getItem('token');
  useEffect(() => {
    if (authToken) {
      navigate('/');
    }
  }, [authToken, navigate]);

  const [data, setData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      return toast.error('Please fill all fields');
    }
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://thilaa.jethitech.com/api/login',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: data
    };

    await axios.request(config)
      .then((response) => {
        if (response.data.success === true) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('_u', JSON.stringify(response.data.user_details));
          
          toast.success(response.data.message);
          navigate('/');
          window.location.reload()
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error('An error occurred');
      });
  };

  return (
    <div className='flex gap-[64px]'>
      <div className='hidden sm:flex flex-1 relative'>
        <img className='w-[871px] h-screen object-cover' src={rectangleImage} alt='img' />
      </div>
      <div className='flex-1 flex flex-col justify-between items-center h-screen'>
        <img className='w-[100px] pt-[8px]' src={Logo} alt='logo' />
        <form className='flex flex-col gap-[16px] w-[327px] px-[16px] sm:px-[0px]' onSubmit={handleSubmit}>
          <h1 className='text-text text-[20px] font-[600]'>Login</h1>
          <div className='flex flex-col gap-[8px]'>
            <div className='flex flex-col gap-[8px]'>
              <p className="text-text text-[16px] font-[600]">Email, Phone number</p>
              <input className='outline-none w-full px-[8px] py-[4px] md:py-[8px] border border-text rounded-md'
                type="text"
                placeholder='Enter Email or Phone number'
                value={data.email}
                name='email'
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col gap-[8px]'>
              <p className="text-text text-[16px] font-[600]">Password</p>
              <div className='flex gap-[8px] items-center px-[8px] py-[4px] md:py-[8px] border border-text rounded-md'>
                <input className='outline-none w-full'
                  type={`${hidePassword ? 'password' : 'text'}`}
                  value={data.password}
                  name='password'
                  onChange={handleChange}
                  placeholder='Enter Password' />
                <img className="cursor-pointer" src={eye} alt="show password" onClick={() => { setHidePassword(prev => !prev) }} />
              </div>
            </div>
          </div>
          <PrimaryButton title="Login" action={handleSubmit} />
          <div className='flex gap-2 justify-center items-center'>
            <p className='text-text text-[14px] font-[400]'>Don't have an account? </p>
            <Link className="text-text text-[14px] font-[600]" to="/register">Sign up</Link>
          </div>
        </form>
        <div></div>
      </div>
    </div>
  )
}
