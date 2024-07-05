import { Button } from '@/components/atoms';
import { confirmModalSlice } from 'store/confirmModalReducer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './ConfirmModal.module.scss';

interface RootState<T> {
  [x: string]: T;
}

interface ConfirmModalStateType {
  active        : boolean;
  content      ?: string;
  title        ?: string;
  yes           : string;
  no            : string;
  onClickEvent  : () => void;
}

const ConfirmModal = () => {
  const { active, title, content, yes, no, onClickEvent } = useSelector((state: RootState<ConfirmModalStateType>) => state.confirmModal);
  const dispatch = useDispatch();

	useEffect(() => {
		active
      ? document.documentElement.style.overflow = "hidden"
      : document.documentElement.style.overflow = "unset"
    return () => {
      document.documentElement.style.overflow = "unset"
    }
  }, [active, title, content])

  const onClickEventAndCloseModal = () => {
    onClickEvent();
    dispatch(confirmModalSlice.actions.CLOSE());
  }

  return (
    <div className={styles.modal}>
      <div className={styles.white}>
        <p className={styles['white__title--blue']}>
          {title}
        </p>
        {content 
					&&  <p className={styles[`white__title--grey`]}>
								{content}
							</p>
        }
        <div className={styles.btn__area}>
          <Button value={no} onClickEvent={() => dispatch(confirmModalSlice.actions.CLOSE())} />
          <Button value={yes} onClickEvent={() => onClickEventAndCloseModal()} />
        </div>
      </div>
    </div>
  )
}

export { ConfirmModal };
