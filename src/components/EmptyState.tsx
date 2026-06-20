import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchCode, PlusCircle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  showCreateButton?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  showCreateButton = false,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background-card/50 p-12 text-center max-w-lg mx-auto my-8">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-monad/5 border border-monad/20 text-monad mb-6">
        <SearchCode className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-zinc-400 max-w-sm leading-relaxed">
        {description}
      </p>
      {showCreateButton && (
        <button
          onClick={() => navigate('/dashboard/create')}
          className="mt-6 flex items-center space-x-1.5 rounded-lg bg-monad px-4 py-2 text-sm font-semibold text-white hover:bg-monad-hover shadow-[0_0_15px_rgba(131,59,255,0.2)] transition-all duration-200"
        >
          <PlusCircle className="h-4 w-4" />
          <span>Create First Prompt</span>
        </button>
      )}
    </div>
  );
};
