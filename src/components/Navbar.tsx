import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { Terminal, LogOut, LayoutDashboard } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { walletAddress, isConnected, connectWallet, disconnectWallet } = useWallet();
  const navigate = useNavigate();
  const location = useLocation();

  const handleConnect = async () => {
    await connectWallet();
    navigate('/dashboard');
  };

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#262626] bg-black">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Navigation */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Terminal className="h-5 w-5 text-white" />
              <span className="text-sm font-bold tracking-wider text-white uppercase">
                PROMPTVAULT
              </span>
            </Link>

            {/* Menu Links */}
            <div className="hidden md:flex items-center space-x-6 text-xs uppercase tracking-wider font-semibold">
              <Link
                to="/marketplace"
                className={`text-zinc-400 hover:text-white transition-colors ${
                  location.pathname === '/marketplace' ? 'text-white underline underline-offset-4' : ''
                }`}
              >
                Marketplace
              </Link>
              <Link
                to="/submit"
                className={`text-zinc-400 hover:text-white transition-colors ${
                  location.pathname === '/submit' ? 'text-white underline underline-offset-4' : ''
                }`}
              >
                Submit Prompt
              </Link>
              {isConnected && (
                <Link
                  to="/dashboard"
                  className={`text-zinc-400 hover:text-white transition-colors ${
                    isDashboardRoute ? 'text-white underline underline-offset-4' : ''
                  }`}
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            {/* Mobile Nav Links Indicator */}
            <div className="flex md:hidden items-center space-x-3 text-[10px] uppercase tracking-wider">
              <Link to="/marketplace" className="text-zinc-400 hover:text-white">Market</Link>
              <Link to="/submit" className="text-zinc-400 hover:text-white">Submit</Link>
            </div>

            {isConnected && !isDashboardRoute && (
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-1.5 border border-[#262626] bg-black px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-[#171717] transition-all"
              >
                <LayoutDashboard className="h-3.5 w-3.5" />
                <span className="uppercase tracking-wider">Vault</span>
              </button>
            )}

            {isConnected ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1.5 border border-[#262626] bg-black px-3 py-1.5 text-xs text-white font-mono">
                  <span>[{formatAddress(walletAddress!)}]</span>
                </div>
                <button
                  onClick={disconnectWallet}
                  title="Disconnect"
                  className="border border-[#262626] bg-black p-1.5 text-zinc-400 hover:text-white hover:bg-[#171717] transition-all"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={handleConnect}
                className="flex items-center space-x-1.5 border border-[#262626] bg-black px-4 py-2 text-xs font-bold text-white hover:bg-[#171717] transition-all tracking-widest uppercase"
              >
                <span>CONNECT</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
