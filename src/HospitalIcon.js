import * as React from "react";

function SvgHospitalicon(props) {
    return (
        <svg
            id="hospitalicon_svg__glyphicons-basic"
            x={0}
            y={0}
            viewBox="0 0 32 32"
            xmlSpace="preserve"
            width="40px"
            height="40px"
            {...props}
        >
            <style>{".hospitalicon_svg__st0{fill:#c82c25}"}</style>
            <path
                id="hospitalicon_svg__map-marker"
                className="hospitalicon_svg__st0"
                d="M16 4c-5 0-9 4-9 9 0 6 6.8 13.1 8.2 14.6.4.5 1.1.5 1.6.1l.1-.1C18.2 26.1 25 19 25 13c0-5-4-9-9-9zm0 14c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5z"
            />
            <path
                id="hospitalicon_svg__plus"
                className="hospitalicon_svg__st0"
                d="M19.4 12.4v1.2c0 .2-.1.3-.3.3H17V16c0 .2-.1.3-.3.3h-1.2c-.2 0-.3-.1-.3-.3v-2.1h-2.1c-.2 0-.3-.1-.3-.3v-1.2c0-.2.1-.3.3-.3h2.1V9.9c0-.2.1-.3.3-.3h1.2c.2 0 .3.1.3.3V12h2.1c.1.1.3.2.3.4z"
            />
        </svg>
    );
}

export default SvgHospitalicon;
