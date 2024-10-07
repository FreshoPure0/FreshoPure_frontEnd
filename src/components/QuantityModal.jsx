import React, { useState } from 'react';

const QuantityModal = () => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => Math.max(prevCount - 1, 0)); // Prevent negative values

  return (
    <div className="bg-[#EBEBEB] rounded-full flex items-center justify-between border border-[#EBEBEB]  w-20">
      <button 
        className=" w-4 h-2 flex items-center justify-center ml-1"
        onClick={decrement}
      >
        -
      </button>
      <div className="bg-white w-8 h-6 flex items-center justify-center text-black font-bold ">
        {count}
      </div>
      <button 
        className=" rounded-full w-4 h-2 flex items-center justify-center mr-1"
        onClick={increment}
      >
        +
      </button>
    </div>
  );
};

export default QuantityModal;
