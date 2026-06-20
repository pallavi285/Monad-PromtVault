import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { usePrompts } from '../context/PromptContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ChevronLeft, Copy, Check, Terminal, FileCheck, Hash } from 'lucide-react';

export const PromptDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { prompts } = usePrompts();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const prompt = prompts.find((p) => p.id === id);

  const handleCopy = async () => {
    if (prompt) {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!prompt) {
    return (
      <div className="min-h-screen bg-black text-white font-mono flex flex-col justify-between overflow-x-hidden">
        <Navbar />
        <main className="mx-auto max-w-5xl w-full px-4 py-16 flex-grow flex flex-col items-center justify-center text-center">
          <p className="text-zinc-500 text-xs">// SYSTEM FAULT: RECORD NOT FOUND</p>
          <h1 className="text-lg font-bold mt-2 uppercase">PROMPT FILE ID: {id} NULL</h1>
          <Link to="/marketplace" className="mt-6 border border-[#262626] bg-black px-4 py-2 text-xs uppercase hover:bg-[#171717]">
            Return to Marketplace
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Generate a mock hash representing cryptographic verification on Monad
  const mockCreationHash = `0x${Array.from({ length: 64 }, (_, i) =>
    ((i * 13 + parseInt(prompt.id)) % 16).toString(16)
  ).join('')}`;

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col justify-between overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar />

      <main className="mx-auto max-w-5xl w-full px-4 pt-10 pb-16 sm:px-6 lg:px-8 flex-1 flex flex-col justify-start space-y-6">
        {/* Back Link */}
        <div>
          <button
            onClick={() => navigate('/marketplace')}
            className="flex items-center space-x-1 text-xs text-zinc-400 hover:text-white uppercase tracking-wider transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Marketplace directory</span>
          </button>
        </div>

        {/* Header Block */}
        <div className="border border-[#262626] bg-black p-6 rounded-lg space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#262626] pb-3">
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">// PROMPT FILE RECORD</span>
              <h1 className="text-xl font-bold uppercase tracking-wider text-white">{prompt.title}</h1>
            </div>
            <span className="border border-[#262626] px-2.5 py-1 text-[10px] uppercase font-bold text-zinc-400 tracking-wider">
              {prompt.category}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 text-xs">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">CREATOR:</span>
              <p className="text-white mt-0.5">[{prompt.author}]</p>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">REGISTRATION DATE:</span>
              <p className="text-white mt-0.5">{prompt.createdAt}</p>
            </div>
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider">STATUS:</span>
              <p className="text-emerald-400 mt-0.5 flex items-center space-x-1 uppercase text-[10px]">
                <FileCheck className="h-3.5 w-3.5" />
                <span>Verified</span>
              </p>
            </div>
          </div>

          <div className="border-t border-[#262626] pt-3">
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">DESCRIPTION:</span>
            <p className="text-zinc-300 mt-1 font-sans text-xs leading-relaxed">{prompt.description}</p>
          </div>
        </div>

        {/* Prompt Content Codebox */}
        <div className="space-y-2 text-left">
          <div className="flex items-center justify-between px-1">
            <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest flex items-center space-x-1">
              <Terminal className="h-3.5 w-3.5 text-zinc-400" />
              <span>Prompt Template Content</span>
            </label>

            <button
              onClick={handleCopy}
              className="flex items-center space-x-1 border border-[#262626] bg-black px-3 py-1 text-[10px] text-zinc-300 hover:text-white hover:bg-[#171717] transition-all uppercase tracking-wider"
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              <span>{copied ? 'Copied' : 'Copy Template'}</span>
            </button>
          </div>

          <div className="border border-[#262626] bg-black p-5 rounded-lg text-xs leading-relaxed text-zinc-300 font-mono overflow-x-auto whitespace-pre-wrap selection:bg-white selection:text-black">
            {prompt.content}
          </div>
        </div>

        {/* Simulated Blockchain Receipt Metadata (GitHub/hacker look) */}
        <div className="border border-[#262626] bg-black p-4 rounded-lg space-y-2 text-[10px]">
          <div className="flex items-center space-x-1.5 text-zinc-400 uppercase font-bold tracking-widest">
            <Hash className="h-3.5 w-3.5" />
            <span>Monad Verification Proof</span>
          </div>
          <div className="space-y-1 font-mono text-zinc-500 leading-normal uppercase">
            <p className="truncate">Creation Signature Hash: <span className="text-white">{mockCreationHash}</span></p>
            <p>Verification Block Height: <span className="text-white">12,492,084</span></p>
            <p>Cryptographic Algorithm: <span className="text-white">ECDSA_SECP256K1</span></p>
            <p>Ownership Record: <span className="text-white">Verified Creation Proof Locked On-Chain</span></p>
          </div>
        </div>
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
};
