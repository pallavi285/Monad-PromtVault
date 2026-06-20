import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

export const LandingPage: React.FC = () => {
  const { connectWallet, isConnected } = useWallet();
  const navigate = useNavigate();

  const handleCTA = async () => {
    if (!isConnected) {
      await connectWallet();
    }
    navigate('/dashboard');
  };

  const features = [
    {
      code: '01',
      title: 'SAVE PROMPTS',
      description: 'Store templates, system instructions, and variables in a local sandboxed directory.',
    },
    {
      code: '02',
      title: 'ORGANIZE RECOS',
      description: 'Filter prompts by category and trace their modifications in a clean command line list format.',
    },
    {
      code: '03',
      title: 'VERIFY ON-CHAIN',
      description: 'Sign creation proofs cryptographically. Prepare files for licensing and ownership metadata checks.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col justify-between overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Terminal Shell */}
      <section className="mx-auto max-w-5xl w-full px-4 pt-16 pb-20 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center">
        {/* Terminal Header */}
        <div className="border border-[#262626] bg-black rounded-lg overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between border-b border-[#262626] px-4 py-2 bg-black select-none">
            <div className="flex space-x-1.5">
              <div className="h-2.5 w-2.5 rounded-full border border-zinc-700 bg-black"></div>
              <div className="h-2.5 w-2.5 rounded-full border border-zinc-700 bg-black"></div>
              <div className="h-2.5 w-2.5 rounded-full border border-zinc-700 bg-black"></div>
            </div>
            <span className="text-[10px] text-zinc-500 tracking-wider">PROMPTVAULT_SHELL_V1.0.0</span>
            <div className="w-10"></div>
          </div>

          <div className="p-6 sm:p-8 space-y-8 text-left">
            {/* Command Input Block */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-zinc-500 text-xs">
                <span>$</span>
                <span>cat promptvault_banner.txt</span>
              </div>
              <pre className="text-white text-xs font-bold leading-normal block overflow-x-auto whitespace-pre select-none">
{`  ____                           ___     __           _ _   
 |  _ \\ _ __ ___  _ __ ___  _ __| \\ \\   / /_ _ _   _| | |_ 
 | |_) | '__/ _ \\| '_ \` _ \\| '_ \\ __\\ \\ / / _\` | | | | | __|
 |  __/| | | (_) | | | | | | |_) | |_ \\ V / (_| | |_| | | |_ 
 |_|   |_|  \\___/|_| |_| |_| .__/ \\__| \\_/ \\__,_|\\__,_|_|\\__|
                           |_|                              `}
              </pre>
            </div>

            {/* Subtext command */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-zinc-500 text-xs">
                <span>$</span>
                <span>get-description --app="PromptVault"</span>
              </div>
              <p className="text-zinc-400 text-xs uppercase tracking-wider leading-relaxed">
                Headline: Save Prompts. Own Them On Monad.<br />
                Subheading: Store your best AI prompts and prepare them for cryptographic on-chain integrity.
              </p>
            </div>

            {/* CTA action */}
            <div className="pt-4 space-y-2">
              <div className="flex items-center space-x-2 text-zinc-500 text-xs">
                <span>$</span>
                <span>exec initialize_connection</span>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={handleCTA}
                  className="flex items-center space-x-2 border border-white bg-black px-6 py-3 text-xs font-bold text-white hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-widest"
                >
                  <span>{isConnected ? 'Open Vault Directory' : 'Connect Wallet'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">// Ready for Devnet deployment checks</span>
              </div>
            </div>
          </div>
        </div>

        {/* Features Table List (Inspired by portfolio listings) */}
        <div className="mt-16 space-y-6 text-left">
          <div className="border-b border-[#262626] pb-2">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">// SYSTEM FEATURES</span>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {features.map((feat) => (
              <div
                key={feat.code}
                className="border border-[#262626] bg-black p-6 rounded-lg space-y-3 hover:bg-[#171717] transition-colors duration-200"
              >
                <div className="text-[10px] font-bold text-zinc-500">[{feat.code}]</div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">{feat.title}</h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-sans">{feat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
};
