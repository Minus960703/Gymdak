import Image from 'next/image';
import React, { useState } from 'react'
import { supabase } from '@/supabase/supabaseClient';
import { ModelProps, getModelList } from '@/api/photoApi';

async function PhotoPage() {
  const modelList: ModelProps[] = await getModelList() || [];
  // const [selectModel, setSelectModel] = useState()
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
      <div className='photo__line' />
      <div className='photo__area'>
        <div className='photo__filter'>

        </div>
        <div className='photo__view'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          {/* <div></div> */}
        </div>
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