import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from '../components/ContactForm/ContactForm';
import ContactList from '../components/ContactList/ContactList';
import Filter from '../components/Filter/Filter';
import Section from '..//components/Section/Section';
import initialContacts from '..//Contacts/Contacts.json';

export class App extends Component {
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
}
