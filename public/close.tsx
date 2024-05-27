import { SVGProps } from "react";

export default function IconClose(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="40"
      height="40"
      viewBox="0 0 512 512"
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
        stroke-width="0"
        stroke-opacity="100%"
        paint-order="stroke"
      ></rect>
      <svg
        width="256px"
        height="256px"
        viewBox="0 0 32 32"
        fill="currentColor"
        x="128"
        y="128"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="currentColor">
          <path
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2 30L30 2m0 28L2 2"
          />
        </g>
      </svg>
    </svg>
  );
}
