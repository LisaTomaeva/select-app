import React, { useEffect, useRef, useState } from 'react';
import "./index.css";
import { useOnClickOutside } from '../../hooks/useClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOptions, getAllOptionsAsync } from '../../features/select';

const Select = () => {

  const [optionsVisible, setOptionVisible] = useState<boolean>(false);
  const [options, setOptions] = useState<Array<any>>([]);
  const [value, setValue] = useState<string>('');

  const selectRef = useRef(null);

  const storeOptions: Array<any> = useSelector((state: any) => state.options);
  const dispatch = useDispatch();


  const getOptions = async() => {
      const options = dispatch(getAllOptionsAsync());
      // const response = await fetch('http://localhost:3001/selectList');
      // const jsonData = await response.json();
      // console.log(jsonData);
      // setOptions(options);
      console.log('options', options)
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
    event.stopPropagation();
    setValue('');
  }

  const handleSetValue = (value: string) => {
    setValue(value);
    console.log(value);
    setOptionVisible(false);
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