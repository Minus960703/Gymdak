import React from 'react'
import { EventCardProps } from 'types/Event'
import styles from './EventCard.module.scss'
import { Button, EventTitle, Label } from 'components/atoms';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { confirmModalSlice } from 'store/confirmModalReducer';
import { eventSlice } from 'store/eventReducer';

function EventCard({ event }: EventCardProps) {
  const location = useLocation();
  const dispatch = useDispatch();

  const clickDeleteButton = () => {
    dispatch(confirmModalSlice.actions.OPEN(
      {
        title           : "경 고",
        content         : "삭제한 이벤트는 복구가 어렵습니다",
        value           : "delete",
        yes             : "삭제",
        no              : "취소",
        onClickEvent    : isDeleteEvent
      }
    ));
  }

  const isDeleteEvent = () => {
    dispatch(eventSlice.actions.DELETE_EVENT(event.id));
    dispatch(confirmModalSlice.actions.CLOSE());
  }

  return (
    <div className={styles.card}>
      {location.pathname === '/event'
        ? <Button type={"DELETE"} value={''} onClickEvent={() => clickDeleteButton()}/>
        : null
      }
      <EventTitle title={event.eventName} />
      <div className={styles.card__explain}>
        {event.explain}
      </div>
      <div className={styles.card__time}>
        <Label text={`${event.startDate}~${event.endDate}`} /> 
        <Label text={event.location} />
        <Label text={event.hour} />
      </div>
    </div>
  )
}

export { EventCard };