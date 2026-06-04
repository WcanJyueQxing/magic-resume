import type * as React from "react";

interface AnthropicLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

const AnthropicLogo = ({
  size = 24,
  className = "",
  ...props
}: AnthropicLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Anthropic Logo"
      {...props}
    >
      <title>Anthropic</title>
      <circle cx="12" cy="12" r="10" fill="#722ED1" />
      <path
        d="M8 12h8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 8v8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default AnthropicLogo;