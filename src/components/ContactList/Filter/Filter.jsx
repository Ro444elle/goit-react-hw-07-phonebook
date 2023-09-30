import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter, filterContacts } from 'redux/contactsSlice';

export default function Filter() {
  const dispatch = useDispatch();

  const handleFilterChange = value => {
    dispatch(setFilter(value));
    dispatch(filterContacts(value));
  };

  return (
    <div>
      <label htmlFor="filter">Filter by Name:</label>
      <input
        type="text"
        id="filter"
        // value={value}
        onChange={e => handleFilterChange(e.target.value)}
        placeholder="Search by name"
      />
    </div>
  );
}
