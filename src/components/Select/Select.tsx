'use client'

import React, { useEffect, useRef } from 'react'
import styles from './Select.module.scss';
import { IconImage } from '@/components';

interface SelectProps {
	selectOption: string;
	selectActive: boolean;
	isChangeSelectActive: () => void;
	isChangeSelectBoxItems: (name: string, value: string, fullName?: string | null) => void;
	selectArray: Array<{ id: string; name: string; value?: string }>;
	name: string;
	filter?: boolean;
	possibleAll?: boolean;
}

function Select({
	selectOption,
	selectActive,
	selectArray,
	name,
	isChangeSelectActive,
	isChangeSelectBoxItems,
	filter = false,
	possibleAll = true
}: SelectProps) {
	const selectRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        // 컴포넌트 외부를 클릭한 경우
        isChangeSelectActive(); // 선택 상자를 닫는 함수 호출
      }
    };

    if (selectActive) {
      document.addEventListener('mousedown', handleClickOutside); // 마우스 다운 이벤트 리스너 추가
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // 이벤트 리스너 제거
    };
	}, [selectActive, isChangeSelectActive])
  return (
		<ul
			ref={selectRef}
      className={
        `${styles.select} ${selectActive ? styles['select--active'] : undefined}`
      }
      onClick={isChangeSelectActive}
    >
      <p>{(possibleAll ? '' :selectOption) || '전체'}</p>
			<div
				className={`${styles.select__option} ${selectActive ? styles['select__option--active'] : undefined}`}
				onClick={(e) => e.stopPropagation()}
			>
				{filter && <p onClick={() => isChangeSelectBoxItems(name, '')}>전체</p>}
				{selectArray?.map((selectItem) => (
					<p
						key={selectItem.id}
						onClick={() => isChangeSelectBoxItems(
							name,
							name === 'model' ? selectItem?.instagram : selectItem.gender,
							name === 'model' ? `${selectItem.instagram}(${selectItem.name})` : null)}
					>
						{name === 'model'
							? `${selectItem.instagram}(${selectItem.name})`
							: selectItem.gender === 'M' ? '남성' : '여성'
						}
					</p>
				))}
			</div>
			<button className={styles.btn__arrow}>
				{!selectActive && <IconImage icon='ARROWDOWN' />}
			</button>
    </ul>
  )
}

export { Select };