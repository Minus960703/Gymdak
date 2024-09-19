'use client';

import React, { useEffect, useRef, useState } from 'react';
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
  const [uploadInfo, setUploadInfo] = useState({});
  const [selectActive, setSelectActive] = useState({gender: false, model: false});
  const [selectArray, setSelectArray] = useState({ model: [], gender: []});
  const [previewImages, setPreviewImages] = useState(null); // 이미지 미리보기 URL
  const fileInputRef = useRef(null);

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
    // 다중 인서트 해결 ,
    // 딜리트 로직 작성 필요,
    // 파일 재선택 시 파일 관련해서 남아있도록 배열 수정하는 것 해결 ( 임시저장 )
    // 업로드 완료 시 업로드 완료라고 표기 또는 모달창으로 게시글로 이동하냐고 알림 필요
    // 
    if (validateRequiredFields()) { 
      setUploading(true);

      const uploadStoragePath = uploadPath === 'banner' ? 'banner_image' : 'image_files';
      const uploadedFilePaths = []; // 업로드된 파일 경로를 추적
      const uploadedImageData = []; // 업로드된 파일 데이터베이스 정보 저장

      try {
        for (const image of images) {
          const fileExt = image.name.split('.').pop();
          const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
          const filePath = `/${uploadInfo?.instagramId}/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from(uploadStoragePath)
            .upload(filePath, image);

          if (uploadError) throw uploadError;

          const { error: urlError } = supabase.storage
            .from(uploadStoragePath)
            .getPublicUrl(filePath);

          if (urlError) throw urlError;

          uploadedFilePaths.push(filePath); // 업로드된 파일 경로 저장

          const { data, error: dbError } = await supabase
            .from('photo_post')
            .insert({
              image_file: fileName,
              model_name: uploadInfo?.instagramId,
            });

          if (dbError) throw dbError;

          uploadedImageData.push(data);
        }
        alert('File uploaded successfully!');
      } catch (error) {
        // 오류 발생 시, 업로드된 모든 파일 삭제 및 데이터베이스 롤백 처리
        await Promise.all(
          uploadedFilePaths.map(async (filePath) => {
            await supabase.storage.from(uploadStoragePath).remove([filePath]); // 업로드된 파일 삭제
          })
        );

        // TODO: 데이터베이스에서 삽입된 데이터 삭제 로직 추가
        // await Promise.all(
        //   uploadedImageData.map(async (data) => {
        //     await supabase
        //       .from('images') // 'images'는 테이블 이름 예시
        //       .delete()
        //       .eq('id', data.id); // 삭제하려는 데이터의 ID로 조건 설정
        //   })
        // );

        alert('File upload failed. All changes rolled back.');
      } finally {
        setUploading(false);
      }
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

  const clickUploadSection = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  const validateRequiredFields = () => {
    if (!images.length) { 
      alert('업로드 할 이미지가 1장도 존재 하지 않습니다.');
      return false;
    }

    if (!uploadInfo?.model) {
      alert('모델 선택이 필요합니다.');
      return false;
    }

    if (!uploadInfo?.gender) {
      alert('성별 입력이 필요합니다.');
      return false;
    }

    return true;
  }

  // <></>로 감싸서 불필요한 section.upload__container 제거 ( 이미 article로 page에서 묶음 ) 
  return (
    <section className={styles.upload__container}>
      <section
        className={`${styles.drag__zone} ${previewImages?.length ? styles.preview : undefined}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={()=>clickUploadSection()}
      >
        {previewImages?.length
          ? previewImages?.map((src, index) => (
              <img key={index} src={src} alt={`미리보기 ${index}`} className={styles.image__file} /> // 여러 이미지 미리보기
            ))
          : <span>이미지를 여기에 드래그 앤 드롭하세요</span>
        }
      </section>
      <input type="file" onChange={handleFileChange} multiple ref={fileInputRef} />
      <SelectArea
        title={'모델'}
        required={true}
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
        required={true}
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
      <Button value={'업로드'} onClickEvent={imageUploadFunction}/>
    </section>
  );
}

function SelectArea({children, title, required}) {
  return (
    <section className={styles.select__container}>
      <h3>
        {title}
        {required && <span>*</span>}
      </h3>
      {children}
    </section>
  )
}

export { ImageUploader };