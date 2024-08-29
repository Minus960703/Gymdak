'use client';

import React, { useContext            } from 'react'
import { ModelStateContext            } from '@/context/ModelStateContext';
import styles                           from './PhotoAside.module.scss'

function PhotoAside({ modelList }) {
  const { model, onClickModelButton } = useContext(ModelStateContext);

  return (
    <>
      <aside className='photo__aside'>
        {modelList?.length
          &&
          <ul>
            <li
              className={model === '' ? styles.active : undefined}
              onClick={() => onClickModelButton('')}
            >
              전체
            </li>
            {
              modelList.map((currentModel) => {
                return (
                  <li
                    className={currentModel.instagram === model ? styles.active : undefined}
                    key={currentModel.id}
                    onClick={() => onClickModelButton(currentModel.instagram)}>
                    {currentModel.name}
                  </li>
                )
              })
            }
          </ul>
        }
      </aside>
      <div className='photo__line' />
    </>
  )
}

export { PhotoAside };