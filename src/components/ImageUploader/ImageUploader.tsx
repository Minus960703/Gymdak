'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabaseClient';
import { Select } from '@/components';
import { getModelList } from '@/api/photoApi';

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(null);
  const [uploadPath, setUploadPath] = useState<'banner' | ''>('');
  const [uploadInfo, setUploadInfo] = useState({});
  const [selectActive, setSelectActive] = useState<boolean>(false);
  const [selectArray, setSelectArray] = useState([]);

  useEffect(() => {
    getModelList()
      .then((resolve) => {
        setSelectArray([...resolve]);
        setUploadInfo((prev) => {
          return {...prev, fullName: `${resolve[0].instagram}(${resolve[0].name})`, instagramId: resolve[0].instagram}
        })
      });
  }, [])

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const imageUploadFunction = async (uploadPath: 'banner' | '') => {
    // 인스타 아디로 하고, 한번에 바뀌었을때는 말 그대로 저기 뭐야 이름.. 관리자페이지에서 수정하도록 변경하기
    // 사진 업로드 시 사진을 모델명, 인스타그램 아이디, 성별 등등 입력하도록 하기
    // 여러장 업로드 같이 할 수 있도록 하기.. ( 방법 찾아보기 )
    // 드래그앤 드랍.
    // 사진 미리보기 기능 만들기
    if (!image) {
      alert('업로드 할 이미지를 선택해 주세요');
      return;
    }
    setUploading(true);

    const uploadStoragePath = uploadPath === 'banner' ? 'banner_image' : 'image_files';
    try {
      const fileExt = image.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      // const filePath = `/${uploadPath}/${fileName}`;
      const filePath = `/${uploadInfo?.instagramId}/${fileName}`;
      
      const { error } = await supabase.storage
        .from(uploadStoragePath)
        .upload(filePath, image);

      if (error) {
        throw error;
      }

      const { publicURL, error: urlError } = supabase.storage
        .from(uploadStoragePath)
        .getPublicUrl(filePath);

      if (urlError) {
        throw urlError;
      }

      setUrl(publicURL);
      alert('File uploaded successfully!');
    } catch (error) {
      
    } finally {
      setUploading(false);
    }
  }
  
  const isChangeSelectActive = () => {
    setSelectActive((prev) => !prev);
  }

  const isChangeSelectBoxItems = () => {
    
  }

  return (
    <div>
      {/* <h1>Upload an Image</h1> */}
      <input type="file" onChange={handleFileChange} />
      <button onClick={()=>{imageUploadFunction(uploadPath)}} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      <Select
        possibleAll={false}
        selectOption={uploadInfo?.fullName}
        selectActive={selectActive}
        selectArray={selectArray}
        isChangeSelectBoxItems={isChangeSelectBoxItems}
        isChangeSelectActive={isChangeSelectActive}
      />
      {/* <Select
        possibleAll={false}
        selectOption={uploadInfo?.gender}
        selectActive={selectActive}
        selectArray={selectArray}
        isChangeSelectBoxItems={isChangeSelectBoxItems}
        isChangeSelectActive={isChangeSelectActive}
      /> */}
      
      {/* {url && (
        <div>
          <p>Uploaded Image URL:</p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </div>
      )} */}
    </div>
  );
}

export { ImageUploader };