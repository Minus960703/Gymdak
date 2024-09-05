'use client'

import { MainLayout } from './layouts/MainLayout';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components';
import { imageLoad } from '@/api/imageControl';

export default function Home() {
  const [imageUrl, setImageUrl] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const url = await imageLoad('public', '1723434220560');
        setImageUrl(url);
        // setImageUrl((prev) => { return [...prev, { url }] });
      } catch (error) {
        console.error('Error loading image:', error);
      }
    };

    fetchImage();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const moveToPage = () => {
    const url = 'https://open.kakao.com/o/sqELf7Jg';
    const target = '_blank';
    window.open(url, target);
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Adds smooth scrolling effect
    });
  };

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
      { 
        isScrolled 
        && <button
            className='top__btn'
            onClick={scrollToTop}
          >
            <span></span>
            <span></span>
            {/* arrow */}
          </button>
      }
    </main>
  );
}
