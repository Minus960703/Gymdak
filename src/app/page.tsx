'use client'

import { ImageUploader } from '@/components';
import { MainLayout } from './layouts/MainLayout';
import { loadImage } from '@/api/imageLoad';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components';

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
    const handleScroll = () => {
      if (window.scrollY > 0) {
        console.log('hi');
      } else {

      }
    }
    window.addEventListener('scroll', handleScroll);

    fetchImage();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    }

  }, []);
  
  const moveToPage = () => {
    const url = 'https://open.kakao.com/o/sqELf7Jg';
    const target = '_blank';
    window.open(url, target);
  }

  return (
    <main className='home__container'>
      <MainLayout>
        <Button value={'카카오톡 상담하기'} onClickEvent={() => moveToPage()}/>
        <div className='home__view'>
          {imageUrl
            && <Image
                src={imageUrl}
                style={{ width: 'auto', height: '100%' }}
                layout='intrinsic'
                width={500}
                height={1380}
                alt='bannerImage'
                sizes='100%'
              />
          }
          {/* {imageUrl.length
            && imageUrl.map((image) => {
                return (
                  <Image src={image.url} key={image.id} width={100} height={100}/>
                )
            })
          } */}
        </div>
      </MainLayout>
    </main>
  );
}
