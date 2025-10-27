import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Boardlist from './assets/components/Board/Boardlist';
import HomeComp from './assets/components/Board/HomeComp';
import Boardview from './assets/components/Board/Boardview';
import MenuComp from './assets/components/Board/MenuComp';

function App() {
  return (
    <BrowserRouter>
    <MenuComp />
      <div className='container'>
        <Routes>
          <Route path="/" element={<HomeComp />} />
          <Route path="/list" element={<Boardlist />} />
          <Route path="/view" element={<Boardview />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
