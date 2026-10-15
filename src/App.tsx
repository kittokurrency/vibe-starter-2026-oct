import React, { useState, useEffect } from 'react';
import { MainHeader } from './components/MainHeader';
import { TrendingBar } from './components/TrendingBar';
import { MainContentGrid } from './components/MainContentGrid';
import { ArticleReader } from './components/ArticleReader';
import { GamesView } from './components/GamesView';
import { CookingView } from './components/CookingView';
import { BusinessView } from './components/BusinessView';
import { OpinionView } from './components/OpinionView';
import { AudioView } from './components/AudioView';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { SearchModal } from './components/SearchModal';
import { SubscribeModal } from './components/SubscribeModal';
import { AuthModal } from './components/AuthModal';
import { TodaysPaperModal } from './components/TodaysPaperModal';
import { SavedDrawer } from './components/SavedDrawer';
import { SiteFooter } from './components/SiteFooter';
import { ARTICLES, Article, MARKET_DATA } from './data/articles';
import { Keyboard, X } from 'lucide-react';

export default function App() {
  const [currentSection, setCurrentSection] = useState<string>('Front Page');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeEdition, setActiveEdition] = useState<string>('U.S.');
  const [usePressPhotos, setUsePressPhotos] = useState<boolean>(false);
  const [showShortcutsModal, setShowShortcutsModal] = useState<boolean>(false);

  const [savedArticleIds, setSavedArticleIds] = useState<Set<string>>(() => {
    try {
      const stored = localStorage.getItem('nyt_saved_articles');
      return stored ? new Set(JSON.parse(stored)) : new Set();
    } catch {
      return new Set();
    }
  });
  const [activeAudioArticle, setActiveAudioArticle] = useState<Article | null>(null);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSubscribeOpen, setIsSubscribeOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isTodaysPaperOpen, setIsTodaysPaperOpen] = useState(false);
  const [isSavedDrawerOpen, setIsSavedDrawerOpen] = useState(false);

  // User session
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    try {
      return localStorage.getItem('nyt_user_email');
    } catch {
      return null;
    }
  });
  const [isSubscribed, setIsSubscribed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('nyt_subscribed') === 'true';
    } catch {
      return false;
    }
  });

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        return;
      }

      if (e.key === '/') {
        e.preventDefault();
        setIsSearchOpen(true);
      } else if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShowShortcutsModal(prev => !prev);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsSubscribeOpen(false);
        setIsAuthOpen(false);
        setIsTodaysPaperOpen(false);
        setIsSavedDrawerOpen(false);
        setShowShortcutsModal(false);
        if (selectedArticle) setSelectedArticle(null);
      } else if (e.key === 'f' || e.key === 'F') {
        setSelectedArticle(null);
        setCurrentSection('Front Page');
      } else if (e.key === 'g' || e.key === 'G') {
        setSelectedArticle(null);
        setCurrentSection('Games');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedArticle]);

  // Save articles to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('nyt_saved_articles', JSON.stringify(Array.from(savedArticleIds)));
    } catch (e) {
      console.error(e);
    }
  }, [savedArticleIds]);

  const toggleSaveArticle = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSavedArticleIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleListenArticle = (article: Article, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveAudioArticle(article);
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticle(article);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSection = (section: string) => {
    setCurrentSection(section);
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTrendingTopic = (topic: string) => {
    const matching = ARTICLES.find(a =>
      a.title.toLowerCase().includes(topic.toLowerCase().slice(0, 15)) ||
      a.summary.toLowerCase().includes(topic.toLowerCase().slice(0, 15))
    );
    if (matching) {
      handleSelectArticle(matching);
    } else {
      setIsSearchOpen(true);
    }
  };

  const handleLogin = (email: string) => {
    setUserEmail(email);
    try {
      localStorage.setItem('nyt_user_email', email);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogout = () => {
    setUserEmail(null);
    try {
      localStorage.removeItem('nyt_user_email');
    } catch (e) {
      console.error(e);
    }
  };

  const handleSubscribed = () => {
    setIsSubscribed(true);
    try {
      localStorage.setItem('nyt_subscribed', 'true');
    } catch (e) {
      console.error(e);
    }
  };

  const savedArticlesList = ARTICLES.filter(a => savedArticleIds.has(a.id));

  // Determine which articles to display for front page or section filter
  const displayedArticles = currentSection === 'Front Page' || currentSection === 'U.S.'
    ? ARTICLES
    : ARTICLES.filter(a => a.section === currentSection || currentSection === 'All');

  return (
    <div className="min-h-screen bg-white text-[#121212] flex flex-col font-sansui antialiased">
      {/* Subscriber confirmation banner if active */}
      {isSubscribed && (
        <div className="bg-[#121212] text-white text-xs py-1.5 px-4 text-center tracking-wider uppercase font-semibold">
          All Access Subscription Active • Thank you for supporting independent journalism
        </div>
      )}

      {/* Main NYT Header */}
      <MainHeader
        currentSection={currentSection}
        onSelectSection={handleSelectSection}
        activeEdition={activeEdition}
        onSelectEdition={setActiveEdition}
        marketData={MARKET_DATA}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSubscribe={() => setIsSubscribeOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenTodaysPaper={() => setIsTodaysPaperOpen(true)}
        onOpenSaved={() => setIsSavedDrawerOpen(true)}
        savedCount={savedArticleIds.size}
        userEmail={userEmail}
        usePressPhotos={usePressPhotos}
        onTogglePhotos={() => setUsePressPhotos(!usePressPhotos)}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {selectedArticle ? (
          <ArticleReader
            article={selectedArticle}
            onBack={() => setSelectedArticle(null)}
            onSelectArticle={handleSelectArticle}
            allArticles={ARTICLES}
            isSaved={savedArticleIds.has(selectedArticle.id)}
            onToggleSave={() => toggleSaveArticle(selectedArticle.id)}
            onListen={() => handleListenArticle(selectedArticle)}
            usePressPhotos={usePressPhotos}
          />
        ) : currentSection === 'Games' ? (
          <GamesView onBackToFrontPage={() => handleSelectSection('Front Page')} />
        ) : currentSection === 'Cooking' ? (
          <CookingView />
        ) : currentSection === 'Business' ? (
          <BusinessView
            marketData={MARKET_DATA}
            articles={ARTICLES}
            onSelectArticle={handleSelectArticle}
          />
        ) : currentSection === 'Opinion' ? (
          <OpinionView
            articles={ARTICLES}
            onSelectArticle={handleSelectArticle}
          />
        ) : currentSection === 'Audio' ? (
          <AudioView
            articles={ARTICLES}
            onPlayArticle={handleListenArticle}
          />
        ) : (
          <>
            <TrendingBar onSelectTopic={handleTrendingTopic} />
            <MainContentGrid
              articles={displayedArticles}
              onSelectArticle={handleSelectArticle}
              onOpenSubscribe={() => setIsSubscribeOpen(true)}
              onSelectSection={handleSelectSection}
              savedArticleIds={savedArticleIds}
              onToggleSave={toggleSaveArticle}
              onListenArticle={handleListenArticle}
              usePressPhotos={usePressPhotos}
            />
          </>
        )}
      </div>

      {/* Footer */}
      <SiteFooter onSelectSection={handleSelectSection} />

      {/* Floating Audio Player */}
      {activeAudioArticle && (
        <AudioPlayerBar
          article={activeAudioArticle}
          onClose={() => setActiveAudioArticle(null)}
        />
      )}

      {/* Modals and Overlays */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={ARTICLES}
        onSelectArticle={handleSelectArticle}
      />

      <SubscribeModal
        isOpen={isSubscribeOpen}
        onClose={() => setIsSubscribeOpen(false)}
        onSubscribed={handleSubscribed}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={userEmail}
        onLogin={handleLogin}
        onLogout={handleLogout}
      />

      <TodaysPaperModal
        isOpen={isTodaysPaperOpen}
        onClose={() => setIsTodaysPaperOpen(false)}
        articles={ARTICLES}
        onSelectArticle={handleSelectArticle}
      />

      <SavedDrawer
        isOpen={isSavedDrawerOpen}
        onClose={() => setIsSavedDrawerOpen(false)}
        savedArticles={savedArticlesList}
        onSelectArticle={handleSelectArticle}
        onRemove={(id) => toggleSaveArticle(id)}
        onClearAll={() => setSavedArticleIds(new Set())}
      />

      {/* Keyboard Shortcuts Floating Affordance & Modal */}
      <div className="fixed bottom-3 right-3 z-40 hidden md:block">
        <button
          onClick={() => setShowShortcutsModal(true)}
          className="bg-white/90 hover:bg-white text-neutral-600 hover:text-black border border-neutral-300 p-2 rounded-full shadow-md transition cursor-pointer"
          title="Press ? for keyboard shortcuts"
        >
          <Keyboard className="w-4 h-4" />
        </button>
      </div>

      {showShortcutsModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setShowShortcutsModal(false)}
        >
          <div
            className="bg-white max-w-sm w-full p-6 shadow-2xl rounded-sm text-[#121212]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#ebebeb] pb-3 mb-4">
              <span className="font-bold text-xs uppercase tracking-wider text-[#121212]">
                Keyboard Shortcuts
              </span>
              <button
                onClick={() => setShowShortcutsModal(false)}
                className="text-[#727272] hover:text-[#121212]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between">
                <span>Search articles</span>
                <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded font-mono">/</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Return to Front Page</span>
                <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded font-mono">f</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Play NYT Games</span>
                <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded font-mono">g</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Close modal / Esc reader</span>
                <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded font-mono">Esc</kbd>
              </div>
              <div className="flex items-center justify-between">
                <span>Toggle shortcuts cheat-sheet</span>
                <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded font-mono">?</kbd>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
