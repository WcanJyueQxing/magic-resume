import type * as React from "react";

interface ZhipuLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  className?: string;
}

const ZhipuLogo = ({
  size = 24,
  className = "",
  ...props
}: ZhipuLogoProps) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Zhipu GLM Logo"
      {...props}
    >
      <title>Zhipu GLM</title>
      <rect x="4" y="4" width="16" height="16" rx="4" fill="#52C41A" />
      <path
        d="M12 8l3 4-3 4-3-4 3-4z"
        fill="white"
      />
    </svg>
  );
};

export default ZhipuLogo;