import React from 'react'

const Avatar = ({ user, classes }) => {
    return (
        <div className={`bg-[#76ABAE] text-[#EEE] rounded-full flex justify-center items-center px-3 py-1 ${classes}`}>{user?.name[0]}</div >
    )
}

export default Avatar