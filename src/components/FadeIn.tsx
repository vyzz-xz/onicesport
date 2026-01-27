'use client';

import { motion, useInView, UseInViewOptions } from 'framer-motion';
import { useRef } from 'react';

interface FadeInProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    duration?: number;
    fullWidth?: boolean;
    once?: boolean;
    margin?: string;
}

export default function FadeIn({
    children,
    className = '',
    delay = 0,
    direction = 'up',
    duration = 0.5,
    fullWidth = false,
    once = true,
    margin = '-50px',
}: FadeInProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once, margin: margin as any });

    const getDirectionVariants = () => {
        switch (direction) {
            case 'up':
                return { hidden: { y: 40, opacity: 0 }, visible: { y: 0, opacity: 1 } };
            case 'down':
                return { hidden: { y: -40, opacity: 0 }, visible: { y: 0, opacity: 1 } };
            case 'left':
                return { hidden: { x: 40, opacity: 0 }, visible: { x: 0, opacity: 1 } };
            case 'right':
                return { hidden: { x: -40, opacity: 0 }, visible: { x: 0, opacity: 1 } };
            case 'none':
            default:
                return { hidden: { opacity: 0 }, visible: { opacity: 1 } };
        }
    };

    const variants = getDirectionVariants();

    return (
        <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={variants}
            transition={{ duration, delay, ease: 'easeOut' }}
            className={className}
            style={{ width: fullWidth ? '100%' : 'auto' }}
        >
            {children}
        </motion.div>
    );
}
