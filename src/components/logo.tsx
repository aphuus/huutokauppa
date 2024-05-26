import * as React from "react";
import { SVGProps } from "react";

const Logo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className="iconify iconify--fe"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M7.268 18.732 5 21v-4.157c-1.25-1.46-2-3.319-2-5.343C3 6.806 7.03 3 12 3s9 3.806 9 8.5-4.03 8.5-9 8.5a9.352 9.352 0 0 1-4.732-1.268Z"
    />
  </svg>
);

export default Logo;
