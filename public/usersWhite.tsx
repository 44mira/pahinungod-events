import { SVGProps } from "react";

const UsersWhite = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="50"
      height="50"
      viewBox="50 50 512 512"
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
        width="356px"
        height="356px"
        viewBox="0 0 24 24"
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
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20c0-1.657-2.239-3-5-3s-5 1.343-5 3m14-3c0-1.23-1.234-2.287-3-2.75M3 17c0-1.23 1.234-2.287 3-2.75m12-4.014a3 3 0 1 0-4-4.472m-8 4.472a3 3 0 0 1 4-4.472M12 14a3 3 0 1 1 0-6a3 3 0 0 1 0 6Z"
          />
        </g>
      </svg>
    </svg>
  );
};

export default UsersWhite;
