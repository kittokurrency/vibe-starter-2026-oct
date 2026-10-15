import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Article } from '../data/articles';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle
}) => {
  const [query, setQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedSection('All');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sections = ['All', 'U.S.', 'World', 'Business', 'Opinion', 'Cooking', 'Wirecutter'];

  const filtered = articles.filter(a => {
    const matchesSection = selectedSection === 'All' || a.section === selectedSection;
    const q = query.toLowerCase().trim();
    if (!q) return matchesSection;
    const matchesText =
      a.title.toLowerCase().includes(q) ||
      a.summary.toLowerCase().includes(q) ||
      a.byline.toLowerCase().includes(q) ||
      a.body.some(b => b.toLowerCase().includes(q));
    return matchesSection && matchesText;
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-2xl w-full rounded-sm shadow-2xl border border-[#ebebeb] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#ebebeb] flex items-center space-x-3">
          <Search className="w-5 h-5 text-[#727272]" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search The New York Times..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-base font-sansui placeholder-gray-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-[#727272] hover:text-[#121212] px-2 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-[#727272] hover:text-[#121212] rounded-xs"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Filters */}
        <div className="px-4 py-2 border-b border-[#ebebeb] bg-[#fafafa] flex items-center space-x-2 overflow-x-auto text-xs">
          <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#727272] shrink-0">
            Section:
          </span>
          {sections.map(sec => (
            <button
              key={sec}
              onClick={() => setSelectedSection(sec)}
              className={`px-2.5 py-1 rounded-xs transition whitespace-nowrap cursor-pointer ${
                selectedSection === sec
                  ? 'bg-[#121212] text-white font-medium'
                  : 'text-[#555] hover:text-[#121212]'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 overflow-y-auto space-y-4 flex-1">
          {filtered.length === 0 ? (
            <div className="text-center py-10 text-sm text-[#727272] font-summary">
              No matching articles found for "{query}".
            </div>
          ) : (
            filtered.map((art) => (
              <div
                key={art.id}
                onClick={() => {
                  onSelectArticle(art);
                  onClose();
                }}
                className="group cursor-pointer border-b border-[#f0f0f0] pb-3 hover:bg-gray-50/80 p-2 rounded-xs transition"
              >
                <div className="flex items-center space-x-2 text-[10.5px] text-[#727272] uppercase tracking-wider mb-1">
                  <span className="font-bold text-[#326891]">{art.section}</span>
                  <span>•</span>
                  <span>{art.readTime}</span>
                </div>
                <h4 className="font-headline font-bold text-base text-[#121212] group-hover:text-[#326891] transition flex items-center justify-between">
                  <span>{art.title}</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition shrink-0 ml-2" />
                </h4>
                <p className="font-summary text-xs text-[#555] line-clamp-2 mt-1">
                  {art.summary}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
