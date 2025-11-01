import React, { useEffect, useMemo, useRef, useState } from 'react';
import "./index.css";
import { useOnClickOutside } from '../../hooks/useClickOutside';
import { useDispatch } from 'react-redux';
import { getAllOptionsAsync, setSelectedOption } from '../../features/select';
import { Option } from '../../types';
import { filterOptions } from '../../utils/filterOptions';

interface SelectProps {
  options: Array<Option>
}

const Select = ({ options }: SelectProps) => {
  const [optionsVisible, setOptionVisible] = useState<boolean>(false);
  // const [filteredOptions, setFilteredOptions] = useState<Array<Option>>(options);
  const [searchString, setSearchString] = useState<string>('');
  const [value, setValue] = useState<string>('');

  const selectRef = useRef(null);

  const inputRef = useRef(null);

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

  const handleHideList = () => {
    setOptionVisible(false);
  };

  const handleCloseButton = (event: any) => {
    event.preventDefault();
    toggleOptions();
  }

  const handleRemove = (event: any) => {
    event.preventDefault();
    setValue('');
  }

  const handleSetValue = (value: string) => {
    setValue(value);
    setOptionVisible(false);
    dispatch(setSelectedOption(value));
  }

  // const filteredOptions = useMemo(() => {
  //   return filterOptions(options, inputRef?.current.value || '');
  // }, [searchString]);

  useOnClickOutside(selectRef, handleHideList);

  return (
    <div className='select-block' ref={selectRef}>
      <form>
        <input 
          id="dropdown-input"
          ref={inputRef}
          className='dropdown'
          onClick={toggleOptions}
          value={value}
          // onChange={(event) => setSearchString(event.target.value)} 
        />
        <button onClick={handleRemove}>x</button>
        <button onClick={handleCloseButton}>
          &#9662;
        </button>
      </form>
      <div className={optionsVisible ? "options-shown" : 'options-hidden'}>
        {options && options.map((item: Option, index: number) => (
          <div className={item.value === value ? 'selectedOption' : 'option'} key={index} data-value='value1' onClick={() => handleSetValue(item.value)}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Select;