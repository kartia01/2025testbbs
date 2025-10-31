import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

function ListComp({ posts }) {
  return (
    <div>
      <h3>post</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col" style={{ width: '30px' }}>
              No
            </th>
            <th scope="col" style={{ width: '60%' }}>
              Subject
            </th>
            <th scope="col">name</th>
            <th scope="col">date</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((item, i) => {
            <tr key={i}>
              <th scope="row">{posts.length - i}</th>
              <td>
                <Link to={`/board/view/${item.id}`} className="nav-link">
                  {item.title}
                </Link>
              </td>
              <td>{item.name}</td>
              <td>{dayjs(item.created_at).format('YY-MM-DD')}</td>
            </tr>;
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <div className="d-flex gap-2">
          <Link to="/board/write" className="btn btn-primary">
            글작성
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ListComp;
