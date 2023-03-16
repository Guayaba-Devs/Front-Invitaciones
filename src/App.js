import React from 'react';
import './App.css';
import Card from './components/Card';

const App = () => {

  return (
    <div className="App">
      <Card orgName={process.env.REACT_APP_ORGNAME} token={process.env.REACT_APP_TOKEN}/>
    </div>
  );
}

export default App;
