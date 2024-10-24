import React, { KeyboardEvent } from 'react';
import { Search } from 'lucide-react';

interface KeywordInputProps {
  keyword: string;
  setKeyword: (keyword: string) => void;
  onSearch: () => void;
}

const KeywordInput: React.FC<KeywordInputProps> = ({ keyword, setKeyword, onSearch }) => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-grow">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a topic to generate an article about..."
          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
      </div>
      <button
        onClick={onSearch}
        disabled={!keyword.trim()}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Generate
      </button>
    </div>
  );
};

export default KeywordInput;