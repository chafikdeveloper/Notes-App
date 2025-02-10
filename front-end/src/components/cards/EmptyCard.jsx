import React from 'react'
import { MdNoteAdd } from "react-icons/md";
import { RiFileForbidFill } from "react-icons/ri";


const EmptyCard = ({isSearch , message}) => {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
      {isSearch ? <RiFileForbidFill className='w-60 h-60' /> : <MdNoteAdd className='w-60 h-60' />}

      <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">{message}</p>
    </div>
  )
}

export default EmptyCard