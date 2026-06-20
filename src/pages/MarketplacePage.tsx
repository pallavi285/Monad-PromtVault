import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrompts } from '../context/PromptContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { EmptyState } from '../components/EmptyState';
import { Search, Folder, Calendar, User, ArrowUpRight } from 'lucide-react';

export const MarketplacePage: React.FC = () => {
  const { prompts } = usePrompts();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const categories = ['All', 'Social', 'Careers', 'Coding', 'Marketing', 'Education', 'Startups'];

  const filteredPrompts = prompts.filter((prompt) => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      prompt.title.toLowerCase().includes(query) ||
      prompt.description.toLowerCase().includes(query);
    const matchesCategory =
      selectedCategory === 'All' || prompt.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const formatAddress = (addr: string) => {
    if (!addr) return '0xAnonymous';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col justify-between overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar />

      <main className="mx-auto max-w-5xl w-full px-4 pt-10 pb-16 sm:px-6 lg:px-8 flex-1 flex flex-col justify-start space-y-8">
        {/* Header Title */}
        <div className="space-y-1 border-b border-[#262626] pb-4">
          <h1 className="text-lg font-bold tracking-widest uppercase">PROMPT MARKETPLACE</h1>
          <p className="text-xs text-zinc-400 uppercase tracking-wider">
            // Directory of public prompts open for creative reuse and verification checks.
          </p>
        </div>

        {/* Filters and Search Row */}
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
              <Search className="h-4 w-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search marketplace prompts..."
              className="w-full rounded border border-[#262626] bg-black py-2.5 pl-10 pr-4 text-xs text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-all"
            />
          </div>

          {/* Category Pill select (Terminal style) */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-150 ${
                  selectedCategory === cat
                    ? 'border-white bg-white text-black'
                    : 'border-[#262626] bg-black text-zinc-400 hover:text-white hover:border-zinc-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Prompt Table Directory */}
        {filteredPrompts.length > 0 ? (
          <div className="border border-[#262626] rounded-lg overflow-hidden">
            {/* Table Header (Hidden on Mobile) */}
            <div className="hidden sm:grid grid-cols-12 gap-4 bg-black border-b border-[#262626] px-4 py-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest select-none">
              <div className="col-span-5">PROMPT TITLE</div>
              <div className="col-span-2 flex items-center space-x-1"><Folder className="h-3 w-3" /> <span>CATEGORY</span></div>
              <div className="col-span-3 flex items-center space-x-1"><User className="h-3 w-3" /> <span>CREATOR</span></div>
              <div className="col-span-2 flex items-center space-x-1"><Calendar className="h-3 w-3" /> <span>DATE</span></div>
            </div>

            {/* List Rows */}
            <div className="divide-y divide-[#262626]">
              {filteredPrompts.map((prompt) => (
                <div
                  key={prompt.id}
                  onClick={() => navigate(`/prompt/${prompt.id}`)}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 items-center px-4 py-4 hover:bg-[#171717] cursor-pointer transition-all duration-150 text-xs"
                >
                  {/* Title & description */}
                  <div className="col-span-1 sm:col-span-5 space-y-1">
                    <div className="font-bold text-white flex items-center space-x-1.5 uppercase group">
                      <span>{prompt.title}</span>
                      <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 text-zinc-400 transition-opacity" />
                    </div>
                    <div className="text-[11px] text-zinc-400 line-clamp-1 font-sans">{prompt.description}</div>
                  </div>

                  {/* Category */}
                  <div className="col-span-1 sm:col-span-2 text-zinc-400 sm:text-white flex items-center space-x-1 sm:space-x-0">
                    <span className="sm:hidden text-[10px] text-zinc-600 uppercase tracking-wider pr-1">Category:</span>
                    <span className="text-[10px] uppercase tracking-wider">{prompt.category}</span>
                  </div>

                  {/* Creator */}
                  <div className="col-span-1 sm:col-span-3 text-zinc-400 sm:text-white flex items-center space-x-1 sm:space-x-0 font-mono">
                    <span className="sm:hidden text-[10px] text-zinc-600 uppercase tracking-wider pr-1">Creator:</span>
                    <span className="text-[10px]">[{formatAddress(prompt.author)}]</span>
                  </div>

                  {/* Date */}
                  <div className="col-span-1 sm:col-span-2 text-zinc-500 flex items-center space-x-1 sm:space-x-0">
                    <span className="sm:hidden text-[10px] text-zinc-600 uppercase tracking-wider pr-1">Date:</span>
                    <span className="text-[10px] uppercase tracking-wider">{prompt.createdAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <EmptyState
            title="Search parameters returned 0 records"
            description="Adjust filters or clear queries to list all available public templates."
          />
        )}
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
};
