import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import Filter from '../components/Filter/Filter';
import Section from '..//components/Section/Section';
import initialContacts from '..//Contacts/Contacts.json';

export function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? initialContacts
  );
  const [filter, setFilter] = useState('');

  const formSubmitHandler = ({ name, number }) => {
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    if (contacts.find(({ name }) => name === contact.name)) {
      return alert(`${name} already in contacts`);
    } else setContacts(contacts => [contact, ...contacts]);
  };

  const handleDelete = id => {
    return setContacts(contacts =>
      contacts.filter(contact => contact.id !== id)
    );
  };

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const getVisibleFilter = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  useEffect(() => {
    const contacts = window.localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div
      style={{
        width: '70vh',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Section title="Phonebook"></Section>
      <ContactForm onSubmit={formSubmitHandler} />

      <Section title="Contacts"></Section>
      <Filter value={filter} onChange={changeFilter} />

      <ContactList contacts={getVisibleFilter()} onDelete={handleDelete} />
    </div>
  );
}
