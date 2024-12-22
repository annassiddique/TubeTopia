import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "../components/Table";
import Loading from "../components/Loading";
import io from "socket.io-client";

// Connect to the Socket.IO server
const socket = io.connect(`${import.meta.env.VITE_BACKEND_IO_URL}`);

const RankPage = () => {
    const [videos, setVideos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);

    const itemsPerPage = 15;

    const fetchVideos = async (page = currentPage) => {
        try {
            setLoading(true);
            const response = await axios.get(
                `${import.meta.env.VITE_BACKEND_BASE_URL}/votes/rankings?page=${page}&limit=${itemsPerPage}`
            );

            const { videos, totalPages } = response.data;
            setVideos(videos);
            setTotalPages(totalPages);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching videos:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
        socket.on("voteUpdate", (data) => {
            console.log("Vote update received:", data);
            fetchVideos();
        });

        return () => {
            socket.off("voteUpdate");
        };
    }, []); 

    const paginate = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
            fetchVideos(pageNumber);
        }
    };

    return (
        <div className="min-h-screen  py-10 px-5">
            <h1 className="text-2xl md:text-4xl font-bold mb-6 text-center text-[#222831] font-spaceMono">
                Top-Rated Videos
            </h1>

            {loading && <Loading classes={"h-[80vh]"} />}

            {!loading && videos.length > 0 && (
                <Table
                    videos={videos}
                    currentPage={currentPage}
                    itemsPerPage={itemsPerPage}
                />
            )}

            {/* Pagination */}
            <div className="flex justify-center mt-6 font-spaceMono">
                <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-2 bg-[#31363F] text-white rounded-md disabled:bg-gray-400"
                >
                    Previous
                </button>

                {[...Array(totalPages).keys()].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 mx-2 rounded-md ${currentPage === index + 1
                                ? "bg-[#222831] text-white"
                                : "text-[#222831]"
                            }`}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-2 bg-[#31363F] text-white rounded-md disabled:bg-gray-400"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default RankPage;
