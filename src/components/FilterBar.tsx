import { useState } from 'react';
import FilterDropdown from './FilterDropdown';

interface FilterBarProps {
  activeFilters: Record<string, any>;
  setActiveFilters: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

export default function FilterBar({ activeFilters, setActiveFilters }: FilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const filterCategories = [
    { label: 'Genre', key: 'genre', type: 'dropdown', options: ['Pop', 'Rock', 'Electronic', 'Hip-Hop', 'Acoustic'] },
    { label: 'Mood', key: 'mood', type: 'dropdown', options: ['Happy', 'Sad', 'Energetic', 'Calm', 'Dark'] },
    { label: 'Vocals', key: 'vocals', type: 'dropdown', options: ['Has Vocals', 'Instrumental', 'Male', 'Female'] },
    { label: 'BPM', key: 'bpm', type: 'slider', min: 60, max: 180, step: 1, unit: ' BPM' },
    { label: 'Min Length', key: 'minLength', type: 'slider', min: 0, max: 10, step: 0.5, unit: ' min' },
    { label: 'Max Length', key: 'maxLength', type: 'slider', min: 0, max: 10, step: 0.5, unit: ' min' },
    { label: 'Keys', key: 'key', type: 'dropdown', options: ['C Major', 'A Minor', 'F# Minor', 'G Major'] },
    { label: 'Instruments', key: 'instruments', type: 'dropdown', options: ['Guitar', 'Piano', 'Synthesizer', 'Drums'] },
    { label: 'Stems', key: 'stems', type: 'dropdown', options: ['Has Stems', 'Full Mix Only'] }
  ];

  // Funkcja aktualizująca konkretny filtr
  const handleFilterChange = (key: string, value: any) => {
    setActiveFilters((prev) => {
      if (value === null) {
        const updated = { ...prev };
        delete updated[key];
        return updated;
      }
      return { ...prev, [key]: value };
    });
  };

  return (
    <div className="flex items-center flex-wrap gap-3 mb-8 relative z-20">
      <button className="flex items-center space-x-2 bg-[#2a2a2a] hover:bg-[#333333] border border-zinc-700 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap text-white cursor-pointer">
        <span>⚙️</span>
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
          // Przekazujemy aktualnie wybraną wartość z App.tsx do dropdownu
          selectedValue={activeFilters[cat.key] ?? null}
          onChange={(val) => handleFilterChange(cat.key, val)}
          isOpen={openDropdown === cat.label}
          onToggle={() => {
            setOpenDropdown(openDropdown === cat.label ? null : cat.label);
          }}
        />
      ))}
    </div>
  );
}