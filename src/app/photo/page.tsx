'use client'

import { getModelList } from '@/api/photoApi';
import React, { useEffect } from 'react'

function PhotoPage() {
  useEffect(() => {
    getModelList()
      .then((resolve) => console.log(resolve));
  },[])
  return (
    <main className='photo__container'>
      <aside className='photo__aside'>
        1</aside>
      <div className='photo__view'>
        ss
      </div>
    </main>
  )
}

export default PhotoPage;