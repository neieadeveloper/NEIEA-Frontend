import React from 'react';

interface CharacterCounterProps {
  current: number;
  max: number;
  min?: number;
  className?: string;
}

export const CharacterCounter: React.FC<CharacterCounterProps> = ({
  current,
  max,
  min,
  className = 'text-xs text-gray-500 mt-1'
}) => {
  const isOverLimit = current > max;
  const isUnderMin = min !== undefined && current < min;
  const isWarning = current > max * 0.9; // Show warning at 90% of max

  const getTextColor = () => {
    if (isOverLimit) return 'text-red-600';
    if (isUnderMin) return 'text-yellow-600';
    if (isWarning) return 'text-orange-600';
    return 'text-gray-500';
  };

  return (
    <p className={`${className} ${getTextColor()}`}>
      {current}/{max} characters
      {min !== undefined && (
        <span className="ml-1">
          {isUnderMin && `(Min: ${min})`}
        </span>
      )}
    </p>
  );
};

