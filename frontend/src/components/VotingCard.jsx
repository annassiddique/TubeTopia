import React, { useState } from "react";
import HoverEffectWrapper from "./HoverEffectWrapper";

const VotingCard = ({ video, onVote }) => {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCursorPos({ x, y });
    };

    const isYouTube = video.url.includes("youtu");

    return (
        <HoverEffectWrapper classes={"w-[410px] h-full"}>
            <div
                key={video.id}
                onMouseMove={handleMouseMove}
                style={{
                    "--x": `${cursorPos.x}px`,
                    "--y": `${cursorPos.y}px`,
                    transform: "translateZ(75px)",
                    transformStyle: "preserve-3d",
                }}
                className="text-center flex flex-col 
                items-center justify-between w-full md:w-auto 
                shadow-[1px_9px_6px_0px_rgba(0,_0,_0,_0.2)] bg-[#31363fb6] 
                text-white p-2 py-3 rounded-xl relative group overflow-hidden"
            >
                <div
                    className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                    style={{
                        background: "radial-gradient(circle at var(--x) var(--y), rgba(168, 181, 180, 0.2), rgba(168, 181, 180, 0.1), transparent 70%)",
                    }}
                ></div>
                {isYouTube ? (
                    <iframe
                        src={`https://www.youtube.com/embed/${getYouTubeID(video.url)}`}
                        className="rounded-md shadow-md w-full md:w-[400px] h-44 sm:h-52 object-cover z-50"
                        allowFullScreen
                        title={video.title}
                    ></iframe>
                ) : (
                    <video
                        controls
                        className="rounded-md shadow-md w-full md:w-[400px] h-44 sm:h-52 object-cover"
                    >
                        <source src={video.url} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
                <div className="flex flex-col items-center justify-between h-[100px] w-full mt-4 px-4">
                    <h2 className="text-lg sm:text-xl font-semibold font-spaceMono max-w-[350px] max-h-[70px] text-center overflow-hidden">
                        {video.title}
                    </h2>
                    <div className="flex items-center justify-between w-full font-raleway italic">
                        <p className="">Elo score</p>
                        <p className="font-semibold">{Math.floor(video.elo_score)}</p>
                    </div>
                </div>
                <button
                    onClick={() => onVote(video.id)}
                    className="mt-4 w-full px-6 py-2 bg-[#EEEEEE] text-[#31363F] font-spaceMono font-semibold rounded-md hover:bg-[#31363F] hover:text-[#EEEEEE] transition"
                >
                    Vote
                </button>
            </div>
        </HoverEffectWrapper>
    );
};

const getYouTubeID = (url) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=))([^&\n?#]+)/);
    return match ? match[1] : null;
};

export default VotingCard;
