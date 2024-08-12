'use client'

import { ImageUploader } from '@/components';
import { MainLayout } from './layouts/MainLayout';
import { loadImage } from '@/api/imageLoad';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Home() {
  // console.log(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  // const [imageUrl, setImageUrl] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await loadImage();
        setImageUrl(url);
        // setImageUrl((prev) => { return [...prev, { url }] });
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    fetchImage();
  }, []);
  
  return (
    <main>
      <MainLayout>
        {imageUrl
          && <Image
              src={imageUrl}
              // style={{ width: 'auto', height: '100%' }}
              layout='intrinsic'
              width={500}
              height={1380}
              alt='bannerImage'
              // sizes='100%'
            />
        }
        {/* {imageUrl.length
          && imageUrl.map((image) => {
              return (
                <Image src={image.url} key={image.id} width={100} height={100}/>
              )
           })
        } */}
        {/* <ImageUploader /> */}
      </MainLayout>
    </main>
  );
}
