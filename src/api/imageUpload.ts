import { supabase } from '@/supabase/supabaseClient';

const sanitizeFileName = (name) => {
  return name.replace(/[^a-zA-Z0-9.]/g, '_');
};

export const uploadImage = async (file) => {
  const fileName = `${Date.now()}_${sanitizeFileName(file.name)}`;
  console.log(fileName);
  const { data, error } = await supabase
    .storage
    .from('banner_image') // Replace with your bucket name
    .upload(fileName, file);

  if (error) {
    throw error;
  }

  const { publicURL, error: urlError } = supabase.storage
    .from('banner_image') // Replace with your bucket name
    .getPublicUrl(data.path);

  if (urlError) {
    throw urlError;
  }

  return publicURL;
};