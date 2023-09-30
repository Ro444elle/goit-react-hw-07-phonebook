import React from 'react';
// import PropTypes from 'prop-types';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import ContactItem from './ContactItem/ContactItem';
import styles from './ContactList.module.css';

export default function ContactList({ onDeleteContact }) {
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  const filteredContacts = contacts.filter(
    contact =>
      contact.name && contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <ul>
      {filteredContacts.map(contact => (
        <li key={contact.id}>
          <ContactItem contact={contact} />
          <button
            className={styles.button}
            onClick={() => onDeleteContact(contact.id)}
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
