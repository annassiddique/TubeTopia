import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/sidebar";
import { useDispatch } from "react-redux";
import { fetchVideoById } from "../redux/slices/videos/videoAPI";

const VideoPage = () => {
    const { id } = useParams(); // Get the video ID from the URL
    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [suggestedVideos, setSuggestedVideos] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchVideoDetails = async () => {
            try {
                const response = await dispatch(fetchVideoById(id));
                setVideo(response.payload);
                setLoading(false);
            } catch (error) {
                setError("Error fetching video details");
                setLoading(false);
            }
        };

        const fetchSuggestedVideos = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/votes/rankings?page=1&limit=8`
                );

                if (Array.isArray(response.data.videos)) {
                    const filteredVideos = response.data.videos.filter((v) => v._id !== id); 
                    setSuggestedVideos(filteredVideos);
                } else {
                    setError("Invalid response format from suggested videos API");
                }
            } catch (error) {
                console.error("Error fetching suggested videos", error);
                setError("Error fetching suggested videos");
            }
        };


        fetchVideoDetails();
        fetchSuggestedVideos();
    }, [id]); 

    const isYouTube = video?.url?.includes("youtu");

    const getYouTubeID = (url) => {
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=))([^&\n?#]+)/);
        return match ? match[1] : null;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="w-full min-h-[92.8vh] flex flex-col md:flex-row">
            <div className="w-full flex flex-col justify-start items-center px-3 pt-5 md:pt-24">
                {isYouTube ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeID(video?.url)}`}
                        className="rounded-md shadow-md mx-2 w-full  h-[450px] object-cover"
                        allowFullScreen
                        title={video?.title}
                    ></iframe>
                ) : (
                    <video
                        controls
                        className="rounded-md shadow-md mx-2 w-full h-[450px] object-cover"
                    >
                        <source src={video?.url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}

                <div className="w-full mt-9 px-5 space-y-3">
                    <h2 className="text-xl sm:text-3xl font-spaceMono font-bold">{video?.title}</h2>
                    <div className="flex justify-between items-center font-spaceMono text-base sm:text-xl">
                        <p className="italic">Elo Score</p>
                        <p className="font-semibold">{video?.elo_score}</p>
                    </div>
                    <div className="flex justify-between items-center font-spaceMono text-base sm:text-xl">
                        <p className="italic">Uploaded by</p>
                        <p className="font-semibold">{video?.user_id.name}</p>
                    </div>
                </div>
            </div>

            {/* Sidebar for suggested videos */}
            <Sidebar suggestedVideos={suggestedVideos} />

        </div>
    );
};

export default VideoPage;
