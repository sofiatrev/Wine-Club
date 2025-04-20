import React from 'react';
import WineForm from './components/WineForm';
import WineList from './components/WineList'; // Import the WineList component

const App = () => {
  return (
    <div>
      <h1>Wine Club</h1>
      <WineForm />
      <WineList /> {/* Display the list of wines */}
    </div>
  );
};

export default App;


