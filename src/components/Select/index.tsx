import React, { useEffect, useRef, useState } from 'react';
import "./index.css";
import { useOnClickOutside } from '../../hooks/useClickOutside';
import { useDispatch } from 'react-redux';
import { getAllOptionsAsync, setSelectedOption } from '../../features/select';
import { Option } from '../../types';

interface SelectProps {
  options: Array<Option>
}

const Select = ({ options }: SelectProps) => {

  const [optionsVisible, setOptionVisible] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const selectRef = useRef(null);

  const dispatch = useDispatch();


  const getOptions = () => {
    dispatch(getAllOptionsAsync());
  }

  useEffect(() => {
      getOptions();
  }, []);

  const toggleOptions = () => {
    setOptionVisible(!optionsVisible);
  }

  const handleClickOutside = () => {
    console.log('Clicked outside the button!');
    setOptionVisible(false);
  };

  const handleRemove = (event: any) => {
    event.preventDefault();
    setValue('');
  }

  const handleSetValue = (value: string) => {
    setValue(value);
    console.log(value);
    setOptionVisible(false);
    dispatch(setSelectedOption(value));
  }

  useOnClickOutside(selectRef, handleClickOutside);

  return (
    <div className='select-block' ref={selectRef}>
      <form>
        <input className='dropdown'onClick={toggleOptions} value={value}/>
        <button onClick={handleRemove}>x</button>
        <button onClick={handleRemove}>
          &#9662;
        </button>
      </form>
      <div className={optionsVisible ? "options-shown" : 'options-hidden'}>
        {options && options.map((item: Option, index: number) => (
          <div className={item.value === value ? 'selectedOption' : 'option'} key={index} data-value='value1' onClick={() => handleSetValue(item.value)}>{item.value}</div>
        ))}
      </div>
    </div>
  );
}

export default Select;