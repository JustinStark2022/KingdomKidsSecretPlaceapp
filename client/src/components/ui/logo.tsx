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
          <path 
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
            fill="currentColor"
          />
          <path 
            d="M12 6L13.5 9.5L17.5 10L14.5 12.5L15.25 16.5L12 14.5L8.75 16.5L9.5 12.5L6.5 10L10.5 9.5L12 6Z" 
            fill="hsl(var(--card))"
          />
        </svg>
        <svg 
          className={`${sizeClasses[size]} absolute top-0 left-0 text-primary`}
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
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
