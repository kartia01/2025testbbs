import React, { useState } from 'react';
import supabase from '../../utils/supabase';
import { toast } from 'react-toastify';

function ImageComp() {
  const [selectfile, setSelectfile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [fileName, setFileName] = useState('+');

  const fileChangeHandler = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    setSelectfile(file ?? null);
    setMessage('');
    setFileName(file.name);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!selectfile) {
      setMessage('전송할 이미지를 선택하세요');
      return;
    }

    const bucket = 'images';
    const filepath = `${Date.now()}_${selectfile.name}`;

    // 파일이름을 uuid + "_" + selectFile.name -> 1888... .png
    // 파일이름을 날짜 + "_" + selectFile.name -> 20251112 .png
    // 파일이름을 난수 + "_" + selectFile.name

    const { error } = await supabase.storage.from(bucket).upload(filepath, selectfile);

    if (error) {
      setMessage('업로드실패 : ' + error.message);
      return;
    } else {
      toast('업로드 완료했습니다.');
    }

    // 파일경로전달받음
    const { data } = supabase.storage.from(bucket).getPublicUrl(filepath);
    console.log(data.publicUrl);
    setUploadUrl(data.publicUrl);
    setFileName('+');
  };

  return (
    <div>
      <h3>이미지 업로드</h3>
      <div>
        <form onSubmit={submitHandler}>
          <div style={{ position: 'relative' }}>
            <label
              htmlFor="photo"
              className="d-felx justify-content-center align-items-center bg-info rounded text-white mb-3"
              style={{ width: '100%', height: '50px' }}
            >
              {fileName}
            </label>
            <input
              type="file"
              accept="image/*"
              id="photo"
              onChange={fileChangeHandler}
              style={{ position: 'absolute', width: '100%', opacity: 0, top: 0 }}
            />
            <button className="btn btn-primary">파일업로드</button>
            <div>{message && <p className="text-danger mt-2">{message}</p>}</div>
            <div>{uploadUrl && <p className="text-danger mt-2">{uploadUrl}</p>}</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ImageComp;
