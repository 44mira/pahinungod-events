import { SVGProps } from "react";

const CalendarWhite = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      {...props}
      width="50px"
      height="50px"
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
      className="h-7 w-7"
    >
      <rect
        width="30px"
        height="30px"
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
        width="230px"
        height="250px"
        viewBox="0 0 16 16"
        fill="currentColor"
        x="128"
        y="128"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="currentColor">
          <path
            fill="currentColor"
            d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zm9.954 3H2.545c-.3 0-.545.224-.545.5v1c0 .276.244.5.545.5h10.91c.3 0 .545-.224.545-.5v-1c0-.276-.244-.5-.546-.5zM11.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1z"
          />
        </g>
      </svg>
    </svg>
  );
};

export default CalendarWhite;
