import React from 'react';
import './index.css';
import Select from '../Select';
import Button from '../Button';
import Message from '../Message';
import { useDispatch, useSelector } from 'react-redux';
import { BUTTON_TEXT } from '../../consts';
import { Option, Store } from '../../types';
import { getAllOptionsAsync, setSelectedOption } from '../../features/select';


function Main() {
  const dispatch = useDispatch();

  const saveStatusMsg: string = useSelector((state: Store) => state.select.saveStatusMsg);
  const storeOptions: Array<Option> = useSelector((state: Store) => state.select.options);
  const selectedOption: string = useSelector((state: Store) => state.select.selectedOption);

  const handleSendClick = () => {
    if (selectedOption) {
      console.log('value sent');
      dispatch({type: 'select/sendOptionAsync', payload: selectedOption});
    }
  }

  const getOptions = () => {
    dispatch(getAllOptionsAsync());
  };

  const handleSetSelectedOption = (value: string) => {
    dispatch(setSelectedOption(value))
  }

  return (
    <>
      <div className='main-block'>
        <Select options={storeOptions} getOptions={getOptions} setSelectedOption={handleSetSelectedOption}/>
        <Button text={BUTTON_TEXT} handleOnClick={handleSendClick} selectedOption={selectedOption} />
      </div>
      <Message msg={saveStatusMsg} />
    </>
  );
}

export default Main;