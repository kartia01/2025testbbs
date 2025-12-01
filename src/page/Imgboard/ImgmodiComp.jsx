import React, { useState } from 'react';
import { useImg } from '../../components/context/ImgContext';
import { useBoard } from '../../components/context/BoardContext';
import { useNavigate, useParams } from 'react-router-dom';

function ImgmodiComp() {
  const {id} = useParams;
  const { getPosts } = useBoard();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    name: '',
    content: '',
    filename: '',
    fileurl: '',
  });
}

export default ImgmodiComp;
