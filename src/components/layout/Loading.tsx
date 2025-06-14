import React from "react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  progress?: number; // Optional progress value between 0-100
}

const Loading: React.FC<LoadingProps> = ({
  size = "md",
  message,
  progress,
}) => {
  const sizeClasses = {
    sm: "h-8 w-8 border-2",
    md: "h-16 w-16 border-3",
    lg: "h-32 w-32 border-4",
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-4">
      <div className="relative">
        {/* Outer ring */}
        <div
          className={`${sizeClasses[size]} rounded-full border-t-transparent border-primary animate-[spin_1s_linear_infinite]`}
        />
        {/* Inner ring */}
        <div
          className={`${sizeClasses[size]} absolute top-0 left-0 rounded-full border-b-transparent border-primary/30 animate-[spin_1.5s_linear_infinite_reverse]`}
        />
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className={`${
              size === "sm"
                ? "h-1.5 w-1.5"
                : size === "md"
                ? "h-2 w-2"
                : "h-3 w-3"
            } rounded-full bg-primary`}
          />
        </div>
      </div>

      {/* Message text */}
      {message && (
        <p className="text-primary text-lg font-medium mt-4">{message}</p>
      )}

      {/* Progress bar */}
      {progress !== undefined && (
        <div className="w-48 bg-gray-200 rounded-full h-2.5 mt-2">
          <div
            className="bg-primary h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default Loading;
