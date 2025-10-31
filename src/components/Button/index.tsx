import React, { useState } from 'react';
import './index.css';

const Button = () => {

  const handleSendClick = () => {
    console.log('value sent');
  }

  return (
    <div className='send-button' onClick={handleSendClick}>
      <div className='send-button-text'>Отправить</div>
    </div>
  );
}

export default Button;