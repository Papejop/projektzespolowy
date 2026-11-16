import { useState } from 'react';
import CatalogTabs from './components/CatalogTabs';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import SearchHistory from './components/SearchHistory';
import ResultsGrid from './components/ResultsGrid';

interface HistoryItem {
  title: string;
  filters: Record<string, any>;
  tags: string[];
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('internal');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    { title: 'Moon', filters: { genre: 'Pop', mood: 'Happy', bpm: 60 }, tags: ['Happy', 'Pop', '60 BPM'] },
    { title: 'Beats', filters: { genre: 'Rock', mood: 'Happy', bpm: 80 }, tags: ['Happy', 'Rock', '80 BPM'] },
    { title: 'Sunrise', filters: { mood: 'Calm', length: 3 }, tags: ['Calm', 'Ambient'] },
    { title: 'Cyberpunk', filters: { genre: 'Electronic',mood:'Dark', bpm: 130 }, tags: ['Dark', '130 BPM'] },
  ]);

  const handleSearch = () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery === '' && Object.keys(activeFilters).length === 0) return;

    const newItem: HistoryItem = {
      title: trimmedQuery || 'Filtered Search',
      filters: { ...activeFilters },
      tags: Object.entries(activeFilters).map(([k, v]) => `${k}: ${v}`),
    };

    setHistoryItems((prev) => [newItem, ...prev]);
    setHasSearched(true);
  };
  const handleSelectHistoryItem = (item: HistoryItem) => {
    setSearchQuery(item.title);
    setActiveFilters(item.filters || {}); 
    setHasSearched(true);
    console.log("Przywrócono wyszukiwanie z historii:", item.title, "z filtrami:", item.filters);
  };

  const handleReset = () => {
    setHasSearched(false);
    setSearchQuery('');
    setActiveFilters({});
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white p-8 font-sans w-full ">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">Search WIP</h1>
        <CatalogTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
        <div className="mt-6">
          <SearchBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            onSearch={handleSearch} 
          />
        </div>
        <FilterBar 
          activeFilters={activeFilters} 
          setActiveFilters={setActiveFilters} 
        />
        {!hasSearched ? (
          <SearchHistory 
            historyItems={historyItems} 
            onSelectQuery={handleSelectHistoryItem} 
          />
        ) : (
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-zinc-400">
                Wyniki dla: <strong className="text-white">"{searchQuery || 'Wszystko'}"</strong> 
                {Object.keys(activeFilters).length > 0 && <span className="ml-2 text-xs text-zinc-500">(z filtrami)</span>}
              </span>
              <button 
                onClick={handleReset}
                className="text-xs bg-[#2a2a2a] hover:bg-[#333333] px-3 py-1.5 rounded-lg text-zinc-300 transition-colors cursor-pointer"
              >
                ← Wróć do historii
              </button>
            </div>
            <ResultsGrid searchQuery={searchQuery} activeFilters={activeFilters} />
          </div>
        )}
      </div>
    </div>
  );
}