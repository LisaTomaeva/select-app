import React, { useEffect, useMemo, useRef, useState } from 'react';
import "./index.css";
import { useOnClickOutside } from '../../hooks/useClickOutside';
import { useDispatch, useSelector } from 'react-redux';
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

  const selectRef = useRef<HTMLInputElement>(null);

  const inputRef = useRef<HTMLInputElement>(null);

  let timeoutId: any;

  const dispatch = useDispatch();

  const getOptions = () => {
    dispatch(getAllOptionsAsync());
  }

  useEffect(() => {
    getOptions();
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  const toggleOptions = () => {
    setOptionVisible(!optionsVisible);
  }

  const handleHideList = () => {
    setOptionVisible(false);
        if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value;
    }
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
    if (inputRef.current) {
      inputRef.current.value = value;
    }
    dispatch(setSelectedOption(value));
  }

  const handleSearchString = (event: any) => {
    timeoutId = setTimeout(() => {
      setSearchString(event.target.value);
      setValue(value);
      dispatch(setSelectedOption(value));
    }, 500);
  }

  const filteredOptions = useMemo(() => {
    return searchString ? filterOptions(options, searchString || '') : options;
  }, [searchString, options]);

  useOnClickOutside(selectRef, handleHideList);

  return (
    <div className='select-block' ref={selectRef}>
      <form>
        <input 
          id="dropdown-input"
          ref={inputRef}
          className='dropdown'
          onClick={toggleOptions}
          // value={value}
          onChange={(event) => handleSearchString(event)} 
        />
        <button onClick={handleRemove}>x</button>
        <button onClick={handleCloseButton}>
          &#9662;
        </button>
      </form>
      <div className={optionsVisible ? "options-shown" : 'options-hidden'}>
        {filteredOptions && filteredOptions.map((item: Option, index: number) => (
          <div className={item.value === value ? 'selectedOption' : 'option'} key={index} data-value='value1' onClick={(event) => handleSetValue(item.value)}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}

export default Select;