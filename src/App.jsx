import { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeComp from './page/Home/HomeComp';
import AboutComp from './page/about/AboutComp';
import BoardComp from './page/Board/BoardComp';
import MemberComp from './page/Member/MemberComp';
import { ToastContainer } from 'react-toastify';
import { useUser } from './components/context/UserContext';
import MenuComp from './components/MenuComp';
import ImgboardComp from './page/Imgboard/ImgboardComp';

function App() {
  const { signUp, text, user, signOut, setLoading } = useUser();

  return (
    <BrowserRouter>
      <MenuComp />
      <Routes>
        <Route path="/" element={<HomeComp />} />
        <Route path="/about/*" element={<AboutComp />} />
        <Route path="/board/*" element={<BoardComp />} />
        <Route path="/member/*" element={<MemberComp />} />
        <Route path="/img/*" element={<ImgboardComp />} />
      </Routes>

      <div className="container-fluid py-3 mt-3" style={{ background: 'rgba(218, 218, 218, 1)' }}>
        <div className="container">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt, tempora!</div>
      </div>

      {JSON.stringify(user)}
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}
export default App;
