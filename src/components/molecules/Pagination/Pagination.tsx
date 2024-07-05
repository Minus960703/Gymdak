import React, { useState } from 'react'
import styles from './Pagination.module.scss';
import { IconImage } from 'components/atoms';

interface PaginationProps {
	page: number;
	totalEvents: number;
	limit: number;
	setPage: (page: number) => void;
	totalPages: number;
}

function Pagination({
  page,
	totalEvents,
	limit,
	setPage,
	totalPages
}: PaginationProps) {
  const numPages = Math.ceil(totalEvents / limit);
  const [currPage, setCurrPage] = useState(page);
  let firstNum = currPage - (currPage % 5) + 1;
  let lastNum = currPage - (currPage % 5) + 5;

  const moveToPrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
      setCurrPage(page - 2);
    }
  }

  const moveToNextPage = () => {
    if (totalPages > page) {
      setPage(page + 1);
      setCurrPage(page);
    }
  }

  return (
		<div className={styles.page__area}>
			<button 
        className={`${styles.page__move} ${page === 1 ? styles.empty : ''}`}
				onClick={() => moveToPrevPage()} 
			>
				{page !== 1 
					? <IconImage icon={'ARROWLEFT'} />
					: null
				}
			</button>
			<button
				className={page === firstNum ? `${styles.page__btn} ${styles.active}` : styles.page__btn}
				onClick={() => setPage(firstNum)}
			>
				{firstNum}
			</button>
			{Array(totalPages-1 < 5 ? totalPages-1 : 4).fill(null).map((_, i) =>{
				if(i <=2){
					return (
						<button
							className={page === firstNum+1+i ? `${styles.page__btn} ${styles.active}` : styles.page__btn}
							key={i+1} 
              onClick={() => { setPage(firstNum + 1 + i)}}
						>
							{firstNum+1+i}
						</button>
					)
				}
				else if(i>=3){
					return (
						<button 
              className={styles.page__btn}
							key ={i+1}
							onClick={() => setPage(lastNum)}
						>
							{lastNum}
						</button>
					)  
				}
			})}
			<button 
				className={`${styles.page__move} ${page === numPages ? styles.empty : ''}`}
				onClick={() => moveToNextPage()} 
			>
				{page !== numPages 
					? <IconImage icon={'ARROWRIGHT'} />
					: null
				}
				</button>
			{/* </div> */}
		</div>
  )
}

export { Pagination };