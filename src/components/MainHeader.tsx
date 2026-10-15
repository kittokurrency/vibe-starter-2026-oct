import React from 'react';
import { Search, Bookmark } from 'lucide-react';
import { MarketIndex } from '../data/articles';

interface MainHeaderProps {
  currentSection: string;
  onSelectSection: (section: string) => void;
  activeEdition: string;
  onSelectEdition: (edition: string) => void;
  marketData: MarketIndex[];
  onOpenSearch: () => void;
  onOpenSubscribe: () => void;
  onOpenAuth: () => void;
  onOpenTodaysPaper: () => void;
  onOpenSaved: () => void;
  savedCount: number;
  userEmail?: string | null;
}

const SECTIONS = [
  'U.S.',
  'World',
  'Business',
  'Arts',
  'Lifestyle',
  'Opinion',
  'Audio',
  'Games',
  'Cooking',
  'Wirecutter',
  'The Athletic'
];

const EDITIONS = ['U.S.', 'INTERNATIONAL', 'CANADA', 'ESPAÑOL', '中文'];

export const MainHeader: React.FC<MainHeaderProps> = ({
  currentSection,
  onSelectSection,
  activeEdition,
  onSelectEdition,
  marketData,
  onOpenSearch,
  onOpenSubscribe,
  onOpenAuth,
  onOpenTodaysPaper,
  onOpenSaved,
  savedCount,
  userEmail
}) => {
  return (
    <header className="max-w-[1280px] mx-auto px-4 pt-2">
      {/* Top Utility Bar: Search, Language Editions, Action Buttons */}
      <div className="flex items-center justify-between text-[11px] pb-2 border-b border-[#ebebeb]">
        {/* Search and Language Options */}
        <div className="flex items-center space-x-4">
          {/* Search icon button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search"
            className="flex items-center space-x-1 text-[#121212] hover:text-[#727272] transition cursor-pointer"
            type="button"
          >
            <Search className="w-3.5 h-3.5" strokeWidth={2.5} />
            <span className="font-bold uppercase tracking-wider text-[10px] hidden sm:inline">Search</span>
          </button>

          {/* Edition selectors */}
          <div className="flex items-center space-x-2.5 tracking-tight font-sansui">
            {EDITIONS.map((edition) => (
              <button
                key={edition}
                onClick={() => onSelectEdition(edition)}
                className={`transition cursor-pointer ${
                  activeEdition === edition
                    ? 'font-bold text-[#121212] underline underline-offset-2'
                    : 'text-[#727272] hover:text-[#121212]'
                }`}
              >
                {edition}
              </button>
            ))}
          </div>
        </div>

        {/* Subscription and Login Call to Actions */}
        <div className="flex items-center space-x-2.5">
          {savedCount > 0 && (
            <button
              onClick={onOpenSaved}
              className="flex items-center space-x-1 text-[11px] font-medium text-[#121212] hover:text-[#326891] px-2 py-1 rounded transition"
              title="Saved Articles"
            >
              <Bookmark className="w-3.5 h-3.5 fill-[#121212]" />
              <span className="hidden md:inline font-mono text-[10px] bg-[#ebebeb] px-1.5 py-0.2 rounded-full">
                {savedCount}
              </span>
            </button>
          )}

          <button
            onClick={onOpenSubscribe}
            className="bg-[#326891] hover:bg-[#254f6e] text-white text-[10.5px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider transition cursor-pointer shadow-xs"
            type="button"
          >
            Subscribe for $1/week
          </button>

          <button
            onClick={onOpenAuth}
            className="bg-[#ededed] hover:bg-[#e0e0e0] text-[#121212] text-[10.5px] font-bold px-3 py-1.5 rounded-sm uppercase tracking-wider transition cursor-pointer"
            type="button"
          >
            {userEmail ? 'Account' : 'Log In'}
          </button>
        </div>
      </div>

      {/* Date, Today's Paper, and Market Stats */}
      <div className="flex items-center justify-between text-[11px] py-2 text-[#727272] font-sansui">
        <div>
          <span className="font-bold text-[#121212]">Wednesday, October 16, 2024</span>
          <span className="mx-1.5">|</span>
          <button
            onClick={onOpenTodaysPaper}
            className="hover:underline font-medium text-[#121212] cursor-pointer"
          >
            Today’s Paper
          </button>
        </div>
        <div className="hidden md:flex items-center space-x-3 text-[11px] tabular-nums font-mono">
          {marketData.slice(0, 2).map((market) => (
            <span key={market.name} className="flex items-center gap-1">
              <strong className="text-[#121212] font-sans font-semibold">{market.name}</strong>
              <span className="text-[#333]">{market.pct}</span>
              <span className={market.isPositive ? 'text-emerald-700' : 'text-red-700'}>
                {market.isPositive ? '▲' : '▼'}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Iconic NYT Masthead */}
      <div className="text-center py-2 md:py-3.5">
        <button
          onClick={() => onSelectSection('Front Page')}
          className="inline-block text-[#121212] hover:opacity-90 transition cursor-pointer focus:outline-none"
        >
          <h1 className="font-masthead text-4xl sm:text-5xl md:text-6xl lg:text-[76px] leading-tight select-none">
            The New York Times
          </h1>
        </button>
      </div>

      {/* Primary Editorial Navigation Bar */}
      <nav className="border-t border-b border-[#121212] py-1.5 mt-1">
        <ul className="flex flex-wrap items-center justify-center gap-x-4 md:gap-x-6 text-[12px] font-medium tracking-tight text-[#121212] overflow-x-auto whitespace-nowrap">
          {SECTIONS.map((section) => (
            <li key={section}>
              <button
                onClick={() => onSelectSection(section)}
                className={`py-0.5 transition cursor-pointer hover:underline ${
                  currentSection === section
                    ? 'font-bold underline underline-offset-4'
                    : 'text-[#121212]'
                }`}
              >
                {section}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sub-navigation / Double Bottom Divider Line */}
      <div className="border-b border-[#ebebeb] pb-1 mb-4" />
    </header>
  );
};
