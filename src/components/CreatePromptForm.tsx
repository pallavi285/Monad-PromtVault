import React, { useState } from 'react';
import { Save, XCircle, AlertCircle } from 'lucide-react';

interface CreatePromptFormProps {
  onSave: (title: string, description: string, content: string) => void;
  onCancel: () => void;
}

export const CreatePromptForm: React.FC<CreatePromptFormProps> = ({ onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError('Prompt Title is required.');
      return;
    }
    if (!description.trim()) {
      setError('Prompt Description is required.');
      return;
    }
    if (!content.trim()) {
      setError('Prompt Content is required.');
      return;
    }

    setError(null);
    onSave(title.trim(), description.trim(), content.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl border border-[#262626] bg-black p-6 sm:p-8 rounded-lg font-mono">
      {/* Header Info */}
      <div>
        <h2 className="text-md font-bold text-white uppercase tracking-wider">Draft New Prompt</h2>
        <p className="text-xs text-zinc-400 mt-1 uppercase tracking-widest">
          // Parameter details will be saved to local React session state.
        </p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="flex items-center space-x-2 border border-[#262626] bg-black p-4 text-xs text-white">
          <AlertCircle className="h-4.5 w-4.5 shrink-0 text-white" />
          <span>[VALIDATION ERROR] {error}</span>
        </div>
      )}

      {/* Fields */}
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
            placeholder="e.g. Smart Contract Auditor"
            className="mt-2 w-full rounded border border-[#262626] bg-black px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-all"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
            Short Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief explanation of purpose..."
            className="mt-2 w-full rounded border border-[#262626] bg-black px-4 py-2.5 text-xs text-white placeholder-zinc-600 focus:border-white focus:outline-none transition-all"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-[10px] font-semibold text-zinc-400 uppercase tracking-widest">
            Prompt Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            placeholder="System instructions and template structure..."
            className="mt-2 w-full rounded border border-[#262626] bg-black px-4 py-3 text-xs text-white placeholder-zinc-600 font-mono focus:border-white focus:outline-none transition-all"
          />
          <p className="mt-2 text-[10px] text-zinc-500 uppercase tracking-wide">
            // Output template supports standard interpolation parameters.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 pt-4 border-t border-[#262626]">
        <button
          type="button"
          onClick={onCancel}
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
          <span>Save Prompt</span>
        </button>
      </div>
    </form>
  );
};
