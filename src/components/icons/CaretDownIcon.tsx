import * as React from "react";

const CaretDownIcon = (props: any) => (
    <svg
        width={props.size}
        height={props.size}
        fill="none"
        stroke={"currentColor"}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={"2"}
        viewBox="0 0 24 24"
        {...props}
    >
        <path d="m6 9 6 6 6-6H6Z" />
    </svg>
);

export default CaretDownIcon;
