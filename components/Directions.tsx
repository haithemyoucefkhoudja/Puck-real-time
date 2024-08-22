// DirectionCheckboxes.js
import React, { useState } from 'react';

const DirectionCheckboxes = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex flex-col mt-5">
        <div className='flex  space-y-2 flex-wrap'>
            <label className="flex items-center space-x-2">
                <input
                type="radio"
                name="direction"
                value="two-Axis"
                checked={selectedOption === 'two-Axis'}
                onChange={handleChange}
                className="form-radio"
                />
                <span className="text-gray-700 text-sm">two-Axis</span>
            </label>

            <label className="flex items-center space-x-2">
                <input
                type="radio"
                name="direction"
                value="Four-Sides"
                checked={selectedOption === 'Four-Sides'}
                onChange={handleChange}
                className="form-radio"
                />
                <span className="text-gray-700 text-sm">Four-Sides</span>
            </label>

            <label className="flex items-center space-x-2">
                <input
                type="radio"
                name="direction"
                value="fixed-Value"
                checked={selectedOption === 'fixed-Value'}
                onChange={handleChange}
                className="form-radio"
                />
                <span className="text-gray-700 text-sm">fixed-Value</span>
            </label>
      </div>
      {/* Conditional Inputs */}
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
    </div>
  );
};

export default DirectionCheckboxes;
