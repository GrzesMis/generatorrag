import React from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import { SearchResult } from '../utils/api';

interface SearchResultsProps {
  results: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  if (results.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Search Results</h2>
      <div className="space-y-4">
        {results.map((result, index) => (
          <div 
            key={index}
            className="flex flex-col gap-2 p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-900">{result.title}</h3>
                <p className="text-gray-700 mt-1">{result.snippet}</p>
              </div>
            </div>
            <a 
              href={result.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              View Source
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;