import React from 'react';
import './index.css';
import { useSelector } from 'react-redux';

interface ButtonProps {
  text: string,
  selectedOption: string,
  handleOnClick: Function,
}

const Button = ({ text, handleOnClick, selectedOption }: ButtonProps) => {
  return (
    <div className={selectedOption ? 'send-button' : 'send-button disabled'} onClick={() => handleOnClick()}>
      <div className='send-button-text'>
        {text}
      </div>
    </div>
  );
}

export default Button;