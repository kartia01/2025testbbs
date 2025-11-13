import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from './context/UserContext';

function MenuComp() {
  const { user, signOut } = useUser();

  return (
    <>
      <div className="container">
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          {/* <div className="container"> */}
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

              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/img">
                  Image
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
          {/* </div> */}
        </nav>
      </div>
    </>
  );
}

export default MenuComp;
