import React from 'react';
import { useDispatch } from 'react-redux';

import { setFilter } from 'redux/operations';

export default function Filter() {
  const dispatch = useDispatch();

  const handleFilterChange = value => {
    dispatch(setFilter(value));
  };

  return (
    <div>
      <label htmlFor="filter">Filter by Name:</label>
      <input
        type="text"
        id="filter"
        onChange={e => handleFilterChange(e.target.value)}
        placeholder="Search by name"
      />
    </div>
  );
}
