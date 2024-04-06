import React from 'react'

export default function SecondaryButton(props) {
  return (
    <div>
        <button className='text-center text-text text-[16px] font-[600] border-[1.5px] border-primary-brand py-[16px] px-[32px] rounded-[6px] w-full' onClick={props.action}>{props.title}</button>
    </div>
  )
}
