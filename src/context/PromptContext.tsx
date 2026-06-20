import React, { createContext, useContext, useState, type ReactNode } from 'react';
import type { Prompt } from '../types/prompt';
import { mockPrompts } from '../data/mockPrompts';

interface PromptContextType {
  prompts: Prompt[];
  addPrompt: (title: string, description: string, content: string, category?: string, author?: string) => void;
}

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export const PromptProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [prompts, setPrompts] = useState<Prompt[]>(mockPrompts);

  const addPrompt = (
    title: string,
    description: string,
    content: string,
    category: string = 'General',
    author: string = '0xAnonymous'
  ) => {
    const newPrompt: Prompt = {
      id: Date.now().toString(),
      title,
      description,
      content,
      createdAt: new Date().toISOString().split('T')[0],
      category,
      author,
    };
    setPrompts((prev) => [newPrompt, ...prev]);
  };

  return (
    <PromptContext.Provider value={{ prompts, addPrompt }}>
      {children}
    </PromptContext.Provider>
  );
};

export const usePrompts = () => {
  const context = useContext(PromptContext);
  if (context === undefined) {
    throw new Error('usePrompts must be used within a PromptProvider');
  }
  return context;
};
