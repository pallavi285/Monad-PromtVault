import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePrompts } from '../context/PromptContext';
import { PromptCard } from '../components/PromptCard';
import { EmptyState } from '../components/EmptyState';
import { Search, Plus, Terminal } from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { prompts } = usePrompts();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const isMyPrompts = location.pathname.includes('/my-prompts');

  // Filter prompts by search term
  const filteredPrompts = prompts.filter((prompt) => {
    const query = searchQuery.toLowerCase().trim();
    return (
      prompt.title.toLowerCase().includes(query) ||
      prompt.description.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-8 bg-black min-h-screen text-white font-mono">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-lg font-bold tracking-widest text-white flex items-center gap-2 uppercase">
            <Terminal className="h-4.5 w-4.5 text-white" />
            <span>{isMyPrompts ? 'Secured Prompts Archive' : 'Vault Overview'}</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider">
            {isMyPrompts
              ? '// Archive directory of local prompt files.'
              : '// Store and check prompt parameters.'}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => navigate('/dashboard/create')}
          className="flex items-center justify-center space-x-1.5 border border-[#262626] bg-black px-4 py-2.5 text-xs font-bold text-white hover:bg-[#171717] transition-all tracking-wider uppercase shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>New Prompt</span>
        </button>
      </div>

      {/* Search Bar Row */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-500">
          <Search className="h-4 w-4" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter by title or description keywords..."
          className="w-full rounded border border-[#262626] bg-black py-3 pl-10 pr-4 text-xs text-white placeholder-zinc-500 focus:border-white focus:outline-none transition-all"
        />
      </div>

      {/* Cards Grid */}
      {filteredPrompts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPrompts.map((prompt) => (
            <PromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={searchQuery ? 'Search Query Yielded 0 Matches' : 'No Prompts Saved'}
          description={
            searchQuery
              ? `Keyword "${searchQuery}" returned no records in local vault indexing.`
              : 'Execute draft submission to secure your first prompt record.'
          }
          showCreateButton={!searchQuery}
        />
      )}
    </div>
  );
};
