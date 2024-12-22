import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Overlay from './Overlay'; // Import Overlay component
import HoverEffectWrapper from './HoverEffectWrapper';

const Table = ({ videos, currentPage, itemsPerPage, showAction, onDeleteVideo }) => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    const handleDeleteClick = (video) => {
        setSelectedVideo(video);
    };

    const confirmDelete = () => {
        if (selectedVideo) {
            onDeleteVideo(selectedVideo._id);
            setSelectedVideo(null);
        }
    };

    const cancelDelete = () => {
        setSelectedVideo(null);
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full max-h-[80vh] overflow-y-hidden table-auto bg-[#EEE] shadow-md rounded-2xl overflow-hidden">
                <thead>
                    <tr className="bg-gradient-to-br from-[#222831] via-[#282d37] via-[#2d333c] via-[#333842] to-[#393e48] text-white font-raleway">
                        <th className="py-2 px-4 text-left">Rank</th>
                        <th className="py-2 px-4 text-left">Title</th>
                        <th className="py-2 px-4 text-left">Elo</th>
                        {showAction && <th className="py-2 pl-4 pr-3 md:pr-0 text-left">Actions</th>}
                    </tr>
                </thead>
                <tbody>
                    {videos.map((video, index) => (
                        <tr key={video._id} className="border-b hover:bg-gray-100 hover:shadow-[1px_9px_6px_0px_rgba(0,_0,_0,_0.1)] font-semibold font-spaceMono">

                            <td className="py-2 px-4">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                            <HoverEffectWrapper>
                                <td className="py-2 px-4"
                                    style={{
                                        transform: "translateZ(75px)",
                                        transformStyle: "preserve-3d",
                                    }}
                                >
                                    <Link to={`/video/${video._id}`}>{video.title}</Link>
                                </td>
                            </HoverEffectWrapper>
                            <td className="py-2 px-4">{Math.floor(video.elo_score)}</td>
                            {showAction && (
                                <td className="py-2 pl-7 text-left">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6 text-[#31363F] cursor-pointer"
                                        onClick={() => handleDeleteClick(video)}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                    </svg>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedVideo && (
                <Overlay onClose={cancelDelete}>
                    <h3 className="text-2xl font-semibold mb-4 font-spaceMono">Confirm Delete</h3>
                    <p className="mb-4 font-raleway">Are you sure you want to delete the video "{selectedVideo.title}"?</p>
                    <div className="flex w-full font-semibold font-spaceMono items-center gap-4">
                        <button
                            className="mr-4 bg-[#76ABAE] text-white px-4 py-2 rounded hover:bg-[#5f898b] w-[50%]"
                            onClick={cancelDelete}
                        >
                            Cancel
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-800 w-[50%] text-white py-2 px-4 rounded"
                            onClick={confirmDelete}
                        >
                            Delete
                        </button>
                    </div>
                </Overlay>
            )}
        </div>
    );
};

export default Table;
