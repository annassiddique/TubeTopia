import React from 'react'

const Loading = ({classes}) => {
    return (
        <div
            className={`flex flex-col justify-center items-center w-full h-[90vh] ${classes}`}
        >
            <iframe src="https://lottie.host/embed/e55abf48-6bff-4b73-8f0a-2d7c0ac8ffa3/tU8tfX0gOE.lottie"
            className='w-[250px] h-[240px]'
            ></iframe>
            <h2 className="text-2xl font-spaceMono font-semibold -mt-12 text-gray-600">Loading</h2>
        </div>
    )
}

export default Loading