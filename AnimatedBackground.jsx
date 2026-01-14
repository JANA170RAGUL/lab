import React from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
    return (
        <div id="animated-bg" className="background-container">
            <svg style={{ display: 'none' }}>
                <defs>
                    <filter id="liquid">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.01 0.01"
                            numOctaves="1"
                            result="warp"
                        >
                            <animate
                                attributeName="baseFrequency"
                                from="0.01 0.01"
                                to="0.012 0.012"
                                dur="30s"
                                repeatCount="indefinite"
                            />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" in2="warp" scale="30" />
                    </filter>
                </defs>
            </svg>
            <div className="blob-container" style={{ filter: 'blur(80px) url(#liquid)' }}>
                <div className="blob blob-1"></div>
                <div className="blob blob-2"></div>
                <div className="blob blob-3"></div>
                <div className="blob blob-4"></div>
            </div>
            <div className="background-overlay"></div>
        </div>
    );
};

export default AnimatedBackground;
