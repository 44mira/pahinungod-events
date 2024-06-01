import { SVGProps } from "react";

export default function UserSingle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="50"
      height="50"
      viewBox="65 65 412 412"
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
            d="M7.5 6.5C7.5 8.981 9.519 11 12 11s4.5-2.019 4.5-4.5S14.481 2 12 2S7.5 4.019 7.5 6.5zM20 21h1v-1c0-3.859-3.141-7-7-7h-4c-3.86 0-7 3.141-7 7v1h17z"
            fill="currentColor"
          />
        </g>
      </svg>
    </svg>
  );
}
