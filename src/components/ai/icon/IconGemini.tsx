import type * as React from "react";

interface GeminiLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

const GeminiLogo = ({
  size = 24,
  className = "",
  ...props
}: GeminiLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Gemini Logo"
      {...props}
    >
      <title>Gemini</title>
      <ellipse cx="12" cy="8" rx="6" ry="5" fill="#FA8C16" />
      <ellipse cx="12" cy="16" rx="6" ry="5" fill="#4285F4" />
      <path
        d="M12 3a9 9 0 100 18 9 9 0 000-18z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GeminiLogo;