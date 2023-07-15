import { nanoid } from 'nanoid';

import React, { Component } from 'react';

import Section from 'components/Section';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

import css from './Phonebook.module.css';

class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleSubmit = values => {
    const { name, number } = values;
    const { contacts } = this.state;

    const hasContact = contacts.some(contact => {
      const normalizedName = contact.name.toLowerCase();
      return normalizedName.includes(name.toLowerCase());
    });

    if (!hasContact) {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };

      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    } else {
      alert(`${name} is already in contacts.`);
    }
  };

  changeFilter = evt => {
    this.setState({ filter: evt.target.value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalizetFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizetFilter)
    );
  };

  deleteContact = evt => {
    this.setState(prevState => {
      const contactsAfterDelete = prevState.contacts.filter(
        contact => evt.target.id !== contact.id
      );
      return { contacts: contactsAfterDelete };
    });
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getFilteredContacts();

    return (
      <>
        <Section>
          <h2 className={css.Title}>Phonebook</h2>
          <ContactForm onSubmit={this.handleSubmit} />
          <h2 className={css.Title}>Contacts</h2>
          <Filter filter={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onClick={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}

export default Phonebook;
