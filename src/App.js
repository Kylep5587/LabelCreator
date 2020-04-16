import React from 'react';
import { Route } from 'react-router-dom';
import 'typeface-roboto';
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import LabelCreatorPage from './pages/label-creator/label-creator.component';

function App() {
  return (
    <div className="App">
        <LabelCreatorPage />
        <Route exact path='/label-creator' component={LabelCreatorPage} />
    </div>
  );
}

export default App;
