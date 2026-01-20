import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface Option {
    value: string;
    label: string;
}

interface CustomSelectProps {
    value: string;
    onChange: (value: string) => void;
    options: Option[] | string[];
    placeholder?: string;
    error?: string;
    className?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
    value,
    onChange,
    options,
    placeholder = "Select...",
    error,
    className = "",
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    // Helper to normalize options
    const normalizedOptions = options.map((opt) =>
        typeof opt === "string" ? { value: opt, label: opt } : opt
    );

    const selectedLabel = normalizedOptions.find((opt) => opt.value === value)?.label;

    return (
        <div ref={containerRef} className={`relative w-full ${className}`}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex items-center justify-between rounded-md border bg-white px-3 py-2 text-base md:text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
          ${error ? "border-red-500" : "border-input"}
          ${isOpen ? "ring-2 ring-ring ring-offset-2" : ""}
        `}
            >
               <div className="flex items-center justify-between w-full">
                 <span className={`block truncate ${!value ? "text-muted-foreground" : "text-foreground"}`}>
                    {selectedLabel || placeholder}
                </span>
                <ChevronDown className={`h-4 w-4 opacity-50 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
               </div>
            </button>

            {isOpen && (
                <div className="z-[999999] mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {normalizedOptions.length === 0 ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            No options available
                        </div>
                    ) : (
                        normalizedOptions.map((opt) => (
                            <div
                                key={opt.value}
                                onClick={() => handleSelect(opt.value)}
                                className={`relative cursor-pointer select-none py-2 pl-3 pr-9 hover:bg-gray-100 ${value === opt.value ? "bg-gray-100 font-medium text-ngo-color4" : "text-gray-900"
                                    }`}
                            >
                                <span className="block truncate">{opt.label}</span>
                                {value === opt.value && (
                                    <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-ngo-color4">
                                        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </span>
                                )}
                            </div>
                        ))
                    )}
                </div>
            )}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>
    );
};

export default CustomSelect;
