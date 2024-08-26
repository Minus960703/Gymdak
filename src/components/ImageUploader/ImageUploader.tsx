'use client';

import React, { useState } from 'react';
import { supabase } from '@/supabase/supabaseClient';
import { uploadImage } from '@/api/imageUpload';

function ImageUploader() {
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [url, setUrl] = useState(null);
  const [uploadPath, setUploadPath] = useState<'banner' | ''>('');
  const [instagramId, setInstagramId] = useState<string>('lzhxxn');

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const imageUploadFunction = async (uploadPath: 'banner' | '') => {
    // /public 이 아닌, 이름으로 들어갈지, 아니면 인스타그램 아이디로 들어갈 지 결정해보기.. (인스타가 제일 좋긴한데, 인스타 아이디가 바뀌었을 때를 생각하면 한번에 바꾸는 작업이 필요)
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
      const filePath = `/${instagramId}/${fileName}`;
      
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

  // const uploadBannerImage = async () => {
  //   try {
  //     setUploading(true);

  //     if (!image) {
  //       alert('Please select an image to upload');
  //       return;
  //     }

  //     const fileExt = image.name.split('.').pop();
  //     const fileName = `${Date.now()}.${fileExt}`;
  //     const filePath = `/public/${fileName}`;

  //     const { error } = await supabase.storage
  //       .from('banner_image')
  //       .upload(filePath, image);

  //     if (error) {
  //       throw error;
  //     }

  //     const { publicURL, error: urlError } = supabase.storage
  //       .from('banner_image')
  //       .getPublicUrl(filePath);

  //     if (urlError) {
  //       throw urlError;
  //     }

  //     setUrl(publicURL);
  //     alert('File uploaded successfully!');
  //   } catch (error) {
  //     console.error('Error uploading file: ', error);
  //     alert('Error uploading file');
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  return (
    <div>
      {/* <h1>Upload an Image</h1> */}
      <input type="file" onChange={handleFileChange} />
      <button onClick={()=>{imageUploadFunction(uploadPath)}} disabled={uploading}>
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
      {url && (
        <div>
          <p>Uploaded Image URL:</p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </div>
      )}
    </div>
  );
}

export { ImageUploader };