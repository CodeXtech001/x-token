import { SectionHeaderProp } from '@/lib/typescript'
import React from 'react'

function index({headline, paragraph}: SectionHeaderProp) {
  return (
    <div className='text text-center w-full space-y-4 md:space-y-12'>
        <h2 className='bg-clip-text text-transparent text-4xl md:text-[3.25rem] font-bold
                   bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
                   bg-[length:200%_200%] animate-gradient-move'>{headline}</h2>
        <p className='text-[rgb(209,213,219,.9)] text-sm font-light'>{paragraph}</p>
    </div>
  )
}

export default index