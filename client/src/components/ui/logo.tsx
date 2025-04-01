import React from "react";

interface LogoProps {
  size?: "small" | "medium" | "large";
}

const Logo: React.FC<LogoProps> = ({ size = "medium" }) => {
  const sizeClasses = {
    small: "h-6",
    medium: "h-8",
    large: "h-12"
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
          {/* Crown shape - more closely resembling the provided image */}
          <path 
            d="M4 16.5L7 10L12 13L17 10L20 16.5H4Z" 
            fill="currentColor"
          />
          {/* Crown points/spikes */}
          <path 
            d="M7 8L12 4L17 8" 
            fill="currentColor"
          />
          <path 
            d="M9 8L12 6L15 8" 
            fill="currentColor"
          />
          {/* Crown jewels */}
          <circle cx="7" cy="10" r="0.8" fill="hsl(var(--card))" />
          <circle cx="12" cy="4" r="0.8" fill="hsl(var(--card))" />
          <circle cx="17" cy="10" r="0.8" fill="hsl(var(--card))" />
          <circle cx="12" cy="13" r="0.8" fill="hsl(var(--card))" />
        </svg>
        <svg 
          className={`${sizeClasses[size]} absolute top-0 left-0 text-primary`}
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Crown outline */}
          <path 
            d="M4 16.5L7 10L12 13L17 10L20 16.5H4Z" 
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path 
            d="M7 8L12 4L17 8" 
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="ml-3">
        <h1 className="font-bold text-xl text-primary leading-none tracking-tight">Kingdom Kids</h1>
        <p className="text-sm text-primary neon-text italic font-semibold leading-none">Secret Place</p>
      </div>
    </div>
  );
};

export default Logo;
