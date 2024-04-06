import React from 'react'
// import saveStore from '../assets/save.svg'
// import savedStore from '../assets/saved.svg'
import { useNavigate } from 'react-router-dom'
export default function StoresCardWishlist(props) {
  const navigate = useNavigate();
  return (
    <div className='' onClick={()=>{navigate('/root/store')}}>
      <img src={props.image} alt="store image" />
      <h1 className='text-text text-[16px] font-[500] mt-[6px] mb-[4px] min-w-[100px]'>Brand Name</h1>
      <div className='flex justify-between'>
        <span className='text-text text-[12px] font-[400]'>25 mins</span>
        {/* <img src={props.isSaved ? savedStore:saveStore} alt="save store"/> */}
      </div>
    </div>
  )
}