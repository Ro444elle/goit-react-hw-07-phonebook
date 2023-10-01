import React from 'react';
// import PropTypes from 'prop-types';

import ContactItem from './ContactItem/ContactItem';
import styles from './ContactList.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/operations';
import { selectFilter } from 'redux/selectors';

export default function ContactList({ contacts }) {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const filteredContacts = contacts?.filter(
    contact =>
      contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul>
      {filteredContacts.map(contact => (
        <li key={contact.id}>
          <ContactItem contact={contact} />
          <button
            onClick={() => dispatch(deleteContact(contact.id))}
            className={styles.button}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

// ContactList.propTypes = {
//   contacts: PropTypes.array.isRequired,
//   filter: PropTypes.string.isRequired,
//   onDeleteContact: PropTypes.func.isRequired,
// };
