import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchContactsError,
  fetchContactsSucces,
  setFilter,
  fetchContactsStart,
  createContact,
} from 'redux/contactsSlice';
import { fetchContacts } from './redux/operations';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from './components/ContactList/Filter/Filter';
import styles from './App.module.css';
import { contactApi } from 'api/api';

export default function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  useEffect(() => {
    console.log('Filter:', filter);
    console.log('Contacts:', contacts);
    const fetchData = async () => {
      dispatch(fetchContactsStart());
      try {
        const response = await fetchContacts();
        dispatch(fetchContactsSucces(response.data));
      } catch (error) {
        dispatch(fetchContactsError(error.message));
      }
    };

    fetchData();
  }, [dispatch, contacts, filter]);

  const handleAddContact = async newContact => {
    try {
      const response = await createContact(newContact);
      dispatch(fetchContactsSucces([...contacts, response.data]));
    } catch (error) {
      console.log('Error creating contact:', error);
    }
  };

  const handleDeleteContact = async contactId => {
    try {
      await contactApi.delete(contactId);
      //  dispatch(deleteContact(contactId));
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const handleFilterChange = value => {
    dispatch(setFilter(value));
  };

  return (
    <div className="App">
      <div className={styles.phonebook}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleAddContact} />
      </div>

      <div className={styles.contacts}>
        <h2>Contacts</h2>
        <Filter value={filter} onChange={handleFilterChange} />

        <ContactList
          contacts={contacts}
          filter={filter}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </div>
  );
}
