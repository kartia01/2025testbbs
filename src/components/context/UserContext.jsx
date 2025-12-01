import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../../utils/supabase';

// context 생성
const UserContext = createContext();

// useUser hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('userPovider 내부에 있어야 해요!!! ');
  }
  return context;
};

export const UserProvider = ({ children }) => {
  // loading: 로딩 상태 관리
  const [loading, setLoading] = useState(false);
  // user: 현재 로그인한 유저 정보 (supabase.auth.user + user_table 정보 합친 것)
  const [user, setUser] = useState(null);

  // 유저 상세 정보 조회
  const fetchUserInfo = async (userId) => {
    const { data, error } = await supabase.from('user_table').select('*').eq('id', userId).single();

    if (error) return null;
    return data;
  };

  // ★★★★★ 세션 로딩 + 상태 변화 감지
  useEffect(() => {
    let mounted = true;
    console.log('session 준비');
    const loadUser = async () => {
      // 현재 로그인 세션 가져오기
      const { data } = await supabase.auth.getSession();
      //  const session = data;
      console.log(data);

      const session = data?.session ?? null;

      console.log(session?.user ?? null);

      console.log(session?.user.id);

      // 세션에 유저가 있다면 → user_table 정보까지 합쳐서 setUser
      if (session?.user) {
        const extra = await fetchUserInfo(session?.user.id);
        setUser({ ...session.user, ...extra });
      }

      // 로그인/로그아웃 상태 변화 감지
      // 로그인, 로그아웃, 세션 갱신 등 auth 변화가 생기면 자동 실행.
      const { data: sub } = supabase.auth.onAuthStateChange(async (event, session) => {
        // data:sub = data란 이름은 sub로 대신 사용
        if (!mounted) return;

        if (session?.user) {
          const extra = await fetchUserInfo(session?.user.id);
          setUser({ ...session.user, ...extra });
        } else {
          setUser(null);
        }
        // 로그인하면 user 세팅, 로그아웃하면 user = null
      });
      // useEffect의 이벤트성을 정지시킨다.

      // 정리
      return () => {
        mounted = false;
        sub?.subscription?.unsubscribe?.();
        // 컴포넌트가 언마운트 되었을 때 이벤트 구독을 해제.
      };
    };
    loadUser();
  }, []);

  // 회원가입 함수
  const signUp = async (email, password, name, phone, text) => {
    // Supabase auth에 유저 생성
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (!error) {
      const { error: userError } = await supabase
        .from('user_table')
        .insert([{ id: data.user.id, name: name, phone: phone, text: text }])
        // data.user.id = supabase의 auth의 uuid 32
        .select();

      if (!userError) {
        return { error: null };
      } else {
        return { error: userError };
      }
    } else {
      return { error: userError };
    }
  };

  // 로그인 함수
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!error) {
      return { error: null };
    } else {
      return { error };
    }
  };

  // 로그아웃
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Provider로 감싸서 값들 공급
  const value = {
    loading,
    user,
    signUp,
    signIn,
    signOut,
    setLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
