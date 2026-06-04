import type * as React from "react";

interface MistralLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

const MistralLogo = ({
  size = 24,
  className = "",
  ...props
}: MistralLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Mistral Logo"
      {...props}
    >
      <title>Mistral</title>
      <path
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
        fill="#FF4D4F"
      />
      <path
        d="M8 9l4 5 4-5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MistralLogo;