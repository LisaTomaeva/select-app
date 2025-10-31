import React, { useEffect, useRef, useState } from 'react';
import "./index.css";
import { useOnClickOutside } from '../../hooks/useClickOutside';

const Select = () => {

  const [optionsVisible, setOptionVisible] = useState<boolean>(false);
  const [options, setOptions] = useState<Array<any>>([]);

  const buttonRef = useRef(null);

  const getOptions = async() => {
      const response = await fetch('http://localhost:3001/selectList');
      const jsonData = await response.json();
      console.log(jsonData);
      setOptions(jsonData);
      return jsonData;
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

  useOnClickOutside(buttonRef, handleClickOutside);

  return (
    <div>
      <button className='dropdown' ref={buttonRef} onClick={toggleOptions}>Select an option</button>
      <div className={optionsVisible ? "options-visible" : 'options-hidden'}>
        {options.map((item, index) => (
          <div className='option' key={index} data-value='value1'>{item.value}</div>
        ))}
      </div>
    </div>
  );
}

export default Select;