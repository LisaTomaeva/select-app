import React from 'react';
import './index.css';
import Select from '../Select';
import Button from '../Button';
import Message from '../Message';
import { useSelector } from 'react-redux';
import { BUTTON_TEXT } from '../../consts';
import { Option, Store } from '../../types';


function Main() {
  const saveStatusMsg: string = useSelector((state: Store) => state.select.saveStatusMsg);
  const storeOptions: Array<Option> = useSelector((state: Store) => state.select.options);

  return (
    <>
      <div className='main-block'>
        <Select options={storeOptions}/>
        <Button text={BUTTON_TEXT} />
      </div>
      <Message msg={saveStatusMsg} />
    </>
  );
}

export default Main;