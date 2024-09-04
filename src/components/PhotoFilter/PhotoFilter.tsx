'use client'

import React from 'react'
import { Select } from '@/components';
import styles from './PhotoFilter.module.scss';

function PhotoFilter() {
  return (
    <div className={styles.photo__filter}>
      <Select
        possibleAll={true}
        // selectOption={uploadInfo?.fullName}
        // selectActive={selectActive}
        // selectArray={selectArray}
        // isChangeSelectBoxItems={isChangeSelectBoxItems}
        // isChangeSelectActive={isChangeSelectActive}
      />
      <Select
        possibleAll={true}
        // selectOption={uploadInfo?.fullName}
        // selectActive={selectActive}
        // selectArray={selectArray}
        // isChangeSelectBoxItems={isChangeSelectBoxItems}
        // isChangeSelectActive={isChangeSelectActive}
      />
      <Select
        possibleAll={true}
        // selectOption={uploadInfo?.fullName}
        // selectActive={selectActive}
        // selectArray={selectArray}
        // isChangeSelectBoxItems={isChangeSelectBoxItems}
        // isChangeSelectActive={isChangeSelectActive}
      />
    </div>
  )
}

export { PhotoFilter };