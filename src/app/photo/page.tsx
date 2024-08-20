import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { supabase } from '@/supabase/supabaseClient';

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

async function PhotoPage() {
  const modelList: ModelProps[] = await getModelList() || [];
  console.log(modelList);
  return (
    <main className='photo__container'>
      <aside className='photo__aside'>
        {modelList?.length
          &&
              <ul>
                {
                  modelList.map((model) => {
                    return (
                      <li key={model.id}>
                        {model.name}
                      </li>
                    )
                  })
                }
              </ul>
        }
      </aside>
      <div className='photo__view'>
        {/* {photoList.length
          ? 
            <div>
            {
              photoList.map((photo) => {
                return (
                  <div key={photo.id}>
                    <Image
                      src={''}
                      // style={{ width: 'auto', height: '100%' }}
                      layout='intrinsic'
                      width={500}
                      height={1380}
                      alt='bannerImage'
                      // sizes='100%'
                    />
                  </div>
                )
              })
            }
            </div>
          : <div>
            존재하는 사진이 없습니다.
          </div>
        } */}
      </div>
    </main>
  )
}

export default PhotoPage;