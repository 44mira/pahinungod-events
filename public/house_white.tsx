import { twMerge } from "tailwind-merge";

interface houseWhiteProps {
  className?: string;
}

const HouseWhite = ({ className }: houseWhiteProps) => {
  return (
    <svg
      version="1.0"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30px"
      viewBox="0 0 64 64"
      enableBackground="new 0 0 64 64"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={twMerge(className)}
    >
      <path
        fill={className}
        d="M62.79,29.172l-28-28C34.009,0.391,32.985,0,31.962,0s-2.047,0.391-2.828,1.172l-28,28
	c-1.562,1.566-1.484,4.016,0.078,5.578c1.566,1.57,3.855,1.801,5.422,0.234L8,33.617V60c0,2.211,1.789,4,4,4h16V48h8v16h16
	c2.211,0,4-1.789,4-4V33.695l1.195,1.195c1.562,1.562,3.949,1.422,5.516-0.141C64.274,33.188,64.356,30.734,62.79,29.172z"
      />
    </svg>
  );
};

export default HouseWhite;