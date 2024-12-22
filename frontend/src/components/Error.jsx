import React from 'react'

const Error = ({ error }) => {
    return (
        <div className='flex flex-col gap-2 justify-center items-center h-[92.5vh]'>
            <h3 className='font-bold font-spaceMono text-4xl'>Error</h3>
            <div className="w-[150px] border-t-2 border-[#222831]"></div>
            <p className="font-bold font-spaceMono text-2xl">{error}</p>
        </div>
    )
}

export default Error