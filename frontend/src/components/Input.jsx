import React from 'react';

const Input = ({ type, label, ...rest }) => {
    return (
        <div className="flex flex-col w-full gap-1">
            <label className='text-[0.9rem] text-gray-700 font-raleway'>
                {label} :
            </label>
            <input
                type={type || "text"}
                className='h-[32px] rounded-t-md outline-none ring-0 px-3 border-b-2 border-[#222831c0]'
                {...rest} 
            />
        </div>
    );
}

export default Input;
