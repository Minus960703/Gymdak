import { supabase } from '@/supabase/supabaseClient';

export const loadImage = async (instagramId, imageName) => {
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