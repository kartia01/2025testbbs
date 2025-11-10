import { useState, useEffect } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeComp from './page/Home/HomeComp';
import AboutComp from './page/about/AboutComp';
import BoardComp from './page/Board/BoardComp';
import MemberComp from './page/Member/MemberComp';
import { ToastContainer } from 'react-toastify';
import { useUser } from './components/context/UserContext';

function App() {
  const { signUp, text, user, signOut, setLoading } = useUser();

  return (
    <BrowserRouter>
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <a className="navbar-brand" href="#">
              LOGO
            </a>
            {/* <button onClick={signUp}>{text}</button> */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/about">
                    About
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/board">
                    Board
                  </Link>
                </li>

                {/* <li className="nav-item">
                  <Link className="nav-link" to="/member">
                    Member
                  </Link>
                </li> */}

                {user && (
                  <>
                    <li className="d-flex align-items-center gap-3">
                      <span>{user?.name}님 안녕하세요</span>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={async () => {
                          await signOut();
                        }}
                      >
                        로그아웃
                      </button>
                    </li>
                  </>
                )}
                {!user && (
                  <>
                    <li className="d-flex align-items-center">
                      <Link className="nav-link" to="/member/signin">
                        로그인
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomeComp />} />
          <Route path="/about/*" element={<AboutComp />} />
          <Route path="/board/*" element={<BoardComp />} />
          <Route path="/member/*" element={<MemberComp />} />
        </Routes>
      </div>

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
