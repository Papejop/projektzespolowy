interface CatalogTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
// ✓

export default function CatalogTabs({ activeTab, setActiveTab }: CatalogTabsProps) {
  return (
    <div className="flex space-x-2 bg-[#1a1a1a] p-1 rounded-full w-fit border border-zinc-800">
      <button
        onClick={() => setActiveTab('internal')}
        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
          activeTab === 'internal' ? 'bg-[#2a2a2a] text-white shadow' : 'text-zinc-400 hover:text-white'
        }`}
      >
        Internal catalog
      </button>
      <button
        onClick={() => setActiveTab('songistry')}
        className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
          activeTab === 'songistry' ? 'bg-[#2a2a2a] text-white shadow' : 'text-zinc-400 hover:text-white'
        }`}
      >
        All songistry
      </button>
    </div>
  );
}