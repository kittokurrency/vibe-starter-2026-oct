import React, { useState } from 'react';
import { X, User, LogOut, Check } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: string | null;
  onLogin: (email: string) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    onLogin(email.trim());
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1000);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white max-w-sm w-full rounded-sm shadow-2xl border border-[#ebebeb] p-6 sm:p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <div className="font-masthead text-xl text-[#121212]">The New York Times</div>
          <button onClick={onClose} className="p-1 text-[#727272] hover:text-[#121212]">
            <X className="w-4 h-4" />
          </button>
        </div>

        {currentUser ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 border border-[#ebebeb] rounded-xs">
              <div className="w-10 h-10 bg-[#121212] text-white rounded-full flex items-center justify-center font-bold text-sm">
                {currentUser[0].toUpperCase()}
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider block">
                  Subscriber Account
                </span>
                <p className="text-xs font-semibold text-[#121212] truncate">{currentUser}</p>
              </div>
            </div>

            <div className="border-t border-[#ebebeb] pt-4 space-y-2">
              <button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                className="w-full flex items-center justify-center space-x-2 py-2 border border-red-200 text-red-700 hover:bg-red-50 text-xs font-medium rounded-xs transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        ) : submitted ? (
          <div className="text-center py-6 space-y-2">
            <Check className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-headline font-bold text-lg text-[#121212]">Logged In</h4>
            <p className="text-xs text-[#555]">Welcome back to The Times.</p>
          </div>
        ) : (
          <div>
            <h3 className="font-headline font-bold text-xl text-[#121212] mb-1">
              Log in or create an account
            </h3>
            <p className="font-summary text-xs text-[#666] mb-5">
              Enter your email to continue reading, save articles, and customize your experience.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-bold text-[#121212] uppercase tracking-wider block mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs px-3 py-2.5 border border-[#ccc] rounded-xs focus:outline-none focus:border-[#121212] bg-white"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#121212] hover:bg-neutral-800 text-white text-xs font-bold py-2.5 rounded-sm uppercase tracking-wider transition cursor-pointer"
              >
                Continue with Email
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-[#ebebeb] text-[10.5px] text-center text-[#727272]">
              By continuing, you agree to the Terms of Service and Privacy Policy.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
