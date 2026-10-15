import React, { useState } from 'react';
import { Play, Pause, Headphones, Radio, Mic, Clock, Share2, Bookmark } from 'lucide-react';
import { PODCAST_EPISODE, Article } from '../data/articles';

interface AudioViewProps {
  onPlayArticle: (article: Article) => void;
  articles: Article[];
}

export const AudioView: React.FC<AudioViewProps> = ({ onPlayArticle, articles }) => {
  const [isPlayingMain, setIsPlayingMain] = useState(false);
  const [audioProgress, setAudioProgress] = useState(32);

  const podcastEpisodes = [
    {
      id: 'ep1',
      title: 'The Daily: Behind the Transition Legal Counsel Battle',
      duration: '26 mins',
      date: 'Today • Oct 16',
      summary: 'Inside discussions with Maggie Haberman and Jonathan Swan on how judicial nominees are being evaluated.',
      host: 'Michael Barbaro'
    },
    {
      id: 'ep2',
      title: 'The Daily: Can the Middle East Border Truce Hold?',
      duration: '24 mins',
      date: 'Yesterday • Oct 15',
      summary: 'Foreign correspondent Vivian Yee reports from Beirut on cross-border diplomacy and European mediation.',
      host: 'Sabrina Tavernise'
    },
    {
      id: 'ep3',
      title: 'Hard Fork: The AI Threats Inside Election Infrastructure',
      duration: '48 mins',
      date: 'Oct 14',
      summary: 'Kevin Roose and Casey Newton unpack real-time deepfake robocall defenses deployed by state election workers.',
      host: 'Kevin Roose & Casey Newton'
    }
  ];

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      {/* Header */}
      <div className="border-b-2 border-[#121212] pb-4 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#326891] flex items-center space-x-1.5">
            <Radio className="w-3.5 h-3.5" />
            <span>NYT Audio & Podcasts</span>
          </span>
          <h2 className="font-headline font-black text-3xl sm:text-4xl text-[#121212]">
            The Daily, Serial Productions & Narrated Articles
          </h2>
          <p className="font-summary text-sm text-[#555]">
            Listen to journalism that explains the moment, narrated by Times reporters.
          </p>
        </div>
      </div>

      {/* Featured Podcast Hero */}
      <div className="bg-[#121212] text-white p-6 sm:p-8 rounded-sm mb-12 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 flex justify-center">
            <div className="w-48 h-48 bg-neutral-900 border border-neutral-700 rounded-sm flex flex-col items-center justify-center p-4 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
              <Headphones className="w-12 h-12 text-[#ffda00] mb-2 z-20" />
              <span className="font-masthead text-2xl text-white z-20">The Daily</span>
              <span className="text-[10px] text-neutral-400 uppercase tracking-widest z-20">New York Times</span>
            </div>
          </div>

          <div className="md:col-span-8 space-y-3">
            <span className="text-[10.5px] uppercase font-bold tracking-widest text-[#ffda00]">
              Featured Episode • {PODCAST_EPISODE.date}
            </span>
            <h3 className="font-headline font-black text-2xl sm:text-3xl text-white">
              {PODCAST_EPISODE.title}
            </h3>
            <p className="font-summary text-sm text-neutral-300 leading-relaxed">
              {PODCAST_EPISODE.summary}
            </p>
            <span className="text-xs text-neutral-400 block">
              Hosted by {PODCAST_EPISODE.host}
            </span>

            {/* Play Button + Scrubber */}
            <div className="pt-2 flex items-center space-x-4">
              <button
                onClick={() => setIsPlayingMain(!isPlayingMain)}
                className="bg-white text-black px-5 py-2.5 rounded-sm font-bold text-xs uppercase tracking-wider flex items-center space-x-2 hover:bg-neutral-200 transition cursor-pointer"
              >
                {isPlayingMain ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                <span>{isPlayingMain ? 'Pause Episode' : 'Play Episode'}</span>
              </button>
              <span className="text-xs text-neutral-400 font-mono">
                {PODCAST_EPISODE.duration}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Recent Podcast Episodes & Narrated Articles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Episodes Column */}
        <div className="lg:col-span-7 space-y-6">
          <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-[#121212] border-b border-[#121212] pb-1">
            Recent Podcast Episodes
          </h3>
          <div className="space-y-4">
            {podcastEpisodes.map(ep => (
              <div
                key={ep.id}
                className="p-4 border border-[#ebebeb] hover:border-[#121212] transition bg-white space-y-2 group"
              >
                <div className="flex items-center justify-between text-[11px] text-[#727272]">
                  <span className="font-bold text-[#326891]">{ep.date}</span>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>{ep.duration}</span>
                  </div>
                </div>
                <h4 className="font-headline font-bold text-lg text-[#121212] group-hover:text-[#326891] transition">
                  {ep.title}
                </h4>
                <p className="font-summary text-xs text-[#555] leading-relaxed">
                  {ep.summary}
                </p>
                <span className="text-[11px] text-[#888] block">Hosted by {ep.host}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Narrated Articles Column */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="font-sans font-bold text-xs uppercase tracking-wider text-[#121212] border-b border-[#121212] pb-1">
            Narrated Articles You Can Listen To
          </h3>
          <div className="space-y-4">
            {articles.slice(0, 4).map(art => (
              <div
                key={art.id}
                onClick={() => onPlayArticle(art)}
                className="p-3.5 border border-[#ebebeb] hover:border-[#121212] bg-[#fcfcfc] transition cursor-pointer group flex items-start justify-between gap-3"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#727272] block mb-1">
                    {art.section} • {art.readTime}
                  </span>
                  <h5 className="font-headline font-bold text-sm text-[#121212] group-hover:text-[#326891] transition leading-snug">
                    {art.title}
                  </h5>
                  <p className="font-summary text-[11px] text-[#666] line-clamp-1 mt-1">
                    {art.summary}
                  </p>
                </div>
                <button
                  className="w-8 h-8 rounded-full bg-white border border-[#e2e2e2] flex items-center justify-center shrink-0 group-hover:bg-[#121212] group-hover:text-white transition shadow-xs"
                  title="Listen"
                >
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
