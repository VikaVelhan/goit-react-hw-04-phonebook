import { useState, useEffect } from 'react';

//import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import Filter from '../components/Filter/Filter';
import Section from '..//components/Section/Section';
import initialContacts from '..//Contacts/Contacts.json';

export function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  const formSubmitHandler = ({ name, number }) => {
    console.log(name, number);
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
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
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

/*export class oldApp extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  formSubmitHandler = data => {
    console.log(data);
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };
    if (this.state.contacts.find(({ name }) => name === data.name)) {
      return alert(`${data.name} already in contacts`);
    } else
      this.setState(({ contacts }) => ({
        contacts: [contact, ...contacts],
      }));
  };

  handleDelete = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleFilter = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    console.log('App componentDidUpdate ');
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const { filter } = this.state;

    const filteredContact = this.getVisibleFilter();
    return (
      <div
        style={{
          width: '70vh',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <Section title="Phonebook"></Section>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <Section title="Contacts"></Section>
        <Filter value={filter} onChange={this.changeFilter} />

        <ContactList contacts={filteredContact} onDelete={this.handleDelete} />
      </div>
    );
  }
}*/
