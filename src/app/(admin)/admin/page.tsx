'use client';

import { ImageUploader } from '@/components'
import React, { useState } from 'react'

type Props = {}

const AdminMenuObject = [
  {
    id: 1,
    name: '이미지 업로드',
    value: 'uploadImage',
  },
  {
    id: 2,
    name: '예제2',
    value: 'example2',
  },
];

function AdminPage({ }: Props) {
  const [currentPage, setCurrentPage] = useState('example2');
  
  return (
    <main className='admin__container'>
      <aside className='admin__aside'>
        <ul>
          {
            AdminMenuObject.length
            && AdminMenuObject.map((menuItem) => {
                return (
                  <li key={menuItem.id} onClick={() => setCurrentPage(menuItem.value)}>
                    {menuItem.name}
                  </li>
                )
              })
          }
        </ul>
      </aside>
      <div className='admin__view'>
        {
          currentPage === 'uploadImage' 
            ? <ImageUploader />
            : <div>dd</div>
        }
      </div>
    </main>
  )
};

export default AdminPage;