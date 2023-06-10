import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ShowCreator from './pages/ShowCreator';
import ViewCreator from './pages/ViewCreator';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='container bd-black'>
      <Routes>
        <Route path="/" element={<ViewCreator />} />
        <Route path="/add" element={<AddCreator />} />
      </Routes>
    </div>
  );
}

export default App;
