import React, { useState } from 'react';
import SelectionOptions from './ui/SelectionOptions';

const BorderColorChanger = () => {
  const [selectedOption, setSelectedOption] = useState('fixed-Value');

  const handleClick = () => {
    switch (selectedOption) {
      case 'fixed-Value':
        setSelectedOption('two-Axis');
        break;
      case 'two-Axis':
        setSelectedOption('Four-Sides');
        break;
      case 'Four-Sides':
        setSelectedOption('fixed-Value');
        break;
      default:
        setSelectedOption('fixed-Value');
    }
  };

  const getBorderColors = () => {
    console.log(selectedOption);
    switch (selectedOption) {
      case 'fixed-Value':
        return {
          borderTopColor: '#90cdf4',   // Soft blue
          borderBottomColor: '#90cdf4',
          borderLeftColor: '#90cdf4',
          borderRightColor: '#90cdf4',
        };
      case 'two-Axis':
        return {
          borderTopColor: '#9ae6b4',   
          borderBottomColor: '#9ae6b4',
          borderLeftColor: '#f56565',   
          borderRightColor: '#f56565',
        };
      case 'Four-Sides':
        return {
          borderTopColor: '#f6ad55',
          borderBottomColor: '#d53f8c',
          borderLeftColor: '#ecc94b', 
          borderRightColor: '#63b3ed',
        };
      default:
        return {
          borderTopColor: '#90cdf4',
          borderBottomColor: '#90cdf4',
          borderLeftColor: '#90cdf4',
          borderRightColor: '#90cdf4',
        };
    }
  };

  const borderColors = getBorderColors();

  return (
    <section className='flex flex-col mt-5'>
    <div className='flex justify-between'>
    <button
      onClick={handleClick}
      className=" h-8 w-8 bg-gray-200 rounded-md flex justify-center items-center"
    >
      <div
        className="w-6 h-6 border-2"
        style={{
          borderTopColor: borderColors.borderTopColor,
          borderBottomColor: borderColors.borderBottomColor,
          borderLeftColor: borderColors.borderLeftColor,
          borderRightColor: borderColors.borderRightColor,
        }}
      />
    </button>
    
        {/* TODO: is Height and Width vw and vh */}
        <SelectionOptions status={['px', 'rem', '%',]} onChange={function (current: string): void {
          throw new Error('Function not implemented.');
        } }>

        </SelectionOptions>
    </div>

      {selectedOption === 'two-Axis' && (
          <div className="mt-4 space-y-2">
            <input
              type="number"
              placeholder="X Value"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            <input
              type="number"
              placeholder="Y Value"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        )}
      {selectedOption === 'Four-Sides' && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Top Value"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Bottom Value"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Left Value"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            placeholder="Right Value"
            className="p-2 border border-gray-300 rounded-lg"
          />
        </div>
      )}

      {selectedOption === 'fixed-Value' && (
        <div className="mt-4">
          <input
            type="number"
            placeholder="fixed-Value Value"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>
      )}

    </section>
  );
};

export default BorderColorChanger;
