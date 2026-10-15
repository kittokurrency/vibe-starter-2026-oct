import React from 'react';
import { TRENDING_TOPICS } from '../data/articles';

interface TrendingBarProps {
  onSelectTopic: (topic: string) => void;
}

export const TrendingBar: React.FC<TrendingBarProps> = ({ onSelectTopic }) => {
  return (
    <section className="max-w-[1280px] mx-auto px-4 mb-5">
      <div className="border-b border-[#ebebeb] pb-2 flex items-center text-[12px]">
        <span className="font-bold text-[#121212] mr-2 uppercase tracking-wide text-[10.5px] shrink-0 font-sansui">
          Trending:
        </span>
        <div className="flex items-center space-x-4 overflow-x-auto text-[#121212] scrollbar-none font-summary italic">
          {TRENDING_TOPICS.map((topic, index) => (
            <React.Fragment key={topic}>
              <button
                onClick={() => onSelectTopic(topic)}
                className="hover:underline whitespace-nowrap cursor-pointer text-[#121212] hover:text-[#727272] transition text-left"
              >
                {topic}
              </button>
              {index < TRENDING_TOPICS.length - 1 && (
                <span className="text-[#ebebeb] font-sans not-italic select-none">•</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
