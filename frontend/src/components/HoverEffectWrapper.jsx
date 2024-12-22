import React, { useRef } from "react";
import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "framer-motion";

const ROTATION_RANGE = 19.5;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const HoverEffectWrapper = ({ children, classes }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const xSpring = useSpring(x, { stiffness: 200, damping: 20 });
    const ySpring = useSpring(y, { stiffness: 200, damping: 20 });

    const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

    const handleMouseMove = (e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const { width, height } = rect;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const rX = ((mouseY / height) - 0.5) * -ROTATION_RANGE;
        const rY = ((mouseX / width) - 0.5) * ROTATION_RANGE;

        x.set(rX);
        y.set(rY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                transformStyle: "preserve-3d",
                transform,
            }}
            className={`w-full ${classes}`}
        >
            {children}
        </motion.div>
    );
};


export default HoverEffectWrapper;
