import React, { useState, useEffect } from 'react';
import { Article } from '../data/articles';
import {
  ArrowLeft,
  Bookmark,
  Volume2,
  VolumeX,
  Share2,
  MessageSquare,
  Printer,
  ThumbsUp,
  Check,
  Gift,
  Sun,
  Moon,
  Coffee
} from 'lucide-react';

interface ArticleReaderProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  allArticles: Article[];
  isSaved: boolean;
  onToggleSave: () => void;
  onListen: () => void;
  usePressPhotos: boolean;
}

interface Comment {
  id: string;
  author: string;
  location: string;
  date: string;
  content: string;
  likes: number;
}

const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c1',
    author: 'Sarah M.',
    location: 'Boston, MA',
    date: '2 hours ago',
    content: 'This reporting underscores the profound shift occurring in executive leadership standards. The implications for institutional continuity cannot be overstated.',
    likes: 42
  },
  {
    id: 'c2',
    author: 'Robert Sterling',
    location: 'Chicago, IL',
    date: '3 hours ago',
    content: 'The contrast between the legal traditionalists and the political strategists is the defining conflict of this entire transition cycle. Outstanding analytical depth.',
    likes: 29
  },
  {
    id: 'c3',
    author: 'Elena Gomez',
    location: 'Austin, TX',
    date: '4 hours ago',
    content: 'Fascinating perspective. It will be telling to see how the Senate judiciary committees respond when formal confirmation hearings commence.',
    likes: 18
  }
];

export const ArticleReader: React.FC<ArticleReaderProps> = ({
  article,
  onBack,
  onSelectArticle,
  allArticles,
  isSaved,
  onToggleSave,
  onListen,
  usePressPhotos
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [theme, setTheme] = useState<'white' | 'sepia' | 'dark'>('white');
  const [comments, setComments] = useState<Comment[]>(INITIAL_COMMENTS);
  const [newComment, setNewComment] = useState('');
  const [newCommentName, setNewCommentName] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [likedComments, setLikedComments] = useState<Set<string>>(new Set());
  const [scrollProgress, setScrollProgress] = useState(0);

  // Web Speech Synthesis state
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Scroll depth tracking
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total > 0) {
        setScrollProgress((window.scrollY / total) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Web Speech Synthesis narration
  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) {
      onListen();
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${article.title}. ${article.summary}. ${article.body.join(' ')}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
      setIsSpeaking(true);
      onListen();
    }
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [article]);

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const added: Comment = {
      id: `c_${Date.now()}`,
      author: newCommentName.trim() || 'Times Reader',
      location: 'New York, NY',
      date: 'Just now',
      content: newComment.trim(),
      likes: 0
    };

    setComments([added, ...comments]);
    setNewComment('');
  };

  const toggleLike = (id: string) => {
    setLikedComments(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        setComments(cs => cs.map(c => c.id === id ? { ...c, likes: c.likes - 1 } : c));
      } else {
        next.add(id);
        setComments(cs => cs.map(c => c.id === id ? { ...c, likes: c.likes + 1 } : c));
      }
      return next;
    });
  };

  const relatedArticles = allArticles.filter(a => a.id !== article.id).slice(0, 3);

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-[20px] leading-[1.8]';
      case 'xlarge':
        return 'text-[23px] leading-[1.85]';
      default:
        return 'text-[17.5px] leading-[1.75]';
    }
  };

  const getThemeClass = () => {
    switch (theme) {
      case 'sepia':
        return 'bg-[#fbf7ee] text-[#2c2724]';
      case 'dark':
        return 'bg-[#121212] text-[#e0e0e0]';
      default:
        return 'bg-white text-[#121212]';
    }
  };

  const imageSrc = usePressPhotos && article.realImage ? article.realImage : article.image;

  return (
    <div className={`transition-colors duration-200 min-h-screen ${getThemeClass()}`}>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-[#121212] z-50 transition-all duration-75"
        style={{ width: `${scrollProgress}%` }}
      />

      <article className="max-w-[1280px] mx-auto px-4 pb-24">
        {/* Sticky Reader Controls Bar */}
        <div className={`sticky top-0 z-40 py-2.5 mb-8 border-b transition-colors ${
          theme === 'dark' ? 'bg-[#121212]/95 border-neutral-800' : 'bg-white/95 border-[#ebebeb]'
        }`}>
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              <button
                onClick={onBack}
                className="flex items-center space-x-1.5 font-bold uppercase tracking-wider text-[11px] hover:text-[#727272] transition cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Front Page</span>
              </button>
              <span className="text-neutral-300">|</span>
              <span className="font-bold uppercase tracking-wider text-[10.5px] text-[#727272]">
                {article.section}
              </span>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Theme Selector (Paper Mode) */}
              <div className="flex items-center border border-[#e2e2e2] rounded-sm overflow-hidden text-[10.5px]">
                <button
                  onClick={() => setTheme('white')}
                  className={`p-1 transition ${theme === 'white' ? 'bg-[#121212] text-white' : 'hover:bg-gray-100'}`}
                  title="White Paper"
                >
                  <Sun className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTheme('sepia')}
                  className={`p-1 border-l border-[#e2e2e2] transition ${theme === 'sepia' ? 'bg-[#9A3412] text-white' : 'hover:bg-gray-100'}`}
                  title="Warm Newsprint"
                >
                  <Coffee className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`p-1 border-l border-[#e2e2e2] transition ${theme === 'dark' ? 'bg-white text-black' : 'hover:bg-gray-100'}`}
                  title="Night Mode"
                >
                  <Moon className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Font Size Selector */}
              <div className="hidden sm:flex items-center border border-[#e2e2e2] rounded-sm overflow-hidden text-[11px]">
                <button
                  onClick={() => setFontSize('normal')}
                  className={`px-2 py-0.5 font-serif font-bold transition ${
                    fontSize === 'normal' ? 'bg-[#121212] text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize('large')}
                  className={`px-2 py-0.5 font-serif font-bold text-[13px] border-l border-[#e2e2e2] transition ${
                    fontSize === 'large' ? 'bg-[#121212] text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  A+
                </button>
                <button
                  onClick={() => setFontSize('xlarge')}
                  className={`px-2 py-0.5 font-serif font-bold text-[15px] border-l border-[#e2e2e2] transition ${
                    fontSize === 'xlarge' ? 'bg-[#121212] text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  A++
                </button>
              </div>

              {/* Real Web Speech Synthesis Button */}
              <button
                onClick={handleToggleSpeech}
                className={`flex items-center space-x-1 px-2.5 py-1 rounded-sm text-[11px] font-medium transition cursor-pointer ${
                  isSpeaking ? 'bg-[#326891] text-white animate-pulse' : 'bg-[#f5f5f5] hover:bg-[#ebebeb] text-[#121212]'
                }`}
                title="Listen to this article"
              >
                {isSpeaking ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#326891]" />}
                <span className="hidden sm:inline">
                  {isSpeaking ? 'Stop Reading' : `Listen (${article.readTime})`}
                </span>
              </button>

              {/* Gift Article Button */}
              <button
                onClick={() => setShowGiftModal(true)}
                className="hidden md:flex items-center space-x-1 p-1.5 rounded-sm border border-[#e2e2e2] hover:bg-gray-100 transition cursor-pointer text-[11px]"
                title="Gift this article"
              >
                <Gift className="w-3.5 h-3.5 text-emerald-700" />
                <span>Gift</span>
              </button>

              {/* Bookmark button */}
              <button
                onClick={onToggleSave}
                className={`p-1.5 rounded-sm border transition cursor-pointer ${
                  isSaved
                    ? 'bg-[#121212] text-white border-[#121212]'
                    : 'border-[#e2e2e2] hover:bg-gray-100'
                }`}
                title={isSaved ? "Remove bookmark" : "Save for later"}
              >
                <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
              </button>

              {/* Share button */}
              <button
                onClick={handleShare}
                className="p-1.5 rounded-sm border border-[#e2e2e2] hover:bg-gray-100 transition cursor-pointer"
                title="Share Article"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              </button>

              <button
                onClick={() => window.print()}
                className="hidden lg:inline-flex p-1.5 rounded-sm border border-[#e2e2e2] hover:bg-gray-100 transition cursor-pointer"
                title="Print Article"
              >
                <Printer className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Reading Frame */}
        <div className="max-w-[760px] mx-auto">
          {/* Category kicker */}
          {article.tag && (
            <span className="text-xs font-bold uppercase tracking-widest text-[#326891] block mb-2 font-sansui">
              {article.tag}
            </span>
          )}

          {/* Headline */}
          <h1 className="font-headline font-black text-3xl sm:text-4xl md:text-5xl leading-[1.15] tracking-tight mb-4 text-balance">
            {article.title}
          </h1>

          {/* Summary deck */}
          <p className="font-summary text-xl sm:text-2xl leading-snug mb-6 italic opacity-90">
            {article.summary}
          </p>

          {/* Byline and Date metadata */}
          <div className="border-t border-b border-[#ebebeb] py-3 my-6 flex flex-wrap items-center justify-between text-[12px] opacity-80 font-sansui gap-2">
            <div className="flex items-center space-x-2">
              {article.opinionAvatar && (
                <img
                  src={article.opinionAvatar}
                  alt={article.opinionAuthor || article.byline}
                  className="w-7 h-7 rounded-full object-cover"
                />
              )}
              <div>
                <span className="font-bold block sm:inline">
                  {article.byline}
                </span>
                <span className="hidden sm:inline mx-2">•</span>
                <span>{article.date}</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-[11px]">
              <span>{article.readTime}</span>
              <span>•</span>
              <a href="#comments" className="flex items-center space-x-1 hover:underline">
                <MessageSquare className="w-3 h-3" />
                <span>{comments.length} Comments</span>
              </a>
            </div>
          </div>

          {/* Lead Image */}
          {imageSrc && (
            <figure className="my-8">
              <div className="overflow-hidden bg-gray-100 border border-[#e2e2e2]">
                <img
                  src={imageSrc}
                  alt={article.caption || article.title}
                  className="w-full h-auto max-h-[480px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              {(article.caption || article.photoCredit) && (
                <figcaption className="flex justify-between items-baseline text-[11.5px] opacity-75 font-summary italic pt-2">
                  <span>{article.caption}</span>
                  <span className="not-italic text-[10px] tracking-wider uppercase opacity-80 shrink-0 ml-3 font-sansui">
                    {article.photoCredit}
                  </span>
                </figcaption>
              )}
            </figure>
          )}

          {/* Article Body */}
          <div className={`font-summary space-y-6 ${getFontSizeClass()}`}>
            {article.body.map((paragraph, idx) => {
              if (idx === 0) {
                return (
                  <p key={idx} className="drop-cap">
                    {paragraph}
                  </p>
                );
              }

              if (idx === 2 && article.pullQuote) {
                return (
                  <React.Fragment key={idx}>
                    <p>{paragraph}</p>
                    <blockquote className="my-8 py-5 border-t border-b border-current text-center px-6">
                      <p className="font-headline font-bold italic text-xl sm:text-2xl leading-snug">
                        "{article.pullQuote}"
                      </p>
                    </blockquote>
                  </React.Fragment>
                );
              }

              return <p key={idx}>{paragraph}</p>;
            })}
          </div>

          {/* Article Footnote */}
          <div className="mt-10 pt-6 border-t border-[#ebebeb] text-[11.5px] opacity-75 italic font-summary">
            A version of this article appears in print on Oct. 16, 2024, Section A, Page 1 of the New York edition with the headline: {article.title}.
          </div>

          {/* Comments Section */}
          <section id="comments" className="mt-14 pt-8 border-t-2 border-current">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-sansui font-bold text-lg flex items-center space-x-2">
                <MessageSquare className="w-5 h-5" />
                <span>Comments ({comments.length})</span>
              </h3>
              <span className="text-xs opacity-75">Reader Discussion</span>
            </div>

            {/* Comment Form */}
            <form onSubmit={handleAddComment} className="border border-[#e2e2e2] p-4 rounded-sm mb-8 bg-black/2">
              <h4 className="text-xs font-bold uppercase tracking-wider mb-3">
                Add to the Conversation
              </h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Your Name (e.g. Jane Doe, New York)"
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#d2d2d2] rounded-xs focus:outline-none focus:border-current bg-transparent"
                />
                <textarea
                  placeholder="Share your perspective on this report..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  rows={3}
                  className="w-full text-xs px-3 py-2 border border-[#d2d2d2] rounded-xs focus:outline-none focus:border-current bg-transparent resize-y"
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#121212] hover:bg-neutral-800 text-white text-[11px] font-bold px-4 py-1.5 rounded-sm uppercase tracking-wider transition cursor-pointer"
                  >
                    Submit Comment
                  </button>
                </div>
              </div>
            </form>

            {/* Comments List */}
            <div className="space-y-5">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-[#ebebeb] pb-4">
                  <div className="flex items-baseline justify-between text-xs mb-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold">{comment.author}</span>
                      <span className="opacity-75 text-[11px]">{comment.location}</span>
                    </div>
                    <span className="text-[10.5px] opacity-60">{comment.date}</span>
                  </div>
                  <p className="text-xs leading-relaxed opacity-90 font-summary mb-2">
                    {comment.content}
                  </p>
                  <div className="flex items-center space-x-4 text-[11px] opacity-75">
                    <button
                      onClick={() => toggleLike(comment.id)}
                      className={`flex items-center space-x-1 hover:opacity-100 transition cursor-pointer ${
                        likedComments.has(comment.id) ? 'text-[#326891] font-semibold' : ''
                      }`}
                    >
                      <ThumbsUp className={`w-3 h-3 ${likedComments.has(comment.id) ? 'fill-current' : ''}`} />
                      <span>Recommend ({comment.likes})</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Related Articles Footer */}
          <section className="mt-14 pt-8 border-t border-[#ebebeb]">
            <h3 className="font-sansui font-bold text-xs uppercase tracking-wider mb-4">
              More in {article.section}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    onSelectArticle(rel);
                  }}
                  className="space-y-1.5 cursor-pointer group"
                >
                  <h4 className="font-headline font-bold text-sm leading-snug group-hover:opacity-75 transition">
                    {rel.title}
                  </h4>
                  <p className="font-summary text-xs opacity-80 line-clamp-2 leading-relaxed">
                    {rel.summary}
                  </p>
                  <span className="text-[10px] opacity-60 block">{rel.readTime}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </article>

      {/* Gift Article Modal */}
      {showGiftModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowGiftModal(false)}
        >
          <div
            className="bg-white text-[#121212] max-w-sm w-full p-6 shadow-2xl rounded-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center space-x-2 text-emerald-700 mb-2">
              <Gift className="w-5 h-5" />
              <h4 className="font-bold text-sm uppercase tracking-wider">Gift This Article</h4>
            </div>
            <p className="font-summary text-xs text-[#555] mb-4">
              As a subscriber, you can share up to 10 articles each month with anyone. They can read it without a subscription.
            </p>
            <div className="bg-[#f5f5f5] p-2.5 rounded-xs text-[11px] font-mono text-[#333] truncate mb-4 select-all">
              {window.location.href}?gift=free_pass_92384
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowGiftModal(false)}
                className="text-xs text-[#727272] px-3 py-1.5"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText?.(`${window.location.href}?gift=free_pass_92384`);
                  setShowGiftModal(false);
                }}
                className="bg-[#121212] text-white text-xs font-bold px-4 py-1.5 uppercase rounded-sm"
              >
                Copy Gift Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
