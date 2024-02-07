import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJokes, updateCategory } from '../feature/jokesSlice';
import { Input } from 'antd';
import { categoryList } from '../utility/constants';
const { Search } = Input;

const Jokes = () => {
  const dispatch = useDispatch();
  const { categoryType, jokes, status, error } = useSelector((state) => state.jokes);
  const [category, setCategory] = useState('');

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const handleSearch = () => {
    dispatch(updateCategory(category));
    dispatch(fetchJokes(category));
    setCategory('');
  }

  return (
    <div className='jokes-container'>
        <div className='jokes-input'>
            <Search
                placeholder = "input search text"
                allowClear
                enterButton = {category !== '' ? `Get from ${category}` : 'Get Random'}
                size = "large"
                onSearch = {() => handleSearch()}
                onChange={(e) => setCategory(e.target.value)}
            />
        </div>
        <div className='text-field'>
            {status === 'succeeded' && `Joke from ${categoryType}, ${jokes.value} 😂`  }
            {status === 'failed' && 
              <div>
                <span className='error'>Error: {JSON.stringify(error)}</span>
                <div>Available lists are {categoryList}</div>
              </div>
            }
        </div>
    </div>
  );
};

export default Jokes;
