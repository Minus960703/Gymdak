'use client'

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './DateInput.module.scss'

interface DateInputProps {
  startDate: Date | string | null;
  endDate: Date | string | null;
  isChangeStrDate: (value: null | Date) => void;
	isChangeEndDate: (value: null | Date) => void;
}

function DateInput({
  startDate,
  endDate,
  isChangeStrDate,
  isChangeEndDate
}: DateInputProps) {
  return (
    <div className={styles.area}>
				<div className={styles.picker}>
					<DatePicker
						selected={startDate ? new Date(startDate) : null}
						// onChange={(date: Date) => isChangeStrDate(date)}
						// locale={ko}
						dateFormat="yyyy-MM-dd"
						className={`${styles.input}`}
						readOnly={false}
					/>
				</div>
				<span> ~ </span>
				<div className={styles.picker}>
					<DatePicker
						selected={endDate ? new Date(endDate) : null}
						// onChange={(date: Date) => isChangeEndDate(date)}
						// locale={ko}
						dateFormat="yyyy-MM-dd"
						// className={searchRadio==="DIRECT_SELECT" ? styles.input : `${styles.input} ${styles.readonly}`}
						// readOnly={searchRadio==="DIRECT_SELECT" ? false : true}
					/>
				</div>
			</div>
  )
}

export { DateInput };