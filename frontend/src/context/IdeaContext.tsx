import React, { createContext, useContext, useEffect, useState } from 'react';
import { fetchUserIdeas } from '../services/api';
import { BusinessIdea } from '../types';

interface IdeaContextType {
  ideas: BusinessIdea[];
  activeIdea: BusinessIdea | null;
  setActiveIdea: (idea: BusinessIdea | null) => void;
  loadIdeas: () => Promise<void>;
  addIdeaToList: (idea: BusinessIdea) => void;
}

const IdeaContext = createContext<IdeaContextType>({
  ideas: [],
  activeIdea: null,
  setActiveIdea: () => {},
  loadIdeas: async () => {},
  addIdeaToList: () => {}
});

export const IdeaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ideas, setIdeas] = useState<BusinessIdea[]>([]);
  const [activeIdea, setActiveIdea] = useState<BusinessIdea | null>(null);

  const loadIdeas = async () => {
    const list = await fetchUserIdeas();
    setIdeas(list);
    if (list.length > 0 && !activeIdea) {
      setActiveIdea(list[0]);
    }
  };

  useEffect(() => {
    loadIdeas();
  }, []);

  const addIdeaToList = (newIdea: BusinessIdea) => {
    setIdeas(prev => [newIdea, ...prev.filter(i => i.id !== newIdea.id)]);
    setActiveIdea(newIdea);
  };

  return (
    <IdeaContext.Provider value={{ ideas, activeIdea, setActiveIdea, loadIdeas, addIdeaToList }}>
      {children}
    </IdeaContext.Provider>
  );
};

export const useIdea = () => useContext(IdeaContext);
