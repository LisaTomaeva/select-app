import React from 'react';
import './index.css';
import { useDispatch, useSelector } from 'react-redux';

interface ButtonProps {
  text: string
}

const Button = ({ text }: ButtonProps) => {
  const dispatch = useDispatch();
  const selectedOption: Array<any> = useSelector((state: any) => state.select.selectedOption);

  const handleSendClick = () => {
    console.log('value sent');
    dispatch({type: 'select/sendOptionAsync', payload: selectedOption});
  }

  return (
    <div className='send-button' onClick={handleSendClick}>
      <div className='send-button-text'>
        {text}
      </div>
    </div>
  );
}

export default Button;