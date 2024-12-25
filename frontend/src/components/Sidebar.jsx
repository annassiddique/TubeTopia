import React from 'react'
import { Link } from 'react-router-dom'
import GlowEffectWrapper from './GlowEffectWrapper'
import HoverEffectWrapper from './HoverEffectWrapper'

const Sidebar = ({ suggestedVideos }) => {
    return (
        <div className="border-l border-[#31363F] bg-gradient-to-t from-[#222831] via-[#262b34] via-[#292f38] via-[#2d323b] to-[#31363f] text-white w-full md:w-2/4 pt-12 mt-7 md:mt-0 md:ml-2 p-4">
            <h3 className="text-xl font-semibold mb-4 font-raleway">Suggested Videos</h3>
            {suggestedVideos?.length > 0 ? (
                <ul className="space-y-6">
                    {suggestedVideos?.map((suggestedVideo) => (
                        <HoverEffectWrapper>
                            <li key={suggestedVideo._id} 
                            className="mb-4 border-2 rounded-md  hover:border-[#a8a1a1] overflow-hidden hover:shadow transition"
                            style={{
                                transform: "translateZ(75px)",
                                transformStyle: "preserve-3d",
                            }}
                            >
                                <GlowEffectWrapper classes={"p-3"}>
                                    <Link to={`/video/${suggestedVideo._id}`} className="text-[#fff] hover:text-[#89c4c7] ">
                                        <div className="flex space-x-4">
                                            <div>
                                                <h4 className=" text-sm sm:text-lg font-bold  lg:max-w-[280px] xl:max-w-[97%] font-spaceMono truncate">{suggestedVideo.title}</h4>
                                                <p className="text-sm font-raleway  truncate">{Math.floor(suggestedVideo.elo_score)}</p>
                                            </div>
                                        </div>
                                    </Link>
                                </GlowEffectWrapper>
                            </li>

                        </HoverEffectWrapper>
                    ))}
                </ul>
            ) : (
                <p>No suggested videos available.</p>
            )}
        </div>
    )
}

export default Sidebar