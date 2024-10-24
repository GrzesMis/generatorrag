import React from 'react';

interface GeneratedArticleProps {
  article: string;
}

const GeneratedArticle: React.FC<GeneratedArticleProps> = ({ article }) => {
  if (!article) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Generated Article</h2>
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="prose prose-blue max-w-none">
          {article.split('\n').map((paragraph, index) => (
            paragraph.startsWith('#') ? (
              <h3 key={index} className="text-xl font-semibold mb-4">
                {paragraph.replace('# ', '')}
              </h3>
            ) : paragraph.startsWith('- ') ? (
              <li key={index} className="ml-4">{paragraph.substring(2)}</li>
            ) : paragraph ? (
              <p key={index} className="mb-4">{paragraph}</p>
            ) : null
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneratedArticle;