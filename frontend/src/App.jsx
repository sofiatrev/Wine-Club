import React, { useState } from 'react';
import WineForm from './components/WineForm';
import WineList from './components/WineList';

const App = () => {
  const [refresh, setRefresh] = useState(0);
  return (
    <div>
      <h1>Wine Club</h1>
      <WineForm onAdded={() => setRefresh(r => r + 1)} />
      <WineList refreshSignal={refresh} />
    </div>
  );
};

export default App;


