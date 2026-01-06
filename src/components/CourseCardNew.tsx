import React from "react";
import { Clock, BookOpen, Users, IndianRupee, GraduationCap, ArrowRight } from "lucide-react";

export interface CourseCardProps {
  title: string;
  description: string;
  duration?: string;
  imageUrl?: string;
  level?: string;
  targetAudience?: string[];
  fees?: number;
  isNew?: boolean;
  onApply?: () => void;
  children?: React.ReactNode;
}

const CourseCard: React.FC<CourseCardProps> = ({
  title,
  description,
  duration,
  imageUrl,
  level,
  targetAudience,
  fees,
  isNew,
  onApply,
  children,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-full w-full max-w-md mx-auto">
      {/* Course Image - Fixed Height */}
      <div className="relative h-32 bg-gradient-to-br from-[#994263] to-[#7a3450] overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <BookOpen className="h-16 w-16 text-white opacity-80" />
          </div>
        )}
        {isNew && (
          <div className="absolute top-0 left-0">
            <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              • NEW COURSE
            </span>
          </div>
        )}
        {fees === 0 && (
          <div className="absolute top-4 right-4">
            <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Free
            </span>
          </div>
        )}
      </div>

      {/* Course Content - Flex-Grow and Clamped Text */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-600 text-xs mb-3 line-clamp-2 flex-grow">
          {description || "No description provided."}
        </p>

        {/* Course Details */}
        <div className="space-y-2 mb-4">
          {duration && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Clock className="h-3 w-3 text-[#994263]" />
              <span className="font-medium">Duration:</span>
              <span>{duration}</span>
            </div>
          )}
          {level && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <GraduationCap className="h-3 w-3 text-[#994263]" />
              <span className="font-medium">Level:</span>
              <span className="capitalize">{level}</span>
            </div>
          )}
          {targetAudience && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Users className="h-3 w-3 text-[#994263]" />
              <span className="font-medium">Target:</span>
              <span className="line-clamp-1">{targetAudience[0] || "All learners"}</span>
            </div>
          )}
          {fees !== undefined && (
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <IndianRupee className="h-3 w-3 text-[#994263]" />
              <span className="font-medium">Fees:</span>
              <span>₹{fees}</span>
            </div>
          )}
        </div>

        {/* Apply Button - Fixed at Bottom */}
        {onApply && (
          <button
            onClick={onApply}
            className="w-full bg-[#994263] text-white py-2 px-3 rounded-lg font-medium hover:bg-[#7a3450] transition-colors duration-300 flex items-center justify-center gap-2 group mt-auto text-sm"
          >
            Apply Now
            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
          </button>
        )}
        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
};

export default CourseCard;
