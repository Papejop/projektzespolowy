import { useState } from 'react';
import CatalogTabs from './components/CatalogTabs';
import SearchBar from './components/SearchBar';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('internal');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const handleSearch = () => {
    console.log("Szukana fraza:", searchQuery);
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
      </div>

    </div>
  );
}