import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrompts } from '../context/PromptContext';
import { useWallet } from '../context/WalletContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ChevronLeft, Save, XCircle, AlertCircle } from 'lucide-react';

export const SubmitPromptPage: React.FC = () => {
  const { addPrompt } = usePrompts();
  const { walletAddress } = useWallet();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Social');
  const [error, setError] = useState<string | null>(null);

  const categories = ['Social', 'Careers', 'Coding', 'Marketing', 'Education', 'Startups'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Prompt Title is required.');
      return;
    }
    if (!description.trim()) {
      setError('Short Description is required.');
      return;
    }
    if (!content.trim()) {
      setError('Prompt Content is required.');
      return;
    }

    setError(null);
    const author = walletAddress || '0xAnonymousCreator';
    addPrompt(title.trim(), description.trim(), content.trim(), category, author);
    navigate('/marketplace');
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono flex flex-col justify-between overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar />

      <main className="mx-auto max-w-3xl w-full px-4 pt-10 pb-16 sm:px-6 lg:px-8 flex-1 flex flex-col justify-start space-y-6">
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

        {/* Header Title */}
        <div className="space-y-1 border-b border-[#262626] pb-4">
          <h1 className="text-lg font-bold tracking-widest uppercase">SUBMIT PUBLIC PROMPT</h1>
          <p className="text-xs text-zinc-400 uppercase tracking-wider">
            // Register a public template record into the PromptVault directory index.
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="space-y-6 border border-[#262626] bg-black p-6 sm:p-8 rounded-lg">
          {/* Error Banner */}
          {error && (
            <div className="flex items-center space-x-2 border border-[#262626] bg-black p-4 text-xs text-white">
              <AlertCircle className="h-4.5 w-4.5 shrink-0 text-white" />
              <span>[VALIDATION ERROR] {error}</span>
            </div>
          )}

          {/* Form Fields */}
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
                Prompt Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Solidity Auditor Helper"
                className="mt-2 w-full rounded border border-[#262626] bg-black px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-all"
              />
            </div>

            {/* Category selection */}
            <div>
              <label htmlFor="category" className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-2 w-full rounded border border-[#262626] bg-black px-4 py-2.5 text-xs text-white focus:border-white focus:outline-none transition-all appearance-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-black text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Short Description */}
            <div>
              <label htmlFor="description" className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
                Short Description
              </label>
              <input
                type="text"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief summary of the prompt's intended utility..."
                className="mt-2 w-full rounded border border-[#262626] bg-black px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-all"
              />
            </div>

            {/* Content Textarea */}
            <div>
              <label htmlFor="content" className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
                Prompt Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={8}
                placeholder="System instructions and template structures..."
                className="mt-2 w-full rounded border border-[#262626] bg-black px-4 py-3 text-xs text-white placeholder-zinc-600 font-mono focus:border-white focus:outline-none transition-all"
              />
              <p className="mt-2 text-[10px] text-zinc-500 uppercase tracking-wider">
                // Submitting automatically signs the record using connected credentials.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-[#262626]">
            <button
              type="button"
              onClick={() => navigate('/marketplace')}
              className="flex items-center space-x-1.5 border border-[#262626] bg-black px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white hover:bg-[#171717] transition-all uppercase tracking-wider"
            >
              <XCircle className="h-4 w-4" />
              <span>Cancel</span>
            </button>

            <button
              type="submit"
              className="flex items-center space-x-1.5 border border-[#262626] bg-black px-4 py-2 text-xs font-bold text-white hover:bg-[#171717] transition-all uppercase tracking-wider"
            >
              <Save className="h-4 w-4" />
              <span>Submit Record</span>
            </button>
          </div>
        </form>
      </main>

      {/* Bottom Footer */}
      <Footer />
    </div>
  );
};
