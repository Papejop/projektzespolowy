import { useState } from 'react';
import FilterDropdown from './FilterDropdown';

export default function FilterBar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const filterCategories = [
    { label: 'Genre', type: 'dropdown', options: ['Pop', 'Rock', 'Electronic', 'Hip-Hop', 'Acoustic'] },
    { label: 'Mood', type: 'dropdown', options: ['Happy', 'Sad', 'Energetic', 'Calm', 'Dark'] },
    { label: 'Vocals', type: 'dropdown', options: ['Male', 'Female','Mixed','Instrumental'] },
    { label: 'BPM', type: 'slider', min: 60, max: 180, step: 1, unit: ' BPM' },
    { label: 'Min Length', type: 'slider', min: 0, max: 10, step: 0.5, unit: ' min' },
    { label: 'Max Length', type: 'slider', min: 0, max: 10, step: 0.5, unit: ' min' },
    { label: 'Keys', type: 'dropdown', options: ['C Major', 'A Minor', 'F# Minor', 'G Major'] },
    { label: 'Instruments', type: 'dropdown', options: ['Guitar', 'Piano', 'Synthesizer', 'Drums'] },
    { label: 'Stems', type: 'dropdown', options: ['Has Stems', 'Full Mix Only'] }
  ];

  return (
    <div className="flex items-center flex-wrap gap-3 mb-8 relative z-20">
      <button className="flex items-center space-x-2 bg-[#2a2a2a] hover:bg-[#333333] border border-zinc-700 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap text-white cursor-pointer">
        <span>All filters</span>
      </button>

      {filterCategories.map((cat, index) => (
        <FilterDropdown 
          key={index} 
          label={cat.label} 
          type={cat.type as 'dropdown' | 'slider'}
          options={cat.options}
          min={cat.min}
          max={cat.max}
          step={cat.step}
          unit={cat.unit}
          isOpen={openDropdown === cat.label}
          onToggle={() => {
            setOpenDropdown(openDropdown === cat.label ? null : cat.label);
          }}
        />
      ))}
    </div>
  );
}