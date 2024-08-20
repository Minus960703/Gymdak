'use client'

import { getModelList } from '@/api/photoApi';
import React, { useEffect, useState } from 'react'

function PhotoPage() {
  const [modelList, setModelList] = useState([]);
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
        ss
      </div>
    </main>
  )
}

export default PhotoPage;