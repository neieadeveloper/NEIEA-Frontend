import React from "react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = "md", 
  className 
}) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6", 
    lg: "h-8 w-8"
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
          sizeClasses[size]
        )}
      />
    </div>
  );
};

interface SectionLoaderProps {
  className?: string;
}

const SectionLoader: React.FC<SectionLoaderProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-center py-8", className)}>
      <div className="flex flex-col items-center space-y-4">
        <LoadingSpinner size="lg" />
        <p className="text-sm text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export { LoadingSpinner, SectionLoader };
