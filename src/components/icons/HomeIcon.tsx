import * as React from "react";

const HomeIcon = ({
    size = 18,
    strokeWidth = 2,
    color = "currentColor",
    ...props
}) => (
    <svg
        width={size}
        height={size}
        fill="none"
        stroke={'currentColor'}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="M5 12H3l9-9 9 9h-2" />
        <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7" />
        <path d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6" />
    </svg>
);

export default HomeIcon;
