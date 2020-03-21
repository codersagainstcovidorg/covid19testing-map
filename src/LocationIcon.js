import * as React from "react";

function SvgLocationIcon(props) {
    return (
        <svg viewBox="0 0 18 24" {...props}>
            <defs>
                <style>{".LocationIcon_svg__cls-1{fill:#c82c25}"}</style>
            </defs>
            <g id="LocationIcon_svg__Layer_2" data-name="Layer 2">
                <g id="LocationIcon_svg__glyphicons-basic">
                    <path
                        id="LocationIcon_svg__map-marker"
                        className="LocationIcon_svg__cls-1"
                        d="M9 0a9 9 0 00-9 9c0 6 6.76 13.08 8.16 14.63a1.14 1.14 0 001.61.07.46.46 0 00.07-.07C11.24 22.08 18 15 18 9a9 9 0 00-9-9zm0 14a5 5 0 115-5 5 5 0 01-5 5z"
                    />
                    <path
                        id="LocationIcon_svg__plus"
                        className="LocationIcon_svg__cls-1"
                        d="M12.37 8.39v1.22a.31.31 0 01-.31.31H9.92v2.14a.31.31 0 01-.31.31H8.39a.31.31 0 01-.31-.31V9.92H5.94a.31.31 0 01-.31-.31V8.39a.31.31 0 01.31-.31h2.14V5.94a.31.31 0 01.31-.31h1.22a.31.31 0 01.31.31v2.14h2.14a.31.31 0 01.31.31z"
                    />
                </g>
            </g>
        </svg>
    );
}

export default SvgLocationIcon;

