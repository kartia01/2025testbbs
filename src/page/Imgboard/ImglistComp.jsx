import React, { useState } from 'react';
import { useImg } from '../../components/context/ImgContext';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';

function ImglistComp() {
  const { iboard } = useImg();

  // 작성자, 제목, 이미지
  return (
    <div className="container mt-4">
      <h3>이미지 게시판</h3>
      <div className="d-flex justify-content-center gap-3">
        {iboard.map((item, i) => {
          return (
            <Link to={`/img/imgview/${item.id}`} className="nav-link border border-1" key={i}>
              <ul>
                <li>{item.fileurl}</li>
                <li className="ms-1">{item.title}</li>
                <li className="ms-1">{item.name}</li>
                <li>{dayjs(item.created_at).format('YY-MM-DD')}</li>
              </ul>
            </Link>
          );
        })}
      </div>

      <div className="d-flex justify-content-end">
        <div className="d-flex gap-2">
          <Link to="/img/imgwrite" className="btn btn-primary">
            글작성
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ImglistComp;
