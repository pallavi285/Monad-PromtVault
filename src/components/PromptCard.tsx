import React, { useState } from 'react';
import type { Prompt } from '../types/prompt';
import { Calendar, Copy, Check, Eye, X } from 'lucide-react';

interface PromptCardProps {
  prompt: Prompt;
}

export const PromptCard: React.FC<PromptCardProps> = ({ prompt }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Prompt Card */}
      <div className="flex flex-col justify-between rounded-lg border border-[#262626] bg-black p-5 hover:bg-[#171717] transition-all duration-200">
        <div>
          <div className="flex items-start justify-between">
            <h3 className="font-bold text-sm tracking-wide text-white uppercase">
              {prompt.title}
            </h3>
          </div>
          <p className="mt-2 text-xs text-zinc-400 line-clamp-3 leading-relaxed">
            {prompt.description}
          </p>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#262626] pt-3">
          <div className="flex items-center space-x-1.5 text-[10px] text-zinc-500 uppercase tracking-wider">
            <Calendar className="h-3 w-3" />
            <span>{prompt.createdAt}</span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center space-x-1 border border-[#262626] bg-black px-2.5 py-1 text-[10px] font-semibold text-zinc-300 hover:text-white hover:bg-[#171717] transition-all uppercase tracking-wider"
          >
            <Eye className="h-3 w-3" />
            <span>View</span>
          </button>
        </div>
      </div>

      {/* Detail Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/85"
            onClick={() => setIsModalOpen(false)}
          />

          {/* Modal Container */}
          <div className="relative w-full max-w-2xl transform rounded-lg border border-[#262626] bg-black p-6 shadow-2xl transition-all">
            {/* Header */}
            <div className="flex items-start justify-between border-b border-[#262626] pb-4">
              <div>
                <h3 className="text-md font-bold text-white uppercase tracking-wider">{prompt.title}</h3>
                <p className="mt-1.5 text-xs text-zinc-400 leading-relaxed">{prompt.description}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="border border-[#262626] bg-black p-1 text-zinc-400 hover:text-white hover:bg-[#171717] transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Content Area */}
            <div className="mt-4">
              <label className="text-[10px] font-semibold text-zinc-500 uppercase tracking-widest">
                Prompt Content
              </label>
              <div className="relative mt-2 rounded border border-[#262626] bg-black p-4 font-mono text-xs text-zinc-300 leading-relaxed overflow-x-auto max-h-80 whitespace-pre-wrap">
                {prompt.content}
              </div>
            </div>

            {/* Footer / Actions */}
            <div className="mt-6 flex items-center justify-between border-t border-[#262626] pt-4">
              <div className="flex items-center space-x-1.5 text-[10px] text-zinc-500 uppercase tracking-wider">
                <Calendar className="h-3.5 w-3.5" />
                <span>Created: {prompt.createdAt}</span>
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center space-x-1.5 border border-[#262626] bg-black px-4 py-2 text-xs font-semibold text-white hover:bg-[#171717] transition-all uppercase tracking-wider"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Prompt</span>
                    </>
                  )}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="border border-[#262626] bg-black px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-[#171717] transition-all uppercase tracking-wider"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
