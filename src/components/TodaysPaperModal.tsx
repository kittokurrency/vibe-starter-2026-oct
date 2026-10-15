import React from 'react';
import { X, Newspaper, ArrowRight, ExternalLink } from 'lucide-react';
import { Article } from '../data/articles';

interface TodaysPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const TodaysPaperModal: React.FC<TodaysPaperModalProps> = ({
  isOpen,
  onClose,
  articles,
  onSelectArticle
}) => {
  if (!isOpen) return null;

  const sectionA = articles.filter(a => a.section === 'U.S.' || a.section === 'World');
  const sectionB = articles.filter(a => a.section === 'Business');
  const sectionC = articles.filter(a => a.section === 'Opinion');

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-2xl w-full rounded-sm shadow-2xl border border-[#ebebeb] overflow-hidden max-h-[85vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-[#ebebeb] flex items-center justify-between bg-[#fafafa]">
          <div className="flex items-center space-x-2">
            <Newspaper className="w-5 h-5 text-[#326891]" />
            <div>
              <h3 className="font-headline font-bold text-xl text-[#121212]">
                Today's Paper Replica
              </h3>
              <p className="text-[11px] text-[#727272]">
                Wednesday, October 16, 2024 • Late Edition • Vol. CLXXIV No. 60,320
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-[#727272] hover:text-[#121212]">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-6 flex-1 font-sansui">
          {/* Section A */}
          <div>
            <div className="border-b border-[#121212] pb-1 mb-3 flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-[#121212]">
                Section A: National & International News
              </span>
              <span className="text-[10px] text-[#727272]">Page A1 - A24</span>
            </div>
            <div className="space-y-2.5">
              {sectionA.map(art => (
                <div
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="flex items-start justify-between p-2 hover:bg-gray-50 rounded-xs cursor-pointer group transition"
                >
                  <div>
                    <h5 className="font-headline font-bold text-sm text-[#121212] group-hover:text-[#326891]">
                      {art.title}
                    </h5>
                    <p className="text-[11px] text-[#727272] font-summary line-clamp-1">
                      {art.summary}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-[#888] shrink-0 ml-3">
                    {art.readTime}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section B */}
          <div>
            <div className="border-b border-[#121212] pb-1 mb-3 flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-[#121212]">
                Section B: Business Day
              </span>
              <span className="text-[10px] text-[#727272]">Page B1 - B12</span>
            </div>
            <div className="space-y-2.5">
              {sectionB.map(art => (
                <div
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="flex items-start justify-between p-2 hover:bg-gray-50 rounded-xs cursor-pointer group transition"
                >
                  <div>
                    <h5 className="font-headline font-bold text-sm text-[#121212] group-hover:text-[#326891]">
                      {art.title}
                    </h5>
                    <p className="text-[11px] text-[#727272] font-summary line-clamp-1">
                      {art.summary}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-[#888] shrink-0 ml-3">
                    {art.readTime}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Section C */}
          <div>
            <div className="border-b border-[#121212] pb-1 mb-3 flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider text-[#121212]">
                Section C: Opinion & Editorial
              </span>
              <span className="text-[10px] text-[#727272]">Page C1 - C8</span>
            </div>
            <div className="space-y-2.5">
              {sectionC.map(art => (
                <div
                  key={art.id}
                  onClick={() => {
                    onSelectArticle(art);
                    onClose();
                  }}
                  className="flex items-start justify-between p-2 hover:bg-gray-50 rounded-xs cursor-pointer group transition"
                >
                  <div>
                    <h5 className="font-headline font-bold text-sm text-[#121212] group-hover:text-[#326891]">
                      {art.title}
                    </h5>
                    <p className="text-[11px] text-[#727272] font-summary line-clamp-1">
                      {art.summary}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-[#888] shrink-0 ml-3">
                    {art.readTime}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[#ebebeb] bg-[#fafafa] flex items-center justify-between text-xs">
          <span className="text-[#727272]">Print Edition Delivery Available</span>
          <button
            onClick={onClose}
            className="bg-[#121212] text-white px-4 py-1.5 font-bold uppercase tracking-wider rounded-sm text-[11px] cursor-pointer hover:bg-neutral-800"
          >
            Close Index
          </button>
        </div>
      </div>
    </div>
  );
};
