import React, { useContext } from 'react'
import saveStore from '../assets/save.svg'
import savedStore from '../assets/saved.svg'
import leftGoto from '../assets/left-goto.svg'
import { useNavigate } from 'react-router-dom'
import Context from '../context/AppContext'

export default function StoresCardT2(props) {
  const navigate = useNavigate();
  const {setStoreId}=useContext(Context)
console.log(props,'-------------------props t2 card')
  console.log(props);
  return (
    <>
    <div className="ml-3">

      <div  className='md:hidden cursor-pointer flex-1 border border-[#D5D5D5] px-[16px] py-[16px] rounded-md' onClick={()=>{setStoreId(props.id);navigate('/root/store')}}>
        <img className='w-[80px] rounded-[50%] mx-auto' src={'https://thilaa.jethitech.com/storage/'+props.image} alt="store image" />
        <h1 className='text-text text-[16px] font-[500] mt-[6px] mb-[4px] max-w-[100px] truncate'>{props.name}</h1>
        <div className='flex justify-between'>
          <span className='text-text text-[12px] font-[400]'>25 mins</span>
          <img src={props.isSaved ? savedStore:saveStore} alt="save store"/>
        </div>
      </div>
      <div className='hidden cursor-pointer md:flex h-[120px] gap-[126px] p-[16px] rounded-[8px] shadow-lg'>
          <div className='flex gap-[8px] items-center'>
          <img className='w-[50px] h-[50px] rounded-[50%]' src={'https://thilaa.jethitech.com/storage/'+props.image} alt="store"/>
              <div className='flex flex-col gap-[4px]'>
                  <h1 className='text-text text-[18px] font-[600]'>{props.name}</h1>
                  <p className='text-text text-[14px] font-[400]'>Product info - 25 mins</p>
              </div>
          </div>
          <div className='flex cursor-pointer justify-center items-center gap-[6px]'>
              <img src={props.isSaved ? savedStore:saveStore} alt="save store"/>
              <img src={leftGoto} alt="goto" onClick={()=>{navigate('/root/store')}} />
          </div>
      </div>
    </div>
    </>
  )
}
