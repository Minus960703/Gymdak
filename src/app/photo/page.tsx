'use client'

import { getModelList } from '@/api/photoApi';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

function PhotoPage() {
  const [modelList, setModelList] = useState([]);
  const [photoList, setPhotoList] = useState([]);

  useEffect(() => {
    getModelList()
      .then((resolve) => setModelList([...resolve.stocks]));
  },[])
  return (
    <main className='photo__container'>
      <aside className='photo__aside'>
        {modelList.length
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
        {photoList.length
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
        }
      </div>
    </main>
  )
}

export default PhotoPage;