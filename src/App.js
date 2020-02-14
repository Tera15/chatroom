import React from 'react';
import Dashboard from './Dashboard';
import Store from './Store';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <Store>
      <Dashboard/> 
      </Store>
    </div>
  );
}

 
