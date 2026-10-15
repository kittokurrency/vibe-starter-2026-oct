import React, { useState, useEffect } from 'react';
import { Trophy, RotateCcw, HelpCircle, CheckCircle, Clock } from 'lucide-react';

interface CrosswordCell {
  row: number;
  col: number;
  answer: string;
  number?: number;
  isBlack?: boolean;
}

const SOLUTION = [
  ['N', 'Y', 'T', 'I', 'M'],
  ['E', 'A', 'R', 'T', 'H'],
  ['W', 'R', 'I', 'T', 'E'],
  ['S', 'N', 'A', 'P', 'S'],
  ['T', 'Y', 'P', 'E', 'S']
];

const CLUES_ACROSS = [
  { num: 1, clue: "Iconic initials of this paper + 'IM' (The Times)", answer: "NYTIM" },
  { num: 2, clue: "Third rock from the sun", answer: "EARTH" },
  { num: 3, clue: "Put pen to paper", answer: "WRITE" },
  { num: 4, clue: "Quick photographs or sudden sounds", answer: "SNAPS" },
  { num: 5, clue: "Press fonts or categories", answer: "TYPES" }
];

const CLUES_DOWN = [
  { num: 1, clue: "Fresh journalistic reports or headlines", answer: "NEWST" },
  { num: 2, clue: "Long threads for knitting", answer: "YARNY" },
  { num: 3, clue: "Three-person musical group (abbr)", answer: "TRIP" },
  { num: 4, clue: "Small state in central US (abbr)", answer: "ITTPE" },
  { num: 5, clue: "Broadsheet newspapers and presses", answer: "MHESS" }
];

export const GamesView: React.FC<{ onBackToFrontPage: () => void }> = ({ onBackToFrontPage }) => {
  const [grid, setGrid] = useState<string[][]>([
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
  ]);
  const [activeCell, setActiveCell] = useState<{ row: number; col: number }>({ row: 0, col: 0 });
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  const [seconds, setSeconds] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  const handleCellClick = (r: number, c: number) => {
    if (activeCell.row === r && activeCell.col === c) {
      setDirection(d => d === 'across' ? 'down' : 'across');
    } else {
      setActiveCell({ row: r, col: c });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, r: number, c: number) => {
    if (e.key === 'Backspace') {
      const newGrid = [...grid.map(row => [...row])];
      newGrid[r][c] = '';
      setGrid(newGrid);
      if (direction === 'across' && c > 0) {
        setActiveCell({ row: r, col: c - 1 });
      } else if (direction === 'down' && r > 0) {
        setActiveCell({ row: r - 1, col: c });
      }
      return;
    }

    if (e.key === 'ArrowRight' && c < 4) setActiveCell({ row: r, col: c + 1 });
    if (e.key === 'ArrowLeft' && c > 0) setActiveCell({ row: r, col: c - 1 });
    if (e.key === 'ArrowDown' && r < 4) setActiveCell({ row: r + 1, col: c });
    if (e.key === 'ArrowUp' && r > 0) setActiveCell({ row: r - 1, col: c });

    if (/^[a-zA-Z]$/.test(e.key)) {
      const letter = e.key.toUpperCase();
      const newGrid = [...grid.map(row => [...row])];
      newGrid[r][c] = letter;
      setGrid(newGrid);

      // Advance cursor
      if (direction === 'across' && c < 4) {
        setActiveCell({ row: r, col: c + 1 });
      } else if (direction === 'down' && r < 4) {
        setActiveCell({ row: r + 1, col: c });
      }

      // Check win condition
      checkWin(newGrid);
    }
  };

  const checkWin = (currentGrid: string[][]) => {
    let allFilled = true;
    let allCorrect = true;

    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (!currentGrid[r][c]) allFilled = false;
        if (currentGrid[r][c] !== SOLUTION[r][c]) allCorrect = false;
      }
    }

    if (allFilled && allCorrect) {
      setIsCompleted(true);
      setMessage("Congratulations! You solved The Mini!");
    }
  };

  const checkPuzzle = () => {
    let hasMistake = false;
    for (let r = 0; r < 5; r++) {
      for (let c = 0; c < 5; c++) {
        if (grid[r][c] && grid[r][c] !== SOLUTION[r][c]) {
          hasMistake = true;
        }
      }
    }
    if (hasMistake) {
      setMessage("There are some incorrect letters highlighted in your grid.");
    } else {
      setMessage("All filled letters are currently correct. Keep going!");
    }
    setTimeout(() => setMessage(null), 3500);
  };

  const revealLetter = () => {
    const { row, col } = activeCell;
    const newGrid = [...grid.map(r => [...r])];
    newGrid[row][col] = SOLUTION[row][col];
    setGrid(newGrid);
    checkWin(newGrid);
  };

  const resetPuzzle = () => {
    setGrid([
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', '']
    ]);
    setSeconds(0);
    setIsCompleted(false);
    setMessage(null);
  };

  const formatTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-[1280px] mx-auto px-4 py-6">
      {/* Games Header */}
      <div className="border-b-2 border-[#121212] pb-4 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#326891]">
            NYT Games Collection
          </span>
          <h2 className="font-headline font-black text-3xl text-[#121212]">
            The Mini Crossword
          </h2>
          <p className="font-summary text-sm text-[#555]">
            Wednesday, October 16, 2024 • Edited by Will Shortz
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5 font-mono text-base font-bold bg-[#f5f5f5] px-3 py-1.5 rounded-sm border border-[#e2e2e2]">
            <Clock className="w-4 h-4 text-[#727272]" />
            <span>{formatTime(seconds)}</span>
          </div>
          <button
            onClick={resetPuzzle}
            className="flex items-center space-x-1 text-xs text-[#727272] hover:text-[#121212] p-1.5 border border-[#e2e2e2] rounded-sm transition cursor-pointer"
            title="Reset Grid"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-4 p-3 bg-neutral-900 text-white text-xs font-medium rounded-sm flex items-center justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage(null)} className="underline cursor-pointer">Dismiss</button>
        </div>
      )}

      {isCompleted && (
        <div className="mb-6 p-6 bg-emerald-50 border border-emerald-200 rounded-sm text-center space-y-2">
          <Trophy className="w-8 h-8 text-emerald-600 mx-auto" />
          <h3 className="font-headline font-bold text-2xl text-emerald-900">
            Puzzle Solved in {formatTime(seconds)}!
          </h3>
          <p className="font-summary text-sm text-emerald-800">
            You completed today's Mini Crossword edition.
          </p>
          <button
            onClick={onBackToFrontPage}
            className="mt-3 bg-[#121212] text-white text-xs font-bold px-4 py-2 uppercase tracking-wider rounded-sm cursor-pointer hover:bg-neutral-800"
          >
            Return to Front Page
          </button>
        </div>
      )}

      {/* Crossword Grid + Clues Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Crossword 5x5 Grid */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="border-2 border-[#121212] bg-[#121212] p-0.5 inline-block shadow-sm">
            <div className="grid grid-cols-5 gap-0.5 bg-[#121212]">
              {grid.map((row, rIdx) =>
                row.map((cellValue, cIdx) => {
                  const isSelected = activeCell.row === rIdx && activeCell.col === cIdx;
                  const isInWord =
                    direction === 'across'
                      ? activeCell.row === rIdx
                      : activeCell.col === cIdx;

                  // Find clue number if this cell starts a word
                  let clueNum: number | undefined;
                  if (cIdx === 0) clueNum = rIdx + 1;

                  return (
                    <div
                      key={`${rIdx}-${cIdx}`}
                      onClick={() => handleCellClick(rIdx, cIdx)}
                      className={`relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center cursor-pointer select-none transition ${
                        isSelected
                          ? 'bg-[#ffda00]'
                          : isInWord
                          ? 'bg-[#a7d8ff]'
                          : 'bg-white hover:bg-blue-50'
                      }`}
                    >
                      {clueNum && (
                        <span className="absolute top-0.5 left-1 text-[9px] font-sans font-bold text-[#121212] pointer-events-none">
                          {clueNum}
                        </span>
                      )}
                      <input
                        type="text"
                        maxLength={1}
                        value={cellValue}
                        onKeyDown={(e) => handleKeyDown(e, rIdx, cIdx)}
                        onChange={() => {}}
                        className="w-full h-full text-center font-sans font-bold text-xl sm:text-2xl uppercase bg-transparent outline-none cursor-pointer caret-transparent"
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Grid Action buttons */}
          <div className="flex items-center space-x-3 mt-4 text-xs">
            <button
              onClick={checkPuzzle}
              className="px-3 py-1.5 border border-[#121212] font-semibold text-[#121212] hover:bg-[#121212] hover:text-white transition cursor-pointer"
            >
              Check
            </button>
            <button
              onClick={revealLetter}
              className="px-3 py-1.5 border border-[#e2e2e2] text-[#555] hover:border-[#121212] hover:text-[#121212] transition cursor-pointer"
            >
              Reveal Letter
            </button>
          </div>
        </div>

        {/* Clues Column */}
        <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-[#fbfbfb] p-6 border border-[#ebebeb]">
          {/* Across */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#121212] border-b border-[#121212] pb-1 mb-3">
              Across
            </h4>
            <div className="space-y-3 text-xs">
              {CLUES_ACROSS.map((clue) => {
                const isActive = direction === 'across' && activeCell.row === clue.num - 1;
                return (
                  <div
                    key={clue.num}
                    onClick={() => {
                      setDirection('across');
                      setActiveCell({ row: clue.num - 1, col: 0 });
                    }}
                    className={`p-2 rounded-xs cursor-pointer transition ${
                      isActive ? 'bg-[#ffda00]/40 font-semibold' : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="font-bold mr-2 text-[#121212]">{clue.num}</span>
                    <span className="text-[#333]">{clue.clue}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Down */}
          <div>
            <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#121212] border-b border-[#121212] pb-1 mb-3">
              Down
            </h4>
            <div className="space-y-3 text-xs">
              {CLUES_DOWN.map((clue) => {
                const isActive = direction === 'down' && activeCell.col === clue.num - 1;
                return (
                  <div
                    key={clue.num}
                    onClick={() => {
                      setDirection('down');
                      setActiveCell({ row: 0, col: clue.num - 1 });
                    }}
                    className={`p-2 rounded-xs cursor-pointer transition ${
                      isActive ? 'bg-[#ffda00]/40 font-semibold' : 'hover:bg-gray-100'
                    }`}
                  >
                    <span className="font-bold mr-2 text-[#121212]">{clue.num}</span>
                    <span className="text-[#333]">{clue.clue}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
