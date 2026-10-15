import React from 'react';

interface SiteFooterProps {
  onSelectSection: (section: string) => void;
}

export const SiteFooter: React.FC<SiteFooterProps> = ({ onSelectSection }) => {
  return (
    <footer className="border-t-2 border-[#121212] max-w-[1280px] mx-auto px-4 py-8 text-[11.5px] text-[#727272]">
      {/* Footer Masthead & Brand */}
      <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-[#ebebeb] gap-4">
        <button
          onClick={() => onSelectSection('Front Page')}
          className="font-masthead text-2xl text-[#121212] select-none hover:opacity-80 transition cursor-pointer"
        >
          The New York Times
        </button>
        <div className="flex flex-wrap items-center gap-4 text-[#121212] font-medium font-sansui">
          <button onClick={() => onSelectSection('U.S.')} className="hover:underline cursor-pointer">
            NEWS
          </button>
          <button onClick={() => onSelectSection('Opinion')} className="hover:underline cursor-pointer">
            OPINION
          </button>
          <button onClick={() => onSelectSection('Arts')} className="hover:underline cursor-pointer">
            ARTS
          </button>
          <button onClick={() => onSelectSection('Lifestyle')} className="hover:underline cursor-pointer">
            LIVING
          </button>
          <button onClick={() => onSelectSection('Games')} className="hover:underline cursor-pointer">
            LISTINGS &amp; MORE
          </button>
        </div>
      </div>

      {/* Copyright and Legal Links */}
      <div className="pt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-sansui">
        <span>© 2024 The New York Times Company</span>
        <button className="hover:underline text-[#727272] cursor-pointer">NYTCo</button>
        <button className="hover:underline text-[#727272] cursor-pointer">Contact Us</button>
        <button className="hover:underline text-[#727272] cursor-pointer">Accessibility</button>
        <button className="hover:underline text-[#727272] cursor-pointer">Work with us</button>
        <button className="hover:underline text-[#727272] cursor-pointer">Advertise</button>
        <button className="hover:underline text-[#727272] cursor-pointer">T Brand Studio</button>
        <button className="hover:underline text-[#727272] cursor-pointer">Your Ad Choices</button>
        <button className="hover:underline text-[#727272] cursor-pointer">Privacy Policy</button>
        <button className="hover:underline text-[#727272] cursor-pointer">Terms of Service</button>
        <button className="hover:underline text-[#727272] cursor-pointer">Site Map</button>
      </div>
    </footer>
  );
};
