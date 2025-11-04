import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
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
  const [searchString, setSearchString] = useState<string>('');
  let [selectedByScrollIndex, setSelectedByScrollIndex] = useState<number>(0);
  const [value, setValue] = useState<string>('');
  const [deleteButtonClass, setDeleteButtonClass] = useState('delete-button-hidden');
  const selectRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLInputElement>(null);

  let timeoutId: any;
  const scrollAmount = 18.4;

  const dispatch = useDispatch();

  const getOptions = () => {
    dispatch(getAllOptionsAsync());
  };

  const filteredOptions = useMemo(() => {
    return searchString ? filterOptions(options, searchString || '') : options;
  }, [searchString, options]);

  const optionsValues: Array<string> = useMemo(() => filteredOptions?.map((item: Option, index: number) => item.value), [filteredOptions]);

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

  useEffect(() => {
    const listener = (event: any) => {
      if (!scrollContainerRef.current || scrollContainerRef.current.contains(event.target)) {
        return;
      }
      if (scrollContainerRef.current) {
        if (event.key === 'ArrowUp') {
          if (selectedByScrollIndex === 10) {
              setSelectedByScrollIndex(selectedByScrollIndex--);
              scrollContainerRef.current.scrollBy({ top: -scrollAmount*10, behavior: 'smooth' });
            }
          if (selectedByScrollIndex) {
            setSelectedByScrollIndex(selectedByScrollIndex--);
            scrollContainerRef.current.scrollBy({ top: -scrollAmount, behavior: 'smooth' });
          } else if (selectedByScrollIndex === 0) {
            setSelectedByScrollIndex(0);
          }
          event.preventDefault(); 
        } else if (event.key === 'ArrowDown') {
          console.log(selectedByScrollIndex, value, optionsValues.indexOf(value));
            if (!value && !selectedByScrollIndex) {
            setSelectedByScrollIndex(0);
            } else {
              if (selectedByScrollIndex >= 10) {
                setSelectedByScrollIndex(selectedByScrollIndex++);
                scrollContainerRef.current.scrollBy({ top: scrollAmount, behavior: 'smooth' });
              }
              if (selectedByScrollIndex || selectedByScrollIndex === 0) {
                setSelectedByScrollIndex(selectedByScrollIndex++);
              }
            event.preventDefault();
          }
        }
      }
    }
    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [scrollContainerRef, optionsValues, value]);

  const handleShowDeleteButtonClass = () => {
    setDeleteButtonClass('button');
  }
  
  const handleHideDeleteButtonClass = () => {
    setDeleteButtonClass('delete-button-hidden');
  }

  const toggleOptions = () => {
    setOptionVisible(!optionsVisible);
  }
  const handleHideList = () => {
    setOptionVisible(false);
    if (inputRef.current && inputRef.current.value !== value) {
      inputRef.current.value = value;
    }
    setSearchString('');
  };
  const handleCloseButton = (event: any) => {
    event.preventDefault();
    toggleOptions();
  }
  const handleRemove = (event: any) => {
    event.preventDefault();
    setValue('');
    if (inputRef.current) {
      inputRef.current.value = '';
      setSearchString('');
    }
  }
  const handleSetValue = (value: string) => {
    setValue(value);
    setOptionVisible(false);
    if (inputRef.current) {
      inputRef.current.value = value;
    }
    dispatch(setSelectedOption(value));
    setSelectedByScrollIndex(optionsValues.indexOf(value));
  }
  const handleSearchString = (event: any) => {
    timeoutId = setTimeout(() => {
      setSearchString(event.target.value);
      setValue(value);
      dispatch(setSelectedOption(value));
    }, 500);
  }

  useOnClickOutside(selectRef, handleHideList);
    
  return (
    <div className='select-block' ref={selectRef}>
      <form 
        onMouseOver={handleShowDeleteButtonClass}
        onMouseOut={handleHideDeleteButtonClass}
      >
        <input 
          id="dropdown-input"
          ref={inputRef}   
          className='dropdown'
          onClick={toggleOptions}
          type='number'
          min={1}
          onChange={(event: ChangeEvent) => handleSearchString(event)} 
        />             
        <button className={deleteButtonClass} onClick={handleRemove}>x</button>
        <button onClick={handleCloseButton}>
          &#9662;
        </button>
      </form>
      <div ref={scrollContainerRef} tabIndex={0} className={optionsVisible ? "options-shown" : 'options-hidden'}>
        {filteredOptions && filteredOptions.map((item: Option, index: number) => (
          <div className={
            selectedByScrollIndex === optionsValues.indexOf(item.value) ? 
            'option selectedByScrollOption' :
            (value === item.value ? 'option selectedOption' : 'option')
            } 
            key={index} 
            data-value='value1' 
            onClick={(event) => handleSetValue(item.value)}
          >
            {item.name} {selectedByScrollIndex === optionsValues.indexOf(item.value) ? 'true' : 'false'}
          </div>
        ))}
      </div>
    </div>
  );
  }

export default Select;