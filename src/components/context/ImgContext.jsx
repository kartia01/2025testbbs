import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '../../utils/supabase';

const ImgContext = createContext();

export const useImg = () => {
  const icontext = useContext(ImgContext);
  if (!icontext) {
    throw new Error('ImgProvider 안에 있어야 함');
  }
  return icontext;
};

export const ImgProvider = ({ children }) => {
  const [iboard, setIboard] = useState([]);

  const getImg = async () => {
    const { data, error } = await supabase.from('imgboard').select().order('id', { ascending: false });

    if (!error) {
      setIboard(data);
    }
  };

  

  useEffect(() => {
    getImg();
  }, []);

  const value = {
    iboard,
    getImg,
  };

  return <ImgContext.Provider value={value}>{children}</ImgContext.Provider>;
};
