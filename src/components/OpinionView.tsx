import React from 'react';
import { Article } from '../data/articles';

interface OpinionViewProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const OpinionView: React.FC<OpinionViewProps> = ({ articles, onSelectArticle }) => {
  const opinionArticles = articles.filter(a => a.isOpinion || a.section === 'Opinion');
  const leadOpinion = opinionArticles[0];

  const columnists = [
    {
      name: "David Brooks",
      role: "Culture, Politics & Society",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      latest: "The Real Danger We Face Isn't What You Expect"
    },
    {
      name: "Thomas L. Friedman",
      role: "Foreign Affairs & Global Geopolitics",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
      latest: "A Critical Turning Point for the Middle East"
    },
    {
      name: "The Editorial Board",
      role: "The Institutional Voice of The Times",
      avatar: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=150&q=80",
      latest: "Why Climate Finance Can No Longer Be Deferred"
    },
    {
      name: "Maureen Dowd",
      role: "American Politics & Satire",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      latest: "The Whispers Echoing in West Wing Corridors"
    }
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="border-b-2 border-[#121212] pb-4 mb-8">
        <span className="text-[11px] font-bold uppercase tracking-widest text-[#326891]">
          The New York Times Opinion
        </span>
        <h2 className="font-headline font-black text-3xl sm:text-4xl text-[#121212]">
          Guest Essays, Columnists & The Editorial Board
        </h2>
        <p className="font-summary text-sm text-[#555]">
          A diversity of voices and perspectives on the defining debates of our era.
        </p>
      </div>

      {/* Columnist Profiles Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 pb-8 border-b border-[#ebebeb]">
        {columnists.map(col => (
          <div
            key={col.name}
            onClick={() => {
              const match = articles.find(a => a.opinionAuthor === col.name);
              if (match) onSelectArticle(match);
            }}
            className="p-3 border border-[#ebebeb] hover:border-[#121212] transition cursor-pointer text-center space-y-2 bg-white group"
          >
            <img
              src={col.avatar}
              alt={col.name}
              className="w-16 h-16 rounded-full mx-auto object-cover grayscale group-hover:grayscale-0 transition duration-300"
            />
            <div>
              <h4 className="font-headline font-bold text-base text-[#121212] group-hover:text-[#326891] transition">
                {col.name}
              </h4>
              <p className="text-[10.5px] text-[#727272] line-clamp-1">{col.role}</p>
            </div>
            <p className="font-summary text-xs text-[#444] italic line-clamp-2 pt-1 border-t border-[#f0f0f0]">
              "{col.latest}"
            </p>
          </div>
        ))}
      </div>

      {/* Main Opinion Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 8 cols: Featured Essays */}
        <div className="lg:col-span-8 space-y-6 lg:border-r border-[#ebebeb] lg:pr-8">
          {opinionArticles.map((art) => (
            <article
              key={art.id}
              onClick={() => onSelectArticle(art)}
              className="space-y-2 group cursor-pointer border-b border-[#ebebeb] pb-6"
            >
              <div className="flex items-center space-x-2">
                {art.opinionAvatar && (
                  <img
                    src={art.opinionAvatar}
                    alt={art.opinionAuthor || ''}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#727272]">
                  {art.opinionAuthor || 'Guest Essay'}
                </span>
                {art.opinionAuthorTitle && (
                  <>
                    <span className="text-[#ccc]">•</span>
                    <span className="text-[10.5px] text-[#888]">{art.opinionAuthorTitle}</span>
                  </>
                )}
              </div>
              <h3 className="font-headline font-black text-2xl text-[#121212] group-hover:text-[#727272] transition leading-snug">
                {art.title}
              </h3>
              <p className="font-summary text-base text-[#333] leading-relaxed">
                {art.summary}
              </p>
              <div className="text-[11px] text-[#727272] flex items-center space-x-2 pt-1">
                <span>{art.readTime}</span>
                <span>•</span>
                <span>{art.commentsCount} Comments</span>
              </div>
            </article>
          ))}
        </div>

        {/* Right 4 cols: Letters to the Editor & Guest Forum */}
        <div className="lg:col-span-4 space-y-6">
          <div className="border border-[#ebebeb] p-5 bg-[#fbfbfb] space-y-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#121212] border-b border-[#121212] pb-1">
              Letters to the Editor
            </h4>
            <div className="space-y-3 text-xs font-summary">
              <div>
                <p className="text-[#333] italic leading-relaxed">
                  "The discussion of civic engagement cannot ignore the role of public libraries in preserving community dialogue..."
                </p>
                <span className="text-[10.5px] text-[#727272] block mt-1 font-sans">
                  — Katherine Vance, Seattle
                </span>
              </div>
              <hr className="border-[#ebebeb]" />
              <div>
                <p className="text-[#333] italic leading-relaxed">
                  "Climate finance must prioritize distributed clean energy micro-grids rather than bureaucratic multinational trusts..."
                </p>
                <span className="text-[10.5px] text-[#727272] block mt-1 font-sans">
                  — Marcus Webb, Oxford
                </span>
              </div>
            </div>
            <button
              onClick={() => alert("Submit a letter to letters@nytimes.com with your name, address, and phone number.")}
              className="text-[11px] text-[#326891] hover:underline font-sans font-semibold block cursor-pointer"
            >
              How to Submit a Letter →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
