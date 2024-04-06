import React from 'react'

export default function LightButton(props) {
  return (
      <button className='text-center text-text text-[12px] md:text-[16px] font-[600] bg-light-background py-[8px] md:py-[16px] px-[32px] rounded-[6px] w-full' onClick={props.action}>{props.title}</button>
  )
}
