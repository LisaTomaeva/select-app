import React, { useState } from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';

const Button = () => {
  const dispatch = useDispatch();
  const selectedOption: Array<any> = useSelector((state: any) => state.select.selectedOption);


  const handleSendClick = () => {
    console.log('value sent');
    dispatch({type: 'select/sendOptionAsync', payload: selectedOption});
  }

  return (
    <div className='send-button' onClick={handleSendClick}>
      <div className='send-button-text'>Отправить</div>
    </div>
  );
}

export default Button;