interface ResultsGridProps {
  searchQuery: string;
  activeFilters: Record<string, any>;
}

export default function ResultsGrid({ searchQuery, activeFilters }: ResultsGridProps) {
  // Tutaj w przyszłości trafi fetch do backendu RAG bazujący na: searchQuery i activeFilters
  console.log("Backend query payload ->", { searchQuery, activeFilters });

  const results = [
    { id: 1, title: 'Midnight Echoes', genre: 'Electronic', bpm: 120, duration: '3:45', author: 'SoundLab' },
    { id: 2, title: 'Lo-Fi Chill Sunset', genre: 'Acoustic', bpm: 85, duration: '2:30', author: 'CoffeeBeats' },
    { id: 3, title: 'Cyberpunk Chase', genre: 'Electronic', bpm: 135, duration: '4:10', author: 'NeonPulse' },
    { id: 4, title: 'Acoustic Morning', genre: 'Pop', bpm: 95, duration: '3:15', author: 'WarmStrings' },
  ];

  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4 text-zinc-200">Search Results</h2>
      
      {/* Pionowa lista elementów */}
      <div className="flex flex-col space-y-3">
        {results.map((song) => (
          <div 
            key={song.id}
            className="bg-[#1a1a1a] border border-zinc-800 hover:border-zinc-600 px-5 py-3.5 rounded-xl transition-all cursor-pointer flex items-center justify-between"
          >
            <div className="flex items-center space-x-4 min-w-0 pr-4">
              <div className="w-10 h-10 rounded-lg bg-[#2a2a2a] flex items-center justify-center text-zinc-400 shrink-0">
                🎵
              </div>
              <div className="min-w-0">
                <h3 className="font-semibold text-white text-sm truncate">{song.title}</h3>
                <p className="text-xs text-zinc-400 truncate mt-0.5">{song.author}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-xs bg-[#2a2a2a] text-zinc-300 px-2.5 py-1 rounded-md hidden sm:inline-block">
                {song.genre}
              </span>
              <span className="text-xs bg-[#2a2a2a] text-zinc-300 px-2.5 py-1 rounded-md hidden sm:inline-block">
                {song.bpm} BPM
              </span>
              <span className="text-xs text-zinc-400 font-mono px-2 py-1">
                {song.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}