import React from 'react'

export default function PrimaryButton(props) {
  return (
      <button className='text-center text-text text-[16px] font-[600] bg-primary-brand py-[4px] md:py-[16px] px-[32px] rounded-[6px] w-full' onClick={props.action}>{props.title}</button>
  )
}
