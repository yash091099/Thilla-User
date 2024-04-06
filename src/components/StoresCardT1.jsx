import React, { useContext } from 'react'
import saveStore from '../assets/save.svg'
import savedStore from '../assets/saved.svg'
import { useNavigate } from 'react-router-dom'
import Context from '../context/AppContext'
export default function StoresCardT1(props) {
console.log(props,'-------------------props t1 card')

  const {setStoreId}=useContext(Context)
  const navigate = useNavigate();
  return (
    <div className='cursor-pointer' onClick={()=>{setStoreId(props.id);navigate('/root/store')}}>
      <img  src={`${props?.image?.includes('http') ? props.image : `https://thilaa.jethitech.com/storage/${props.image}`}`} className='w-[150px]' alt="store image" />
      <h1 className='text-text text-[16px] font-[500] mt-[6px] mb-[4px] min-w-[100px]'>{props.name}</h1>
      <div className='flex justify-between'>
        <span className='text-text text-[12px] font-[400]'>25 mins</span>
        <img src={props.isSaved ? savedStore:saveStore} alt="save store"/>
      </div>
    </div>
  )
}
