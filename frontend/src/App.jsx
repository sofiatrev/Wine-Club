import React, { useState } from 'react';
import WineForm from './components/WineForm';
import WineList from './components/WineList';
import './styles/App.css';

const App = () => {
  const [refresh, setRefresh] = useState(0);
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">Wine Club</h1>
        <p className="app-subtitle">Track and rate the wines you've tried</p>
      </header>
      <WineForm onAdded={() => setRefresh(r => r + 1)} />
      <WineList refreshSignal={refresh} />
    </div>
  );
};

export default App;


