import React from 'react'
import styles from './Select.module.scss';
import { IconImage } from '@/components';

interface SelectProps {
	// selectOption: '' | UserRole;
	// selectActive: boolean;
	// isChangeSelectActive: () => void;
	// isChangeSelectBoxItems: (name: string, value: '' | UserRole) => void;
  // filter?: boolean;
  // possibleAll?: boolean;
}

function Select({ selectOption, selectActive, selectArray, isChangeSelectActive, isChangeSelectBoxItems, filter = false, possibleAll = true }: SelectProps) {
  return (
    <ul
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
				{filter && <p onClick={() => isChangeSelectBoxItems('role', '')}>전체</p>}
				{selectArray?.map((selectItem) => (
					<p
						key={selectItem.id}
						onClick={() => isChangeSelectBoxItems('role', selectItem.value)}
					>
						{selectItem.name}
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