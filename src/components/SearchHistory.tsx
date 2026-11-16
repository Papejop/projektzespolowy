interface HistoryItem {
  title: string;
  filters: Record<string, any>;
  tags: string[];
}

interface SearchHistoryProps {
  historyItems: HistoryItem[];
  onSelectQuery: (item: HistoryItem) => void;
}

export default function SearchHistory({ historyItems, onSelectQuery }: SearchHistoryProps) {
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-zinc-200">Search history</h2>
        <button className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer">
          View all
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {historyItems.map((item, index) => (
          <div
            key={index}
            onClick={() => onSelectQuery(item)}
            className="bg-[#1a1a1a] border border-zinc-800 hover:border-zinc-600 p-4 rounded-xl transition-all cursor-pointer flex flex-col justify-between h-32 group"
          >
            <div className="flex items-center space-x-2">
              <span className="text-zinc-400 group-hover:text-white transition-colors">🔍</span>
              <span className="font-semibold text-white text-base">{item.title}</span>
            </div>

            <div className="flex flex-wrap gap-1 text-[11px] text-zinc-400">
              {item.tags.map((tag, tagIndex) => (
                <span key={tagIndex}>
                  {tag}{tagIndex < item.tags.length - 1 ? ' • ' : ''}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}