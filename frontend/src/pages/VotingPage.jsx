import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import VotingCard from "../components/VotingCard";
import { fetchVideos, postVote, resetRounds } from "../redux/slices/vote/votesSlice";
import Loading from "../components/Loading";
import HoverEffectWrapper from "../components/HoverEffectWrapper";
import Error from "../components/Error";

const VotingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [votingLimitReached, setVotingLimitReached] = useState(false);

    const { videoA, videoB, currentRound, maxRounds, status, error } = useSelector(
        (state) => state.votes
    );

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const resetVoteLimit = () => {
            const voteTimestamp = parseInt(localStorage.getItem("voteTimestamp")) || 0;
            const currentTime = Date.now();
            const twoHoursInMillis = 2 * 60 * 60 * 1000;

            if (currentTime - voteTimestamp >= twoHoursInMillis) {
                localStorage.setItem("voteCount", "0");
                localStorage.setItem("voteTimestamp", currentTime.toString());
                setVotingLimitReached(false);
            }
        };

        // Non-registered user logic
        if (!user) {
            resetVoteLimit();
            const voteCount = parseInt(localStorage.getItem("voteCount")) || 0;
            if (voteCount >= 10) {
                setVotingLimitReached(true);
            }
        } else {
            // For registered users, ensure votingLimitReached is always false
            setVotingLimitReached(false);
        }

        dispatch(fetchVideos());
    }, [dispatch, user]);

    const handleVote = (winner) => {
        // If non-registered user has reached the limit, prevent further voting
        if (!user) {
            const voteCount = parseInt(localStorage.getItem("voteCount")) || 0;
            if (voteCount >= 10) {
                setVotingLimitReached(true);
                return;
            }
        }

        const voteData = { winner };
        dispatch(postVote(voteData)).then(() => {
            // Update local vote count for non-registered users
            if (!user) {
                const voteCount = parseInt(localStorage.getItem("voteCount")) || 0;
                const newVoteCount = voteCount + 1;
                localStorage.setItem("voteCount", newVoteCount);

                if (voteCount === 0) {
                    localStorage.setItem("voteTimestamp", Date.now().toString());
                }
            }

            if (currentRound < maxRounds) {
                dispatch(fetchVideos());
            } else {
                dispatch(resetRounds());
                navigate("/ranks");
            }
        });
    };

    if (status === "loading") return <Loading />;
    if (status === "failed") return <Error error={error}/>;

    return (
        <div className="min-h-[92.5vh] flex flex-col items-center justify-center mt-12 md:mt-0">
            {!votingLimitReached && (
                <h1 className=" text-2xl md:text-4xl font-bold mb-8 text-gray-800 font-spaceMono">
                    {user ? `Vote` : `Round ${currentRound} / ${maxRounds}`}
                </h1>
            )}

            {votingLimitReached && !user && (
                <div className="text-center mb-8 shadow-[1px_3px_6px_0px_rgba(0,_0,_0,_0.2)] rounded-lg py-7 px-6">
                    <h3 className="text-xl font-spaceMono font-bold">You've reached the voting limit</h3>
                    <p className="text-base text-gray-600">
                        Please wait 2 hours or log in to continue voting.
                    </p>
                    <HoverEffectWrapper>
                        <button
                            onClick={() => navigate("/signup")}
                            className="bg-[#222831] text-white font-semibold font-spaceMono border-2 border-[#222831] w-full
                        py-2 px-4 rounded-md hover:bg-[#EEE] hover:text-[#222831] hover:shadow-[1px_3px_6px_0px_rgba(0,_0,_0,_0.2)] transition delay-150 ease-in-out mt-4"
                            style={{
                                transform: "translateZ(75px)",
                                transformStyle: "preserve-3d",
                            }}
                        >
                            Login / Sign Up
                        </button>
                    </HoverEffectWrapper>
                </div>
            )}

            {!votingLimitReached && videoA && videoB && (
                <div className="flex flex-col md:flex-row gap-4 lg:gap-16 mb-6 w-full md:w-auto">
                    <VotingCard video={videoA} onVote={() => handleVote("A")} />
                    <VotingCard video={videoB} onVote={() => handleVote("B")} />
                </div>
            )}
        </div>
    );
};

export default VotingPage;
