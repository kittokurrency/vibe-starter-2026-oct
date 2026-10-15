import React, { useState } from 'react';
import { MarketIndex, Article } from '../data/articles';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';

interface BusinessViewProps {
  marketData: MarketIndex[];
  articles: Article[];
  onSelectArticle: (article: Article) => void;
}

export const BusinessView: React.FC<BusinessViewProps> = ({
  marketData,
  articles,
  onSelectArticle
}) => {
  const [activeMarket, setActiveMarket] = useState(marketData[0].name);
  const businessArticles = articles.filter(
    a => a.section === 'Business' || a.id === 'boeing-factory-strike-agreement' || a.id === 'editorial-board-climate-finance'
  );

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="border-b-2 border-[#121212] pb-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#326891]">
            NYT Business Day
          </span>
          <h2 className="font-headline font-black text-3xl text-[#121212]">
            Markets & Financial Intelligence
          </h2>
          <p className="font-summary text-sm text-[#555]">
            Global market data, corporate developments, and economic policy.
          </p>
        </div>
        <div className="flex items-center space-x-1 text-xs text-[#727272]">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span>US Markets Open</span>
        </div>
      </div>

      {/* Market Cards Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
        {marketData.map((item) => (
          <div
            key={item.name}
            onClick={() => setActiveMarket(item.name)}
            className={`p-3.5 border transition cursor-pointer ${
              activeMarket === item.name
                ? 'border-[#121212] bg-[#fbfbfb] shadow-xs'
                : 'border-[#ebebeb] bg-white hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold font-sans text-[#121212]">{item.name}</span>
              {item.isPositive ? (
                <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />
              ) : (
                <TrendingDown className="w-3.5 h-3.5 text-red-700" />
              )}
            </div>
            <div className="text-base font-mono font-bold text-[#121212] tabular-nums">
              {item.value}
            </div>
            <div className={`text-[11px] font-mono tabular-nums mt-0.5 ${item.isPositive ? 'text-emerald-700 font-semibold' : 'text-red-700 font-semibold'}`}>
              {item.change} ({item.pct})
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Market Chart Simulation */}
      <div className="bg-[#fcfcfc] border border-[#ebebeb] p-5 rounded-sm mb-10">
        <div className="flex items-center justify-between mb-4 border-b border-[#ebebeb] pb-3">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-[#326891]" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#121212]">
              {activeMarket} • Today's Trading Trend
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#727272]">Delayed by 15 mins</span>
        </div>

        {/* SVG Sparkline / Graph */}
        <div className="h-44 w-full flex items-end justify-between gap-1 pt-4 px-2">
          {[35, 42, 38, 48, 55, 52, 60, 68, 64, 75, 72, 80, 84, 79, 88, 92, 89, 95].map((val, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
              <div
                className="w-full bg-[#326891] hover:bg-[#121212] rounded-t-xs transition"
                style={{ height: `${val * 1.5}px` }}
                title={`Period ${idx + 9}:00 - Index: ${val}`}
              />
              <span className="text-[8.5px] text-[#888] font-mono hidden md:inline">
                {idx % 3 === 0 ? `${idx + 9}h` : ''}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Business News Coverage */}
      <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-[#121212] border-b border-[#121212] pb-1 mb-6">
        Latest In Business & Policy
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {businessArticles.map((art) => (
          <article
            key={art.id}
            onClick={() => onSelectArticle(art)}
            className="space-y-2 cursor-pointer group"
          >
            <h4 className="font-headline font-bold text-lg leading-snug group-hover:text-[#727272] transition">
              {art.title}
            </h4>
            <p className="font-summary text-xs text-[#444] leading-relaxed line-clamp-3">
              {art.summary}
            </p>
            <div className="flex items-center space-x-2 text-[10.5px] text-[#727272]">
              <span className="font-semibold text-[#121212]">{art.byline}</span>
              <span>•</span>
              <span>{art.readTime}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
