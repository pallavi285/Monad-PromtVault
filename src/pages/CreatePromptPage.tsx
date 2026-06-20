import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePrompts } from '../context/PromptContext';
import { CreatePromptForm } from '../components/CreatePromptForm';
import { ChevronLeft } from 'lucide-react';

export const CreatePromptPage: React.FC = () => {
  const { addPrompt } = usePrompts();
  const navigate = useNavigate();

  const handleSave = (title: string, description: string, content: string) => {
    addPrompt(title, description, content);
    navigate('/dashboard');
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="space-y-6">
      {/* Back Button Link */}
      <div>
        <button
          onClick={handleCancel}
          className="flex items-center space-x-1 text-sm text-zinc-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Dashboard</span>
        </button>
      </div>

      {/* Form Container */}
      <div className="flex justify-center">
        <div className="w-full">
          <CreatePromptForm onSave={handleSave} onCancel={handleCancel} />
        </div>
      </div>
    </div>
  );
};
