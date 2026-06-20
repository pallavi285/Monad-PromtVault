import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Navbar } from '../components/Navbar';
import { Menu, Terminal } from 'lucide-react';

export const DashboardLayout: React.FC = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white font-mono">
      {/* Top Navbar */}
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar Component (Handles both desktop and mobile drawer) */}
        <Sidebar isOpen={mobileSidebarOpen} onClose={() => setMobileSidebarOpen(false)} />

        {/* Mobile Header Bar */}
        <div className="flex h-14 items-center justify-between border-b border-[#262626] bg-black px-4 md:hidden w-full fixed top-16 z-30">
          <div className="flex items-center space-x-2">
            <Terminal className="h-4.5 w-4.5 text-white" />
            <span className="text-xs font-bold tracking-widest text-white uppercase">PromptVault</span>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="border border-[#262626] bg-black p-1 text-zinc-400 hover:text-white hover:bg-[#171717] transition-all"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 md:pl-64 pt-14 md:pt-0">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 bg-black">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
