import { SVGProps } from "react";

export default function Location(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="50"
      height="50"
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
        viewBox="0 0 24 24"
        fill="currentColor"
        x="128"
        y="128"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g fill="currentColor">
          <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
            <path d="M7.25 10a4.75 4.75 0 1 1 9.5 0a4.75 4.75 0 0 1-9.5 0ZM12 6.75a3.25 3.25 0 1 0 0 6.5a3.25 3.25 0 0 0 0-6.5Z" />
            <path d="M3.524 8.857a8.288 8.288 0 0 1 8.26-7.607h.432a8.288 8.288 0 0 1 8.26 7.607a8.944 8.944 0 0 1-1.99 6.396l-4.793 5.861a2.187 2.187 0 0 1-3.386 0l-4.793-5.861a8.943 8.943 0 0 1-1.99-6.396Zm8.26-6.107A6.788 6.788 0 0 0 5.02 8.98a7.443 7.443 0 0 0 1.656 5.323l4.793 5.862a.687.687 0 0 0 1.064 0l4.793-5.862A7.443 7.443 0 0 0 18.98 8.98a6.788 6.788 0 0 0-6.765-6.23h-.432Z" />
          </g>
        </g>
      </svg>
    </svg>
  );
}
