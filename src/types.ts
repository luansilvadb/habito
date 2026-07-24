export type PrincipleState = 'BACKLOG' | 'ATIVO' | 'INTERNALIZADO' | 'ARQUIVADO';

export interface Principle {
  id: string;
  text: string;
  state: PrincipleState;
  createdAt: number;
}

export interface Observation {
  id: string;
  principleId: string;
  timestamp: number;
  broken: boolean;
}
