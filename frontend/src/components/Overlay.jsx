import React from "react";

const Overlay = ({ children, onClose }) => {
    return (
        <div
            className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"
            onClick={onClose} // Close overlay on backdrop click
        >
            <div
                className="bg-white p-6 rounded-lg shadow-lg w-[450px]"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the content
            >
                <button
                    className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
                    onClick={onClose}
                >
                    ✖
                </button>
                {children}
            </div>
        </div>
    );
};

export default Overlay;
