import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../../utils/supabase';

const BoardContext = createContext();

export const useBoard = () => {
  const context = useContext(BoardContext);
  if (!context) {
    throw new Error('BoardProvider 안에 있어야 함');
  }
  return context;
};

export const BoardProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const getPosts = async () => {
    const { data, error } = await supabase.from('posts').select().order('id', { ascending: false });

    if (!error) {
      setPosts(data);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const getPostswithPagination = async (page = 1, size = 10) => {
    const from = (page - 1) * size; // 0, if page =2 -> from = 10
    const to = from + size - 1; // 9, " to = 19

    // error:counterror : error라는 이름 대신 counterror를 사용
    // count 개수
    const { count, error: counterror } = await supabase.from('posts').select('*', { count: 'exact', head: true });
    console.log(count);

    if (counterror) {
      console.error(counterror);
      return { data: [], totalCount: 0, error: counterror };
    }

    // 페이지네이션 데이터조회
    const { data, error } = await supabase.from('posts').select('*').order('id', { ascending: false }).range(from, to);
    // decending는 없음

    if (!error) {
      setPosts(data);
      setTotalCount(count);
      return { data: data, totalCount: count, error: null };
    }

    return { data: [], totalCount: count, error };
  };

  const value = {
    posts,
    totalCount,
    getPosts,
    getPostswithPagination,
  };

  return <BoardContext.Provider value={value}>{children}</BoardContext.Provider>;
};
