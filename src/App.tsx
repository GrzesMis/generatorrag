import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import KeywordInput from './components/KeywordInput';
import SearchResults from './components/SearchResults';
import GeneratedArticle from './components/GeneratedArticle';
import { searchGoogle, generateArticle, SearchResult } from './utils/api';

function App() {
  const [keyword, setKeyword] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [generatedArticle, setGeneratedArticle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => {
    if (!keyword.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const results = await searchGoogle(keyword);
      setSearchResults(results);
      const article = await generateArticle(results);
      setGeneratedArticle(article);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">RAG Article Generator</h1>
          <p className="text-gray-600">Generate AI-powered articles from search results</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6 mb-4">
          <KeywordInput 
            keyword={keyword} 
            setKeyword={setKeyword} 
            onSearch={handleSearch} 
          />
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2 text-red-700">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">{error}</p>
              </div>
            </div>
          )}
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Search className="animate-spin h-8 w-8 text-blue-500" />
            </div>
          ) : (
            <>
              <SearchResults results={searchResults} />
              <GeneratedArticle article={generatedArticle} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;