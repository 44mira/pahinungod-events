import { SVGProps } from "react";

export default function IconMenu(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="40"
      height="40"
      viewBox="150 150 212 212"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="512"
        height="512"
        x="0"
        y="0"
        rx="30"
        fill="transparent"
        stroke="transparent"
        strokeWidth="0"
        strokeOpacity="100%"
        paintOrder="stroke"
      ></rect>
      <svg
        width="256px"
        height="256px"
        viewBox="0 0 24 24"
        fill="currentColor"
        x="128"
        y="128"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="currentColor">
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M19.75 12a.75.75 0 0 0-.75-.75H5a.75.75 0 0 0 0 1.5h14a.75.75 0 0 0 .75-.75Zm0-5a.75.75 0 0 0-.75-.75H5a.75.75 0 0 0 0 1.5h14a.75.75 0 0 0 .75-.75Zm0 10a.75.75 0 0 0-.75-.75H5a.75.75 0 0 0 0 1.5h14a.75.75 0 0 0 .75-.75Z"
            clip-rule="evenodd"
          />
        </g>
      </svg>
    </svg>
  );
}
