import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import ImglistComp from './ImglistComp';
import ImgWriteComp from './ImgWriteComp';
import ImgviewComp from './ImgviewComp';
import ImgmodiComp from './ImgmodiComp';
import { ImgProvider } from '../../components/context/ImgContext';

function ImgboardComp() {
  return (
    <ImgProvider>
      <div className="Container">
        <div className="d-flex justify-content-center gap-3 mt-3">
          <Link to="../img/imglist" className="nav-link">
            이미지 리스트
          </Link>
          <Link to="../img/imgwrite" className="nav-link">
            이미지 업로드
          </Link>
        </div>

        <Routes>
          <Route index element={<ImglistComp />}></Route>
          <Route path="imglist" element={<ImglistComp />}></Route>
          <Route path="imgwrite" element={<ImgWriteComp />}></Route>
          <Route path="imgview/:id" element={<ImgviewComp />}></Route>
          <Route path="imgmodi/:id" element={<ImgmodiComp />}></Route>
        </Routes>
      </div>
    </ImgProvider>
  );
}

export default ImgboardComp;
