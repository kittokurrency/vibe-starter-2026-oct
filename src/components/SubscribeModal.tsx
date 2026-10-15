import React, { useState } from 'react';
import { Check, X, ShieldCheck } from 'lucide-react';

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribed: () => void;
}

export const SubscribeModal: React.FC<SubscribeModalProps> = ({
  isOpen,
  onClose,
  onSubscribed
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'weekly' | 'annual'>('weekly');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = () => {
    setIsSuccess(true);
    setTimeout(() => {
      onSubscribed();
      setIsSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-lg w-full rounded-sm shadow-2xl border border-[#ebebeb] overflow-hidden p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="font-masthead text-2xl text-[#121212]">The New York Times</div>
          <button
            onClick={onClose}
            className="p-1 text-[#727272] hover:text-[#121212] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSuccess ? (
          <div className="text-center py-8 space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="font-headline font-bold text-2xl text-[#121212]">
              Welcome to All Access!
            </h3>
            <p className="font-summary text-sm text-[#555]">
              Your subscription is active. Enjoy unlimited access across all NYT platforms.
            </p>
          </div>
        ) : (
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#326891] block mb-1">
              Limited Time Special Offer
            </span>
            <h2 className="font-headline font-black text-2xl sm:text-3xl text-[#121212] leading-tight mb-2">
              All of The Times. Just $1 a week.
            </h2>
            <p className="font-summary text-xs sm:text-sm text-[#555] mb-6">
              Invest in independent, deeply researched journalism that holds power accountable.
            </p>

            {/* Plans */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div
                onClick={() => setSelectedPlan('weekly')}
                className={`p-3.5 border rounded-sm cursor-pointer transition ${
                  selectedPlan === 'weekly'
                    ? 'border-[#121212] bg-[#fbfbfb] ring-1 ring-[#121212]'
                    : 'border-[#e2e2e2] hover:border-gray-400'
                }`}
              >
                <div className="text-[10px] uppercase font-bold tracking-wider text-[#326891] mb-1">
                  Most Popular
                </div>
                <div className="font-bold text-base text-[#121212]">$1 / week</div>
                <div className="text-[10.5px] text-[#727272]">Billed every 4 weeks for 1 yr</div>
              </div>

              <div
                onClick={() => setSelectedPlan('annual')}
                className={`p-3.5 border rounded-sm cursor-pointer transition ${
                  selectedPlan === 'annual'
                    ? 'border-[#121212] bg-[#fbfbfb] ring-1 ring-[#121212]'
                    : 'border-[#e2e2e2] hover:border-gray-400'
                }`}
              >
                <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-700 mb-1">
                  Best Value
                </div>
                <div className="font-bold text-base text-[#121212]">$50 / year</div>
                <div className="text-[10.5px] text-[#727272]">Save 15% with annual pay</div>
              </div>
            </div>

            {/* Inclusions */}
            <ul className="space-y-2 mb-6 text-xs text-[#333] font-sansui">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Unlimited news, investigations, and global reporting</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>NYT Games including The Crossword, Wordle & Spelling Bee</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>NYT Cooking with over 20,000 tested recipes</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>Independent Wirecutter reviews and The Athletic sports coverage</span>
              </li>
            </ul>

            <button
              onClick={handleSubscribe}
              className="w-full bg-[#121212] hover:bg-neutral-800 text-white font-bold text-xs py-3 rounded-sm uppercase tracking-wider transition cursor-pointer flex items-center justify-center space-x-2 shadow-xs"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Get Digital Access</span>
            </button>

            <p className="text-[10px] text-center text-[#888] mt-3">
              Cancel or pause anytime. Standard terms apply.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
