import { supabase } from '@/supabase/supabaseClient';

export const loadImage = async () => {
  try {
    const { data, error } = await supabase
      .storage
      .from('banner_image')
      .getPublicUrl('public/1723434220560.jpg');
    
    if (error) {
      throw error;
    }

    return data.publicUrl;
  } catch (error) {
    console.error('Error fetching image URL:', error);
    return null;
  }
};