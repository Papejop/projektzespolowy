interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
}

export default function SearchBar({ searchQuery, setSearchQuery, onSearch }: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="relative mb-6">
      <input
        type="text"
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search"
        className="w-full bg-[#1a1a1a] border border-zinc-700 text-white placeholder-zinc-500 pl-4 pr-14 py-3.5 rounded-xl focus:outline-none focus:border-zinc-500 transition-colors"
      />
      
      <button
        onClick={onSearch}
        className="absolute inset-y-2 right-2 px-3.5 bg-[#2a2a2a] hover:bg-[#333333] text-zinc-300 hover:text-white rounded-lg transition-colors flex items-center justify-center border border-zinc-700/50"
        title="Search"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor" 
          strokeWidth={2}
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
          />
        </svg>
      </button>
    </div>
  );
}