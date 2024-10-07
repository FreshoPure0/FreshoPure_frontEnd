import React from 'react';
import { FiSearch } from 'react-icons/fi';

function SearchBar() {
    return (
        <div className='w-2/5 h-10 flex items-center border rounded-xl overflow-hidden px-2 bg-white'>
            <FiSearch className='text-gray-600' size={20} />
            <input
                type='text'
                placeholder='Search...'
                className=' p-2 text-base outline-none border-none bg-transparent'
            />
            
        </div>
    );
}

export default SearchBar;
