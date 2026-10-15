import React, { useState, useEffect } from 'react';
import { MainHeader } from './components/MainHeader';
import { TrendingBar } from './components/TrendingBar';
import { MainContentGrid } from './components/MainContentGrid';
import { ArticleReader } from './components/ArticleReader';
import { GamesView } from './components/GamesView';
import { CookingView } from './components/CookingView';
import { BusinessView } from './components/BusinessView';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { SearchModal } from './components/SearchModal';
import { SubscribeModal } from './components/SubscribeModal';
import { AuthModal } from './components/AuthModal';
import { TodaysPaperModal } from './components/TodaysPaperModal';
import { SavedDrawer } from './components/SavedDrawer';
import { SiteFooter } from './components/SiteFooter';
import { ARTICLES, Article, MARKET_DATA } from './data/articles';

export default function App() {
  const [currentSection, setCurrentSection] = useState<string>('Front Page');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [activeEdition, setActiveEdition] = useState<string>('U.S.');
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

  // User state
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
    <div className="min-h-screen bg-white text-[#121212] flex flex-col font-sansui">
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
    </div>
  );
}
