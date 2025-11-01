import React, { useEffect, useRef, useState } from 'react';
import "./index.css";
import { useOnClickOutside } from '../../hooks/useClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOptionsAsync, setSelectedOption } from '../../features/select';
import { Option } from '../../types';

const Select = () => {

  const [optionsVisible, setOptionVisible] = useState<boolean>(false);
  const [options, setOptions] = useState<Array<Option>>([]);
  const [value, setValue] = useState<string>('');

  const selectRef = useRef(null);

  const storeOptions: Array<any> = useSelector((state: any) => state.select.options);
  const dispatch = useDispatch();


  const getOptions = () => {
      const options = dispatch(getAllOptionsAsync());
      console.log('options', storeOptions);
      setOptions(storeOptions);
      return options;
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
      </form>
      <div className={optionsVisible ? "options-shown" : 'options-hidden'}>
        {storeOptions && storeOptions.map((item, index) => (
          <div className='option' key={index} data-value='value1' onClick={() => handleSetValue(item.value)}>{item.value}</div>
        ))}
      </div>
    </div>
  );
}

export default Select;