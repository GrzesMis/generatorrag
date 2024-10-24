import axios from 'axios';

const API_BASE_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_URL 
  : 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchGoogle = async (keyword: string): Promise<SearchResult[]> => {
  try {
    const { data } = await api.post('/search', { keyword });
    return data.results;
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('Failed to perform search');
  }
};

export const generateArticle = async (searchResults: SearchResult[]): Promise<string> => {
  try {
    const { data } = await api.post('/article/generate', { searchResults });
    return data.article;
  } catch (error) {
    console.error('Article generation error:', error);
    throw new Error('Failed to generate article');
  }
};

export interface SearchResult {
  title: string;
  snippet: string;
  link: string;
}