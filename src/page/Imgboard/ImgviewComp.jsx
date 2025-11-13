import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import supabase from "../../utils/supabase";
import dayjs from "dayjs";

function ImgviewComp() {
  const params = useParams();
  const { id } = useParams();
  console.log(params);
  const [img, setImg] = useState({});

  useEffect(() => {
    const imgData = async () => {
      const { data, error } = await supabase
        .from("imgboard")
        .select("*")
        .eq("id", Number(id))
        .single();
      console.log(data);
      setImg(data);
    };
    imgData();
  }, []);

  return (
    // 사용할 것 : img파일, title, name, content
    <div className="container">
      <h3>이미지 보기</h3>
      <hr />
      <div>
        {img.fileurl ? (
          <img
            src={img.fileurl}
            alt={img.filename}
            style={{
              width: "300px",
              height: "300px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        ) : (
          <p>이미지를 불러올 수 없습니다.</p>
        )}
        <h4>{img.title}</h4>
        <div>
          {img.name} / {dayjs(img.created_at).format("YY.MM.DD hh:mm")}
        </div>
        <hr />
        <p>{img.content}</p>
      </div>

      <div className="d-flex justify-content-end">
        <div className="d-flex gap-2">
          <Link to="/img/imglist" className="btn btn-primary">
            리스트
          </Link>
          <Link to={`/img/imgmodi/${id}`} className="btn btn-info">
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

export default ImgviewComp;
