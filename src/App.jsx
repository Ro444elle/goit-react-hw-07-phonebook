import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import  fetchContactsError,
// fetchContactsSucces,
// setFilter,
// fetchContactsStart,
// createContact,
// 'redux/contactsSlice';
import { fetchContacts } from './redux/operations';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from './components/ContactList/Filter/Filter';
import styles from './App.module.css';
// import { contactApi } from 'api/api';
import { selectContact, selectIsLoading } from 'redux/selectors';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContact);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div className="App">
      <div className={styles.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm />
      </div>

      <div className={styles.contacts}>
        <h2>Contacts</h2>
        <Filter />

        {isLoading ? (
          <p>Loading contanct</p>
        ) : (
          <ContactList contacts={contacts} />
        )}
      </div>
    </div>
  );
}
