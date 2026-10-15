import React from 'react';
import { X, Bookmark, Trash2, ArrowRight } from 'lucide-react';
import { Article } from '../data/articles';

interface SavedDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  savedArticles: Article[];
  onSelectArticle: (article: Article) => void;
  onRemove: (id: string) => void;
  onClearAll: () => void;
}

export const SavedDrawer: React.FC<SavedDrawerProps> = ({
  isOpen,
  onClose,
  savedArticles,
  onSelectArticle,
  onRemove,
  onClearAll
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-[#ebebeb] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bookmark className="w-4 h-4 fill-[#121212] text-[#121212]" />
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#121212]">
              Saved For Later ({savedArticles.length})
            </h3>
          </div>
          <button onClick={onClose} className="p-1 text-[#727272] hover:text-[#121212]">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {savedArticles.length === 0 ? (
            <div className="text-center py-16 text-sm text-[#727272] font-summary">
              <Bookmark className="w-8 h-8 mx-auto mb-2 text-[#ccc]" />
              <p>You haven't saved any stories yet.</p>
              <p className="text-xs text-[#999] mt-1">
                Click the bookmark icon on any headline to read it later.
              </p>
            </div>
          ) : (
            savedArticles.map((art) => (
              <div
                key={art.id}
                className="border border-[#ebebeb] p-3 rounded-xs hover:border-[#121212] transition group"
              >
                <div className="flex items-center justify-between text-[10px] text-[#727272] uppercase tracking-wider mb-1">
                  <span>{art.section} • {art.readTime}</span>
                  <button
                    onClick={() => onRemove(art.id)}
                    className="text-[#999] hover:text-red-700 p-1 transition"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                <h4
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="font-headline font-bold text-sm text-[#121212] group-hover:text-[#326891] cursor-pointer transition line-clamp-2"
                >
                  {art.title}
                </h4>
                <p className="font-summary text-xs text-[#555] line-clamp-2 mt-1">
                  {art.summary}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {savedArticles.length > 0 && (
          <div className="p-4 border-t border-[#ebebeb] flex items-center justify-between bg-[#fafafa]">
            <button
              onClick={onClearAll}
              className="text-xs text-red-600 hover:underline cursor-pointer"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="bg-[#121212] text-white px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
