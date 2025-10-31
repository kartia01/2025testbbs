import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import supabase from '../../utils/supabase';
import WriteComp from './WriteComp';
import ViewComp from './ViewComp';
import ListComp from './ListComp';
import ModiComp from './ModiComp';

function BoardComp() {
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const { data, error } = await supabase.from('posts').select().order('id', { ascending: false });
    console.log(data);
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="container">
      <div
        style={{ width: '100%', height: '200px' }}
        className="de-flex justify-content-center align-items-center bg-info rounded mb-3"
      >
        Board
      </div>

      <div className="d-flex justify-content-center gap-3">
        <Link to="../board/list" className="nav-link">
          글리스트
        </Link>
        <Link to="../board/list" className="nav-link">
          글작성
        </Link>
      </div>
      <Routes>
        <Route index element={<ListComp posts={posts} />}></Route>
        <Route path="list" element={<ListComp posts={posts} />}></Route>
        <Route path="write" element={<WriteComp getPosts={getPosts} />}></Route>
        <Route path="view/:id" element={<ViewComp />}></Route>
        <Route path="modify/:id" element={<ModiComp />}></Route>
      </Routes>
      <div className="container-fluid py-3 mt-3" style={{ background: 'rgba(218, 218, 218, 1)' }}>
        <div className="container">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sunt, tempora!</div>
      </div>
    </div>
  );
}

export default BoardComp;
