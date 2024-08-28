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
    .select('*');

  if (error) {
    console.error(error)
    return [];
  }

  return stocks as ModelProps[];
};

// 나중에 모델 추가 시 필요한 값 .
/*{
  const { data, error } = await supabase
  .from('your_table')
  .update({ your_column: 1 })
  .increment('your_column') id.
  .match({ id: 1 });
}* */

export {
  getModelList
};