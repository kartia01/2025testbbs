import React, { useState } from 'react';
import { useImg } from '../../components/context/ImgContext';
import { useBoard } from '../../components/context/BoardContext';
import { useNavigate } from 'react-router-dom';

function ImgmodiComp() {
  const { user } = useUser();

  if (!user) {
    return <p>로그인 후 사용 가능합니다.</p>;
  }

  const { getPosts } = useBoard();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    name: user?.name ?? '',
    content: '',
    user_id: user.id,
  });
}

export default ImgmodiComp;
