import { supabase } from '@/supabase/supabaseClient';

const imageLoad = async (instagramId, imageName) => {
  try {
    const { data, error } = await supabase
      .storage
      .from('banner_image')
      .getPublicUrl(`${instagramId}/${imageName}.jpg`);
    
    if (error) {
      throw error;
    }

    return data.publicUrl;
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return null;
  }
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
};

export {
  imageLoad
}