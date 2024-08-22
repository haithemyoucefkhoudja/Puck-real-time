import React, { useState, useRef, useEffect } from 'react';

const CustomSlider = ({ min = 0, max = 100, value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [localValue, setLocalValue] = useState(value);
  const sliderRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleMouseMove(e);
  };
  const handleMouseMove = (e: { clientX: number; }) => {
    if (isDragging) {
      const rect = sliderRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, offsetX / rect.width));
      const newValue = Math.round(percentage * (max - min) + min);
      setLocalValue(newValue);
      onChange(newValue);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={sliderRef}
      className="relative w-full h-2 bg-gray-300 rounded-lg cursor-pointer "
      onMouseDown={handleMouseDown}
    >
      <div
        className="absolute top-0 left-0 h-full bg-blue-500 rounded-lg"
        style={{ width: `${((localValue - min) / (max - min)) * 100}%` }}
      />
      <div
        className="absolute top-0"
        style={{
          left: `${((localValue - min) / (max - min)) * 100}%`,
          transform: 'translateX(-50%)',
        }}
      >
        <div className=" w-4 h-4 bg-blue-900 rounded-full shadow-md"></div>
      </div>
    </div>
  );
};

export default CustomSlider;
