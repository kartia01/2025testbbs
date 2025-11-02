import { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import HomeComp from "./components/HomeComp";
import AboutComp from "./components/about/AboutComp";
import BoardComp from "./components/Board/BoardComp";


function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container">
            <a className="navbar-brand" href="#">
              LOGO
            </a>
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
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/about"
                  >
                    About
                  </Link>
                </li>

                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/list"
                  >
                    Board
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<HomeComp />} />
          <Route path="/about/*" element={<AboutComp />} />
          <Route path="/board/*" element={<BoardComp />} />
        </Routes>
      </div>
      <div className="container">footer</div>
    </BrowserRouter>
  );
}
export default App;
