import React, { useState } from "react";

const GlowEffectWrapper = ({ children, customColors, classes }) => {
    const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setCursorPos({ x, y });
    };

    const defaultColors = {
        inner: "rgba(168, 181, 180, 0.2)", 
        middle: "rgba(168, 181, 180, 0.1)", 
        outer: "transparent", // fully transparent
    };

    const colors = { ...defaultColors, ...customColors };

    return (
        <div
            onMouseMove={handleMouseMove}
            style={{
                "--x": `${cursorPos.x}px`,
                "--y": `${cursorPos.y}px`,
            }}
            className={`relative group  overflow-hidden ${classes}`}
        >
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    background: `radial-gradient(circle at var(--x) var(--y), ${colors.inner}, ${colors.middle}, ${colors.outer} 70%)`,
                }}
            ></div>
            {children}
        </div>
    );
};

export default GlowEffectWrapper;
