import React from "react";
import GlowEffectWrapper from "./GlowEffectWrapper";

const Overlay = ({ children, onClose }) => {
    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={onClose} // Close overlay on backdrop click
        >
            <GlowEffectWrapper
                classes=""
            >
                <div className="bg-[#57606f] p-6 rounded-lg shadow-lg w-[450px]"
                    onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the content
                >
                    {children}
                </div>
            </GlowEffectWrapper>
        </div>
    );
};

export default Overlay;
