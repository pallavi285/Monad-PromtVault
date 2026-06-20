import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[#262626] bg-black py-6 mt-auto font-mono">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-zinc-500 text-[10px] uppercase tracking-widest">
        <div className="mb-4 sm:mb-0">
          <span>PROMPTVAULT // MONAD BLITZ MVP</span>
        </div>
        <div className="flex space-x-6">
          <Link to="/marketplace" className="hover:text-white transition-colors">Marketplace</Link>
          <Link to="/submit" className="hover:text-white transition-colors">Submit</Link>
          <Link to="/dashboard" className="hover:text-white transition-colors">Vault</Link>
        </div>
      </div>
    </footer>
  );
};
