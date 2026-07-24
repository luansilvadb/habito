import { useState, useEffect } from 'react';
import { Principle, Observation, PrincipleState } from './types';

const STORAGE_KEY_PRINCIPLES = 'dp_principles';
const STORAGE_KEY_OBSERVATIONS = 'dp_observations';

export function useAppStore() {
  const [principles, setPrinciples] = useState<Principle[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_PRINCIPLES);
    return stored ? JSON.parse(stored) : [];
  });

  const [observations, setObservations] = useState<Observation[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_OBSERVATIONS);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PRINCIPLES, JSON.stringify(principles));
  }, [principles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_OBSERVATIONS, JSON.stringify(observations));
  }, [observations]);

  const addPrinciple = (text: string) => {
    if (!text.trim()) return;
    const newPrinciple: Principle = {
      id: crypto.randomUUID(),
      text: text.trim(),
      state: 'BACKLOG',
      createdAt: Date.now(),
    };
    setPrinciples(prev => [newPrinciple, ...prev]);
  };

  const setPrincipleState = (id: string, state: PrincipleState) => {
    setPrinciples(prev => {
      let next = [...prev];
      if (state === 'ATIVO') {
        next = next.map(p => p.state === 'ATIVO' ? { ...p, state: 'BACKLOG' } : p);
      }
      return next.map(p => p.id === id ? { ...p, state } : p);
    });
  };

  const addObservation = (principleId: string, broken: boolean) => {
    const newObs: Observation = {
      id: crypto.randomUUID(),
      principleId,
      timestamp: Date.now(),
      broken,
    };
    setObservations(prev => [newObs, ...prev]);
  };

  const activePrinciple = principles.find(p => p.state === 'ATIVO');

  return {
    principles,
    observations,
    activePrinciple,
    addPrinciple,
    setPrincipleState,
    addObservation
  };
}
