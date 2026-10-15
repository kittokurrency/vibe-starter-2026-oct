import React from 'react';
import { Article } from '../data/articles';
import { Bookmark, Volume2 } from 'lucide-react';

interface MainContentGridProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onOpenSubscribe: () => void;
  onSelectSection: (section: string) => void;
  savedArticleIds: Set<string>;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onListenArticle: (article: Article, e: React.MouseEvent) => void;
}

export const MainContentGrid: React.FC<MainContentGridProps> = ({
  articles,
  onSelectArticle,
  onOpenSubscribe,
  onSelectSection,
  savedArticleIds,
  onToggleSave,
  onListenArticle
}) => {
  const leadArticle = articles.find(a => a.id === 'trump-picks-transition') || articles[0];
  const story1 = articles.find(a => a.id === 'women-leaving-trump-admin');
  const story2 = articles.find(a => a.id === 'kimberly-guilfoyle-influence');
  const story3 = articles.find(a => a.id === 'lebanon-conflict-diplomacy');
  const centerStory1 = articles.find(a => a.id === 'election-security-ai-threats');
  const centerStory2 = articles.find(a => a.id === 'boeing-factory-strike-agreement');
  const opinionBrooks = articles.find(a => a.id === 'david-brooks-civic-danger');
  const opinionFriedman = articles.find(a => a.id === 'thomas-friedman-middle-east');
  const opinionEditorial = articles.find(a => a.id === 'editorial-board-climate-finance');

  return (
    <main className="max-w-[1280px] mx-auto px-4 pb-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Column 1: Left Lead Stories (Width: 3.5 cols approx) */}
        <section className="lg:col-span-3 lg:col-divider lg:pr-5 space-y-6">
          {/* Lead Headline 1 */}
          {story1 && (
            <article className="space-y-2 group">
              <h2
                onClick={() => onSelectArticle(story1)}
                className="font-headline font-bold text-xl md:text-[22px] leading-snug tracking-tight hover:text-[#727272] cursor-pointer transition"
              >
                {story1.title}
              </h2>
              <p
                onClick={() => onSelectArticle(story1)}
                className="font-summary text-[14px] leading-relaxed text-[#333333] cursor-pointer"
              >
                {story1.summary}
              </p>
              <div className="flex items-center justify-between text-[11px] text-[#727272]">
                <div className="flex items-center space-x-2">
                  <span>{story1.readTime}</span>
                  <span>•</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectArticle(story1);
                    }}
                    className="text-[#326891] hover:underline cursor-pointer"
                  >
                    Analysis
                  </button>
                </div>
                <div className="flex items-center space-x-1.5 opacity-60 group-hover:opacity-100 transition">
                  <button
                    onClick={(e) => onListenArticle(story1, e)}
                    className="p-1 hover:text-[#121212] transition"
                    title="Listen"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => onToggleSave(story1.id, e)}
                    className="p-1 hover:text-[#121212] transition"
                    title={savedArticleIds.has(story1.id) ? "Saved" : "Save"}
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${savedArticleIds.has(story1.id) ? 'fill-[#121212] text-[#121212]' : ''}`}
                    />
                  </button>
                </div>
              </div>
            </article>
          )}

          <hr className="border-[#ebebeb]" />

          {/* Lead Headline 2 */}
          {story2 && (
            <article className="space-y-2 group">
              <h2
                onClick={() => onSelectArticle(story2)}
                className="font-headline font-bold text-lg md:text-[19px] leading-snug tracking-tight hover:text-[#727272] cursor-pointer transition"
              >
                {story2.title}
              </h2>
              <p
                onClick={() => onSelectArticle(story2)}
                className="font-summary text-[13.5px] leading-relaxed text-[#333333] cursor-pointer"
              >
                {story2.summary}
              </p>
              <div className="flex items-center justify-between text-[11px] text-[#727272]">
                <span>{story2.readTime}</span>
                <div className="flex items-center space-x-1.5 opacity-60 group-hover:opacity-100 transition">
                  <button
                    onClick={(e) => onListenArticle(story2, e)}
                    className="p-1 hover:text-[#121212] transition"
                    title="Listen"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => onToggleSave(story2.id, e)}
                    className="p-1 hover:text-[#121212] transition"
                    title={savedArticleIds.has(story2.id) ? "Saved" : "Save"}
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${savedArticleIds.has(story2.id) ? 'fill-[#121212] text-[#121212]' : ''}`}
                    />
                  </button>
                </div>
              </div>
            </article>
          )}

          <hr className="border-[#ebebeb]" />

          {/* Lead Headline 3 */}
          {story3 && (
            <article className="space-y-2 group">
              <h3
                onClick={() => onSelectArticle(story3)}
                className="font-headline font-bold text-base md:text-[17px] leading-snug tracking-tight hover:text-[#727272] cursor-pointer transition"
              >
                {story3.title}
              </h3>
              <p
                onClick={() => onSelectArticle(story3)}
                className="font-summary text-[13px] leading-relaxed text-[#444444] cursor-pointer"
              >
                {story3.summary}
              </p>
              <div className="flex items-center justify-between text-[11px] text-[#727272]">
                <span>{story3.readTime}</span>
                <div className="flex items-center space-x-1.5 opacity-60 group-hover:opacity-100 transition">
                  <button
                    onClick={(e) => onListenArticle(story3, e)}
                    className="p-1 hover:text-[#121212] transition"
                    title="Listen"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => onToggleSave(story3.id, e)}
                    className="p-1 hover:text-[#121212] transition"
                    title={savedArticleIds.has(story3.id) ? "Saved" : "Save"}
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${savedArticleIds.has(story3.id) ? 'fill-[#121212] text-[#121212]' : ''}`}
                    />
                  </button>
                </div>
              </div>
            </article>
          )}
        </section>

        {/* Column 2: Center Feature & Main Visual (Width: 6 cols) */}
        <section className="lg:col-span-6 lg:col-divider lg:pr-5 space-y-5">
          {/* Main Focal Article with Featured Image */}
          {leadArticle && (
            <article className="space-y-3 group">
              {/* Featured Lead Image from Snapshot */}
              <div
                onClick={() => onSelectArticle(leadArticle)}
                className="relative overflow-hidden bg-gray-100 cursor-pointer"
              >
                <img
                  alt="Editorial portrait coverage"
                  className="w-full h-auto object-cover max-h-[380px] select-none transition group-hover:opacity-95"
                  src={leadArticle.image || "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg"}
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex justify-between items-baseline text-[11px] text-[#727272] italic font-summary pt-1">
                <span>{leadArticle.caption}</span>
                <span className="not-italic text-[10px] tracking-widest text-[#888888] uppercase shrink-0 ml-2">
                  {leadArticle.photoCredit}
                </span>
              </div>

              {/* Headline directly beneath image */}
              <div className="space-y-2 pt-1">
                <h2
                  onClick={() => onSelectArticle(leadArticle)}
                  className="font-headline font-black text-2xl md:text-3xl leading-tight tracking-tight hover:text-[#727272] cursor-pointer transition"
                >
                  {leadArticle.title}
                </h2>
                <p
                  onClick={() => onSelectArticle(leadArticle)}
                  className="font-summary text-[15.5px] leading-relaxed text-[#222222] cursor-pointer"
                >
                  {leadArticle.summary}
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#727272] pt-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-[#121212]">{leadArticle.byline}</span>
                    <span>•</span>
                    <span>{leadArticle.readTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={(e) => onListenArticle(leadArticle, e)}
                      className="flex items-center space-x-1 text-[11px] font-medium text-[#326891] hover:underline"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </button>
                    <button
                      onClick={(e) => onToggleSave(leadArticle.id, e)}
                      className="p-1 hover:text-[#121212] transition"
                      title={savedArticleIds.has(leadArticle.id) ? "Saved" : "Save"}
                    >
                      <Bookmark
                        className={`w-3.5 h-3.5 ${savedArticleIds.has(leadArticle.id) ? 'fill-[#121212] text-[#121212]' : ''}`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          )}

          <hr className="border-[#ebebeb]" />

          {/* Secondary Center Story Row (2 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            {centerStory1 && (
              <article className="space-y-1.5 group">
                <h4
                  onClick={() => onSelectArticle(centerStory1)}
                  className="font-headline font-bold text-base leading-snug tracking-tight hover:text-[#727272] cursor-pointer transition"
                >
                  {centerStory1.title}
                </h4>
                <p
                  onClick={() => onSelectArticle(centerStory1)}
                  className="font-summary text-[13px] leading-normal text-[#444444] cursor-pointer"
                >
                  {centerStory1.summary}
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#727272]">
                  <span>{centerStory1.readTime}</span>
                  <button
                    onClick={(e) => onToggleSave(centerStory1.id, e)}
                    className="p-1 hover:text-[#121212] transition"
                  >
                    <Bookmark
                      className={`w-3 h-3 ${savedArticleIds.has(centerStory1.id) ? 'fill-[#121212] text-[#121212]' : ''}`}
                    />
                  </button>
                </div>
              </article>
            )}

            {centerStory2 && (
              <article className="space-y-1.5 group">
                <h4
                  onClick={() => onSelectArticle(centerStory2)}
                  className="font-headline font-bold text-base leading-snug tracking-tight hover:text-[#727272] cursor-pointer transition"
                >
                  {centerStory2.title}
                </h4>
                <p
                  onClick={() => onSelectArticle(centerStory2)}
                  className="font-summary text-[13px] leading-normal text-[#444444] cursor-pointer"
                >
                  {centerStory2.summary}
                </p>
                <div className="flex items-center justify-between text-[11px] text-[#727272]">
                  <span>{centerStory2.readTime}</span>
                  <button
                    onClick={(e) => onToggleSave(centerStory2.id, e)}
                    className="p-1 hover:text-[#121212] transition"
                  >
                    <Bookmark
                      className={`w-3 h-3 ${savedArticleIds.has(centerStory2.id) ? 'fill-[#121212] text-[#121212]' : ''}`}
                    />
                  </button>
                </div>
              </article>
            )}
          </div>
        </section>

        {/* Column 3: Right Opinion & Secondary Stories (Width: 3 cols) */}
        <section className="lg:col-span-3 space-y-5">
          {/* Section Header */}
          <div className="border-b border-[#121212] pb-1 flex items-center justify-between">
            <h3 className="font-sansui font-bold text-[12px] uppercase tracking-wider text-[#121212]">
              Opinion
            </h3>
            <button
              onClick={() => onSelectSection('Opinion')}
              className="text-[11px] text-[#727272] hover:text-[#121212] font-sansui cursor-pointer"
            >
              See All →
            </button>
          </div>

          {/* Opinion Piece 1 */}
          {opinionBrooks && (
            <article className="space-y-1 group">
              <span className="text-[11px] font-bold text-[#727272] uppercase tracking-wider block">
                {opinionBrooks.opinionAuthor}
              </span>
              <h4
                onClick={() => onSelectArticle(opinionBrooks)}
                className="font-headline font-bold text-[17px] leading-snug hover:text-[#727272] cursor-pointer transition"
              >
                {opinionBrooks.title}
              </h4>
              <p
                onClick={() => onSelectArticle(opinionBrooks)}
                className="font-summary text-[13px] text-[#555555] leading-normal cursor-pointer"
              >
                {opinionBrooks.summary}
              </p>
            </article>
          )}

          <hr className="border-[#ebebeb]" />

          {/* Opinion Piece 2 */}
          {opinionFriedman && (
            <article className="space-y-1 group">
              <span className="text-[11px] font-bold text-[#727272] uppercase tracking-wider block">
                {opinionFriedman.opinionAuthor}
              </span>
              <h4
                onClick={() => onSelectArticle(opinionFriedman)}
                className="font-headline font-bold text-[17px] leading-snug hover:text-[#727272] cursor-pointer transition"
              >
                {opinionFriedman.title}
              </h4>
              <p
                onClick={() => onSelectArticle(opinionFriedman)}
                className="font-summary text-[13px] text-[#555555] leading-normal cursor-pointer"
              >
                {opinionFriedman.summary}
              </p>
            </article>
          )}

          <hr className="border-[#ebebeb]" />

          {/* Opinion Piece 3 (Editorial Board) */}
          {opinionEditorial && (
            <article className="space-y-1 group">
              <span className="text-[11px] font-bold text-[#326891] uppercase tracking-wider block">
                {opinionEditorial.opinionAuthor}
              </span>
              <h4
                onClick={() => onSelectArticle(opinionEditorial)}
                className="font-headline font-bold text-[17px] leading-snug hover:text-[#727272] cursor-pointer transition"
              >
                {opinionEditorial.title}
              </h4>
              <p
                onClick={() => onSelectArticle(opinionEditorial)}
                className="font-summary text-[13px] text-[#555555] leading-normal cursor-pointer"
              >
                {opinionEditorial.summary}
              </p>
            </article>
          )}

          {/* Right Ad / Subscription Promotion Card */}
          <div className="mt-6 border border-[#ebebeb] p-4 bg-[#fbfbfb] text-center space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#727272]">
              Special Offer
            </span>
            <h5 className="font-headline font-bold text-base">
              All of The Times. $1 a week.
            </h5>
            <p className="text-[12px] font-summary text-[#555]">
              Unlimited access to News, Games, Cooking, Wirecutter and The Athletic.
            </p>
            <button
              onClick={onOpenSubscribe}
              className="w-full bg-[#121212] text-white text-[11px] font-bold py-2 uppercase tracking-wider hover:bg-neutral-800 transition cursor-pointer"
              type="button"
            >
              Get Digital Access
            </button>
          </div>
        </section>
      </div>
    </main>
  );
};
