import React from 'react';
import './App.css';
import { Routes, Route } from "react-router-dom";
import AddCreator from './pages/AddCreator';
import EditCreator from './pages/EditCreator';
import ShowCreator from './pages/ShowCreator';
import ViewCreator from './pages/ViewCreator';
import DeleteWarning from './pages/DeleteWarning';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className='container'>
      <Routes>
        <Route path="/" element={<ViewCreator />} />
        <Route path="/add" element={<AddCreator />} />
        <Route path="/show/:id" element={<ShowCreator />} />
        <Route path="/edit/:id" element={<EditCreator />} />
        <Route path="/delete/:id" element={<DeleteWarning />} />
      </Routes>
    </div>
  );
}

export default App;
