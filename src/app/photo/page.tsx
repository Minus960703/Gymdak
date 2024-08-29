import React                        from 'react'
import { ModelProps, getModelList } from '@/api/photoApi';
import { PhotoAside } from '@/components/PhotoAside/PhotoAside';
import { ModelStateProvider } from '@/context/ModelStateContext';

const PhotoView = () => {
  return (
    <div>
      
    </div>
  )
}

async function PhotoPage() {
  const modelList: ModelProps[] = await getModelList() || [];

  return (
    <main className='photo__container'>
      <ModelStateProvider>
        <PhotoAside modelList={modelList} />
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
      </ModelStateProvider>
    </main>
  )
}

export default PhotoPage;