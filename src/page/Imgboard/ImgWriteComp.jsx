import React, { useRef, useState } from 'react';
import { useImg } from '../../components/context/ImgContext';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../../utils/supabase';
import { useUser } from '../../components/context/UserContext';
import { toast } from 'react-toastify';

function ImgWriteComp() {
  const { user } = useUser();

  if (!user) {
    return <p>로그인 후 이용 가능합니다.</p>;
  }

  const [selectfile, setSelectfile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [fileName, setFileName] = useState('+');

  const [preview, setPreview] = useState('');

  const fileInputRef = useRef(null);

  const fileChangeHandler = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0];
    setSelectfile(file ?? null);
    setMessage('');
    setFileName(file.name);

    // 미리보기
    setPreview(URL.createObjectURL(file));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!selectfile) {
      setMessage('전송할 이미지를 선택하세요');
      return;
    }

    const bucket = 'images';
    const table = 'imgboard';
    const filepath = `${Date.now()}_${selectfile.name}`;

    const { error } = await supabase.storage.from(bucket).upload(filepath, selectfile);

    if (error) {
      setMessage('업로드실패 : ' + error.message);
      return;
    } else {
      const { data, error: urlErr } = await supabase.storage.from(bucket).getPublicUrl(filepath);
      setUploadUrl(data.publicUrl);

      if (!urlErr) {
        const { error: insertErr } = await supabase.from(table).insert({ filename: fileName, fileurl: uploadUrl });

        if (!insertErr) {
          toast('업로드 완료되었습니다.');
          setFileName('+');
        }
      } else {
      }
    }
  };

  const clearPreview = () => {
    setPreview('');
    setSelectfile(null);
    setFileName('+');
    fileInputRef.current.value = '';
  };

  const { getImg } = useImg();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    name: user?.name ?? '',
    content: '',
    filename: fileName,
    fileurl: uploadUrl,
    user_id: user.id,
  });

  const eventHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const ClickHandler = (e) => {
    e.preventDefault();
    const createWrite = async () => {
      const { data, error } = await supabase
        .from('imgboard')
        .insert([
          {
            title: formData.title,
            name: formData.name,
            content: formData.content,
            filename: fileName,
            fileurl: uploadUrl,
            user_id: formData.user_id,
          },
        ])
        .select();

      if (!error) {
        alert('글작성성공');
        navigate('/img/imglist');
        getImg();
      }
    };
    createWrite();
  };

  return (
    <div className="container">
      <h3>글작성</h3>
      <div>
        <form onSubmit={submitHandler}>
          <div style={{ position: 'relative' }}>
            <label
              htmlFor="photo"
              className="d-flex justify-content-center align-items-center bg-info rounded text-white mb-3"
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
              ref={fileInputRef}
            />
          </div>

          {preview && (
            <>
              <div
                className="mb-3 position-relative bg-info shadow"
                style={{ width: '100px', height: '100px', borderRadius: '10px', overflow: 'hidden' }}
              >
                <div
                  className="bg-white btn-sm position-absolute"
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '10px',
                    lineHeight: '10px',
                    right: '5px',
                    top: '5px',
                  }}
                  onClick={clearPreview}
                >
                  X
                </div>
                <img src={preview} style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
              </div>
            </>
          )}

          <button className="btn btn-primary">파일업로드</button>
          <div>{message && <p className="text-danger mt-2">{message}</p>}</div>
          <div>{uploadUrl && <p className="text-danger mt-2">{uploadUrl}</p>}</div>
        </form>
        <form onSubmit={ClickHandler}>
          <div>
            <label htmlFor="title" className="form-label">
              제목
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="form-control"
              placeholder="제목을 입력하세요"
              required
              onChange={eventHandler}
            />
          </div>
          <div>{formData.title}</div>
          <div>
            <label htmlFor="name" className="form-label">
              이름
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              placeholder="이름을 입력하세요"
              required
              onChange={eventHandler}
              value={user?.name ?? ''}
              disabled={user?.name}
            />
          </div>
          <div>{formData.name}</div>
          <div>
            <label htmlFor="content" className="form-label">
              내용
            </label>
            <textarea
              type="text"
              id="content"
              name="content"
              className="form-control"
              placeholder="내용을 입력하세요"
              rows="6"
              required
              onChange={eventHandler}
            />
          </div>
          <div className="d-flex justify-content-end mt-3">
            <div className="d-flex gap-2">
              <Link to="/img/imglist" className="btn btn-danger">
                취소
              </Link>
              <button className="btn btn-primary">글작성</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ImgWriteComp;
