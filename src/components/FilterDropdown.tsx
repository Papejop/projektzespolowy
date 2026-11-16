import { useState } from 'react';

interface FilterDropdownProps {
  label: string;
  type?: 'dropdown' | 'slider';
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FilterDropdown({ 
  label, 
  type = 'dropdown', 
  options = [], 
  min = 0, 
  max = 100, 
  step = 1, 
  unit = '', 
  isOpen, 
  onToggle 
}: FilterDropdownProps) {
  
  const [selectedValue, setSelectedValue] = useState<string | number | null>(null);

  const handleSelect = (option: string) => {
    setSelectedValue(option);
    onToggle();
    console.log(`Wybrano filtr [${label}]:`, option);
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setSelectedValue(val);
    console.log(`Zmieniono suwak [${label}]:`, val);
  };

  const getButtonLabel = () => {
    if (selectedValue === null) return label;
    return `${label}: ${selectedValue}${unit}`;
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={onToggle}
        className={`flex items-center space-x-1 px-4 py-2 rounded-full text-sm transition-colors whitespace-nowrap border cursor-pointer ${
          selectedValue !== null 
            ? 'bg-[#2a2a2a] text-white border-zinc-500' 
            : 'bg-[#1a1a1a] text-zinc-300 border-zinc-800 hover:border-zinc-600'
        }`}
      >
        <span>{getButtonLabel()}</span>
        <span className="text-xs text-zinc-500">▼</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-56 bg-[#181818] border border-zinc-600 rounded-xl shadow-2xl z-[9999] p-3">
          {type === 'slider' ? (
            <div className="space-y-3 py-2">
              <div className="flex justify-between text-xs text-zinc-400">
                <span>{min}{unit}</span>
                <span className="text-white font-medium">
                  {selectedValue !== null ? selectedValue : min}{unit}
                </span>
                <span>{max}{unit}</span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={selectedValue !== null ? selectedValue : min}
                onChange={handleSliderChange}
                className="w-full accent-white cursor-pointer bg-zinc-700 h-1.5 rounded-lg"
              />
            </div>
          ) : (
            <div className="py-1">
              {options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`w-full text-left px-3 py-2 text-sm text-zinc-300 hover:bg-[#252525] hover:text-white transition-colors rounded cursor-pointer ${
                    selectedValue === option ? 'bg-[#252525] text-white font-medium' : ''
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        {selectedValue !== null && (
            <button
            onClick={() => { setSelectedValue(null); onToggle(); }}
            className="w-full text-left px-2 py-1 mb-2 text-xs text-zinc-400 hover:text-white hover:bg-[#252525] rounded border-t border-zinc-800 cursor-pointer"
            >
            Clear filter
            </button>
        )}
        </div>
      )}
    </div>
  );
}