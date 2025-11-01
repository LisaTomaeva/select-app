import React from 'react';

interface MessageProps {
  msg: string
}

function Message({ msg }: MessageProps) {
  return (
    <>
      {msg || ''}
    </>
  );
}

export default Message;