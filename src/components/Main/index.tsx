import React from 'react';
import './index.css';
import Select from '../Select';
import Button from '../Button';
import { useSelector } from 'react-redux';


function Main() {
  const saveStatusMsg: Array<any> = useSelector((state: any) => state.select.saveStatusMsg);

  return (
    <>
      <div className='main-block'>
        <Select />
        <Button />
      </div>
      {saveStatusMsg || ''}
    </>
  );
}

export default Main;