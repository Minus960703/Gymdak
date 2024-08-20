import { supabase } from '@/supabase/supabaseClient'

const getModelList = async () => {
  const { data: stocks, error } = await supabase
    .from('photo_model')
    .select('*')

  if (error) {
    console.error(error)
    return { props: { stocks: [] } }
  }

  return {
      stocks,
  }
};

export { getModelList };