import type * as React from "react";

interface QwenLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

const QwenLogo = ({
  size = 24,
  className = "",
  ...props
}: QwenLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Qwen Logo"
      {...props}
    >
      <title>Qwen</title>
      <circle cx="12" cy="12" r="10" fill="#FF6B00" />
      <path
        d="M8 15l4-4 4 4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 11l4-4 4 4"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default QwenLogo;