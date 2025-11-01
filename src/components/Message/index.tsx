import React from 'react';
import './index.css';

interface MessageProps {
  msg: string
}

function Message({ msg }: MessageProps) {
  return (
    <div className='messageBlock'>
      {msg || ''}
    </div>
  );
}

export default Message;