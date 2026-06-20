import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, PlusCircle, X, Terminal } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const links = [
    {
      to: '/dashboard',
      name: 'Vault Overview',
      icon: LayoutDashboard,
      end: true,
    },
    {
      to: '/dashboard/my-prompts',
      name: 'My Saved Prompts',
      icon: FileText,
      end: false,
    },
    {
      to: '/dashboard/create',
      name: 'Draft Prompt',
      icon: PlusCircle,
      end: false,
    },
  ];

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-black border-r border-[#262626] p-4 font-mono">
      <div className="space-y-6">
        {/* Mobile Header */}
        <div className="flex items-center justify-between md:hidden">
          <div className="flex items-center space-x-2">
            <Terminal className="h-4.5 w-4.5 text-white" />
            <span className="text-sm font-bold tracking-wider text-white uppercase">PromptVault</span>
          </div>
          <button
            onClick={onClose}
            className="border border-[#262626] bg-black p-1 text-zinc-400 hover:text-white hover:bg-[#171717] transition-all"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">
            Vault Options
          </p>
          <nav className="space-y-1 pt-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 rounded-md px-3 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-200 group relative ${
                      isActive
                        ? 'bg-[#171717] text-white border-l-2 border-white pl-2.5'
                        : 'text-zinc-400 hover:text-white hover:bg-[#171717]'
                    }`
                  }
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{link.name}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="rounded border border-[#262626] bg-black p-3 text-center">
        <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">PROMPTVAULT // MONAD</p>
        <p className="text-[9px] text-zinc-500 mt-1 uppercase tracking-wider">Status: Devnet OK</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Fixed Left) */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-16 md:z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Overlay + Slide-out) */}
      {isOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          {/* Overlay background */}
          <div
            className="fixed inset-0 bg-black/80"
            onClick={onClose}
          />
          {/* Drawer content */}
          <div className="relative flex w-full max-w-xs flex-1 flex-col bg-black transition-transform duration-300 ease-in-out">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
