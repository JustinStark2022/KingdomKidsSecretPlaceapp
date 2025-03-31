import React from "react";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

const Logo: React.FC<LogoProps> = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "h-6 w-6",
    medium: "h-8 w-8",
    large: "h-12 w-12"
  };
  
  return (
    <div className="flex items-center">
      <div className="relative">
        <svg 
          className={`${sizeClasses[size]} text-primary`}
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Crown shape */}
          <path 
            d="M3 17L6 9L12 12L18 9L21 17H3Z" 
            fill="currentColor"
          />
          <path 
            d="M6 9L12 4L18 9" 
            fill="currentColor"
          />
          <path 
            d="M12 12V20" 
            stroke="currentColor"
            strokeWidth="1"
          />
          {/* Crown points */}
          <circle cx="6" cy="8" r="1" fill="hsl(var(--card))" />
          <circle cx="12" cy="4" r="1" fill="hsl(var(--card))" />
          <circle cx="18" cy="8" r="1" fill="hsl(var(--card))" />
        </svg>
        <svg 
          className={`${sizeClasses[size]} absolute top-0 left-0 text-primary`}
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Crown outline */}
          <path 
            d="M3 17L6 9L12 12L18 9L21 17H3Z" 
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path 
            d="M6 9L12 4L18 9" 
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path 
            d="M12 12V20" 
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="ml-2">
        <h1 className="font-bold text-xl leading-none">Kingdom Kids</h1>
        <p className="text-sm text-primary neon-text font-semibold leading-none">Secret Place</p>
      </div>
    </div>
  );
};

export default Logo;
