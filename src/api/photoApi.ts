import { supabase } from '@/supabase/supabaseClient'

export interface ModelProps {
  id: number;
  name: string;
  gender: 'M' | 'F';
  instagram: string;
};

const getModelList = async () => {
  const { data: stocks, error } = await supabase
    .from('photo_model')
    .select('*')

  if (error) {
    console.error(error)
    return [];
  }

  return stocks as ModelProps[];
};

export {
  getModelList
};