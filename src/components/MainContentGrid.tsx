import React from 'react';
import { Article, MOST_READ_ARTICLES } from '../data/articles';
import { Bookmark, Volume2, ArrowRight } from 'lucide-react';

interface MainContentGridProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onOpenSubscribe: () => void;
  onSelectSection: (section: string) => void;
  savedArticleIds: Set<string>;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onListenArticle: (article: Article, e: React.MouseEvent) => void;
  usePressPhotos: boolean;
}

export const MainContentGrid: React.FC<MainContentGridProps> = ({
  articles,
  onSelectArticle,
  onOpenSubscribe,
  onSelectSection,
  savedArticleIds,
  onToggleSave,
  onListenArticle,
  usePressPhotos
}) => {
  const leadArticle = articles.find(a => a.id === 'trump-picks-transition') || articles[0];
  const story1 = articles.find(a => a.id === 'women-leaving-trump-admin');
  const story2 = articles.find(a => a.id === 'kimberly-guilfoyle-influence');
  const story3 = articles.find(a => a.id === 'lebanon-conflict-diplomacy');
  const centerStory1 = articles.find(a => a.id === 'election-security-ai-threats');
  const centerStory2 = articles.find(a => a.id === 'boeing-factory-strike-agreement');
  const morningBriefing = articles.find(a => a.id === 'the-morning-briefing');
  const opinionBrooks = articles.find(a => a.id === 'david-brooks-civic-danger');
  const opinionFriedman = articles.find(a => a.id === 'thomas-friedman-middle-east');
  const opinionEditorial = articles.find(a => a.id === 'editorial-board-climate-finance');

  const getImageSrc = (art: Article) => {
    if (usePressPhotos && art.realImage) {
      return art.realImage;
    }
    return art.image || "https://www.gstatic.com/labs-code/stitch/stitch-placeholder-300x300.svg";
  };

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
                className="font-headline font-bold text-xl md:text-[22px] leading-snug tracking-tight hover:text-[#727272] cursor-pointer transition text-balance"
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
                    className="p-1 hover:text-[#121212] transition cursor-pointer"
                    title="Listen"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => onToggleSave(story1.id, e)}
                    className="p-1 hover:text-[#121212] transition cursor-pointer"
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
                className="font-headline font-bold text-lg md:text-[19px] leading-snug tracking-tight hover:text-[#727272] cursor-pointer transition text-balance"
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
                    className="p-1 hover:text-[#121212] transition cursor-pointer"
                    title="Listen"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => onToggleSave(story2.id, e)}
                    className="p-1 hover:text-[#121212] transition cursor-pointer"
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
                className="font-headline font-bold text-base md:text-[17px] leading-snug tracking-tight hover:text-[#727272] cursor-pointer transition text-balance"
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
                    className="p-1 hover:text-[#121212] transition cursor-pointer"
                    title="Listen"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={(e) => onToggleSave(story3.id, e)}
                    className="p-1 hover:text-[#121212] transition cursor-pointer"
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

          {/* Bonus Pro Feature: The Morning Briefing Box */}
          {morningBriefing && (
            <>
              <hr className="border-[#ebebeb]" />
              <div
                onClick={() => onSelectArticle(morningBriefing)}
                className="bg-[#fafafa] p-3.5 border border-[#ebebeb] space-y-1.5 cursor-pointer hover:border-[#121212] transition"
              >
                <div className="flex items-center justify-between text-[10px] uppercase font-bold tracking-wider text-[#326891]">
                  <span>The Morning Newsletter</span>
                  <span className="text-[#888]">Daily Brief</span>
                </div>
                <h4 className="font-headline font-bold text-sm leading-snug text-[#121212]">
                  {morningBriefing.title}
                </h4>
                <p className="font-summary text-xs text-[#555] line-clamp-2">
                  {morningBriefing.summary}
                </p>
              </div>
            </>
          )}
        </section>

        {/* Column 2: Center Feature & Main Visual (Width: 6 cols) */}
        <section className="lg:col-span-6 lg:col-divider lg:pr-5 space-y-5">
          {/* Main Focal Article with Featured Image */}
          {leadArticle && (
            <article className="space-y-3 group">
              {/* Featured Lead Image */}
              <div
                onClick={() => onSelectArticle(leadArticle)}
                className="relative overflow-hidden bg-gray-100 cursor-pointer"
              >
                <img
                  alt="Editorial portrait coverage"
                  className="w-full h-auto object-cover max-h-[380px] select-none transition group-hover:scale-101 duration-300"
                  src={getImageSrc(leadArticle)}
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
                  className="font-headline font-black text-2xl md:text-3xl leading-tight tracking-tight hover:text-[#727272] cursor-pointer transition text-balance"
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
                      className="flex items-center space-x-1 text-[11px] font-medium text-[#326891] hover:underline cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </button>
                    <button
                      onClick={(e) => onToggleSave(leadArticle.id, e)}
                      className="p-1 hover:text-[#121212] transition cursor-pointer"
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
                {usePressPhotos && centerStory1.image && (
                  <div
                    onClick={() => onSelectArticle(centerStory1)}
                    className="aspect-[16/9] overflow-hidden bg-gray-100 cursor-pointer mb-2"
                  >
                    <img
                      src={centerStory1.image}
                      alt={centerStory1.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition duration-300"
                    />
                  </div>
                )}
                <h4
                  onClick={() => onSelectArticle(centerStory1)}
                  className="font-headline font-bold text-base leading-snug tracking-tight hover:text-[#727272] cursor-pointer transition text-balance"
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
                    className="p-1 hover:text-[#121212] transition cursor-pointer"
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
                {usePressPhotos && centerStory2.image && (
                  <div
                    onClick={() => onSelectArticle(centerStory2)}
                    className="aspect-[16/9] overflow-hidden bg-gray-100 cursor-pointer mb-2"
                  >
                    <img
                      src={centerStory2.image}
                      alt={centerStory2.title}
                      className="w-full h-full object-cover group-hover:scale-103 transition duration-300"
                    />
                  </div>
                )}
                <h4
                  onClick={() => onSelectArticle(centerStory2)}
                  className="font-headline font-bold text-base leading-snug tracking-tight hover:text-[#727272] cursor-pointer transition text-balance"
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
                    className="p-1 hover:text-[#121212] transition cursor-pointer"
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
            <article className="space-y-1.5 group">
              <div className="flex items-center space-x-2">
                {opinionBrooks.opinionAvatar && (
                  <img
                    src={opinionBrooks.opinionAvatar}
                    alt={opinionBrooks.opinionAuthor}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                )}
                <span className="text-[11px] font-bold text-[#727272] uppercase tracking-wider block">
                  {opinionBrooks.opinionAuthor}
                </span>
              </div>
              <h4
                onClick={() => onSelectArticle(opinionBrooks)}
                className="font-headline font-bold text-[17px] leading-snug hover:text-[#727272] cursor-pointer transition text-balance"
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
            <article className="space-y-1.5 group">
              <div className="flex items-center space-x-2">
                {opinionFriedman.opinionAvatar && (
                  <img
                    src={opinionFriedman.opinionAvatar}
                    alt={opinionFriedman.opinionAuthor}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                )}
                <span className="text-[11px] font-bold text-[#727272] uppercase tracking-wider block">
                  {opinionFriedman.opinionAuthor}
                </span>
              </div>
              <h4
                onClick={() => onSelectArticle(opinionFriedman)}
                className="font-headline font-bold text-[17px] leading-snug hover:text-[#727272] cursor-pointer transition text-balance"
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
            <article className="space-y-1.5 group">
              <span className="text-[11px] font-bold text-[#326891] uppercase tracking-wider block">
                {opinionEditorial.opinionAuthor}
              </span>
              <h4
                onClick={() => onSelectArticle(opinionEditorial)}
                className="font-headline font-bold text-[17px] leading-snug hover:text-[#727272] cursor-pointer transition text-balance"
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

          {/* Special Offer Subscription Card */}
          <div className="mt-6 border border-[#ebebeb] p-4 bg-[#fbfbfb] text-center space-y-2">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#727272]">
              Special Offer
            </span>
            <h5 className="font-headline font-bold text-base text-[#121212]">
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

          {/* Pro Feature: NYT Most Read Leaderboard */}
          <div className="mt-8 border-t-2 border-[#121212] pt-4">
            <h4 className="font-sansui font-bold text-[12px] uppercase tracking-wider text-[#121212] mb-3">
              Most Popular
            </h4>
            <ol className="space-y-3">
              {MOST_READ_ARTICLES.map((headline, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    const found = articles.find(a => headline.includes(a.title.slice(0, 15)));
                    if (found) onSelectArticle(found);
                  }}
                  className="flex items-baseline space-x-3 cursor-pointer group"
                >
                  <span className="font-serif text-lg font-bold text-[#727272] tabular-nums shrink-0 w-4">
                    {idx + 1}
                  </span>
                  <p className="font-headline text-xs font-semibold text-[#121212] group-hover:text-[#326891] transition leading-snug">
                    {headline}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </main>
  );
};
