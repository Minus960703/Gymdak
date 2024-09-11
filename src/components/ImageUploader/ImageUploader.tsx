'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/supabase/supabaseClient';
import { Button, Select } from '@/components';
import { getModelList } from '@/api/photoApi';
import styles from './ImageUploader.module.scss';

const GenderArray = [
  {
    id: 1,
    gender: 'M'
  },
  {
    id: 2,
    gender: 'F'
  }
]

function ImageUploader() {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [urls, setUrls] = useState(null);
  const [uploadPath, setUploadPath] = useState<'banner' | ''>('');
  const [uploadInfo, setUploadInfo] = useState({});
  const [selectActive, setSelectActive] = useState({gender: false, model: false});
  const [selectModelActive, setSelectModelActive] = useState(false);
  const [selectArray, setSelectArray] = useState({ model: [], gender: []});
  const [previewImages, setPreviewImages] = useState(null); // 이미지 미리보기 URL

  useEffect(() => {
    getModelList()
      .then((resolve) => {
        setSelectArray((prev) => { return { model: [...resolve], gender: [...GenderArray] } });
        setUploadInfo((prev) => {
          return {
            ...prev,
            fullName: `${resolve[0].instagram}(${resolve[0].name})`,
            instagramId: resolve[0].instagram,
            gender: resolve[0].gender,
          }
        })
      });
  }, [])

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setImages(files);
    previewImagefiles(files);
  };

  const previewImagefiles = (files) => {
    const newPreviewSrcs = files.map((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      return new Promise((resolve) => {
        reader.onloadend = () => {
          resolve(reader.result);
        };
      });
    });

    Promise.all(newPreviewSrcs).then((results) => setPreviewImages(results));
  };

  const imageUploadFunction = async (uploadPath: 'banner' | '') => {
    // 인스타 아디로 하고, 한번에 바뀌었을때는 말 그대로 저기 뭐야 이름.. 관리자페이지에서 수정하도록 변경하기
    // 사진 업로드 시 사진을 모델명, 인스타그램 아이디, 성별 등등 입력하도록 하기
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
  
  const isChangeSelectActive = (name) => {
    setSelectActive((prev) => { return { ...prev, [name]: !prev[name]} });
  }

  const isChangeSelectBoxItems = (name, value, fullName) => {
    if (name === 'model') {
      setUploadInfo((prev) => {
        return { ...prev, [name]: value, fullName}
      })
    } else {
      setUploadInfo((prev) => {
        return { ...prev, [name]: value}
      })
    }
    setSelectActive((prev) => { return { ...prev, [name]: !prev[name] } });
  }

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const files = Array.from(event.dataTransfer.files);
    setImages(files);
    previewImagefiles(files); // 드래그 앤 드롭 시 여러 이미지 미리보기 설정
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  return (
    <div className={styles.upload__container}>
      <div
        className={`${styles.drag__zone} ${previewImages?.length ? styles.preview : undefined}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {previewImages?.length
          ? previewImages?.map((src, index) => (
              <img key={index} src={src} alt={`미리보기 ${index}`} className={styles.image__file} /> // 여러 이미지 미리보기
            ))
          : <span>이미지를 여기에 드래그 앤 드롭하세요</span>
        }
      </div>
      <input type="file" onChange={handleFileChange} multiple/>
      <SelectArea
        title={'모델'}
      >
        <Select
          possibleAll={false}
          selectOption={uploadInfo?.fullName}
          selectActive={selectActive.model}
          selectArray={selectArray?.model}
          name={'model'}
          isChangeSelectBoxItems={isChangeSelectBoxItems}
          isChangeSelectActive={() => isChangeSelectActive('model')}
        />
      </SelectArea>
      <SelectArea
        title={'성별'}
      >
        <Select
          possibleAll={false}
          selectOption={uploadInfo?.gender === 'M' ? '남성' : '여성'}
          selectActive={selectActive.gender}
          selectArray={selectArray?.gender}
          name={'gender'}
          isChangeSelectBoxItems={isChangeSelectBoxItems}
          isChangeSelectActive={() => isChangeSelectActive('gender')}
        />
      </SelectArea>
      <Button value={'업로드'} onClickEvent={()=>{}}/>
    </div>
  );
}

function SelectArea({children, title}) {
  return (
    <div className={styles.select__container}>
      <h3>{title}</h3>
      {children}
    </div>
  )
}

export { ImageUploader };