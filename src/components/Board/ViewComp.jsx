import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ViewComp() {
  const [view, setView] = useState({});
  return (
    <div>
      <h3>글보기</h3>
      <hr />
      <div className="d-flex flex-column flex-md-row justify-content-between">
        <h4>{view.title}</h4>
        <div>
          {view.name} / {dayjs(view.created_at).format('YY.MM.DD hh:mm')}
        </div>
        <hr />
        <p style={{ 'min-height': '200px' }}>{view.content}</p>
      </div>

      <div className="d-flex justify-content-end">
        <div className="d-flex gap-2">
          <Link to="/board/list" className="btn btn-primary">
            글리스트
          </Link>

          <Link to="/board/modi" className="btn btn-warning">
            수정
          </Link>

          <Link to="" className="btn btn-danger">
            삭제
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ViewComp;
