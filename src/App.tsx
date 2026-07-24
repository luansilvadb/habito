/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useAppStore } from './store';
import { Layout } from './components/Layout';
import { ActiveMission } from './components/ActiveMission';
import { Backlog } from './components/Backlog';

export default function App() {
  const store = useAppStore();
  const [currentTab, setCurrentTab] = useState<'mission' | 'backlog'>('mission');

  return (
    <Layout currentTab={currentTab} onTabChange={setCurrentTab}>
      {currentTab === 'mission' && (
        <ActiveMission 
          principle={store.activePrinciple} 
          observations={store.observations}
          onLog={(broken) => store.addObservation(store.activePrinciple!.id, broken)}
          onComplete={() => {
            if (store.activePrinciple) {
              store.setPrincipleState(store.activePrinciple.id, 'INTERNALIZADO');
              setCurrentTab('backlog');
            }
          }}
          onGoToBacklog={() => setCurrentTab('backlog')}
        />
      )}
      {currentTab === 'backlog' && (
        <Backlog 
          principles={store.principles}
          onAdd={store.addPrinciple}
          onActivate={(id) => {
             store.setPrincipleState(id, 'ATIVO');
             setCurrentTab('mission');
          }}
          onArchive={(id) => store.setPrincipleState(id, 'ARQUIVADO')}
        />
      )}
    </Layout>
  );
}
