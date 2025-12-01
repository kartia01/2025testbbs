import React, { useState } from "react";
import { useImg } from "../../components/context/ImgContext";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

function ImglistComp() {
  const { iboard } = useImg();

  // 작성자, 제목, 이미지
  return (
    <div className="container mt-4">
      <h3>이미지 게시판</h3>
      <div className="row">
        {iboard && iboard.length > 0 ? (
          iboard.map((item, i) => (
            <div className="col-12 col-md-4 mb-3" key={i}>
              <Link
                to={`/img/imgview/${item.id}`}
                className="nav-link border border-1"
              >
                {item.fileurl ? (
                  // || (논리 OR 연산자)는 **"왼쪽 값이 없으면 오른쪽 값을 대신 써라
                  <img src={item.fileurl} alt={item.title || "image"} />
                ) : (
                  <div>no image</div>
                )}
                <ul>
                  <li className="ms-1">{item.title}</li>
                  <li className="ms-1">{item.name}</li>
                  <li>{dayjs(item.created_at).format("YY-MM-DD")}</li>
                </ul>
              </Link>
            </div>
          ))
        ) : (
          <p>등록된 이미지가 없습니다.</p>
        )}
      </div>

      <div className="d-flex justify-content-end">
        <div className="d-flex gap-2">
          <Link to="/img/imgwrite" className="btn btn-primary mt-3">
            글작성
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ImglistComp;
