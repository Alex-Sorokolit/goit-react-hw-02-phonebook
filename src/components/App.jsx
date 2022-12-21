import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  // Генератор випадкових id
  nameInputId = nanoid();

  // findDuplicates = event => {
  //   const { value } = event.currentTarget;
  //   const normalizedContacts = this.state.contacts.toLowerCase();

  //   if (
  //     normalizedContacts.find(
  //       contact => contact.name === value.toLocaleLowerCase()
  //     )
  //   ) {
  //     return alert(`${value} is already in contacts`);
  //   }
  // };

  // Метод записує дані із інпута у стейт
  handleInputChange = event => {
    const { name, value } = event.currentTarget;
    this.setState({ [name]: value });

    const normalizedContacts = this.state.contacts;
    // Якщо таке ім'є вже присутнє то показати повідомлення і стерти дані з інпута
    if (
      normalizedContacts.find(
        contact =>
          contact.name.toLocaleLowerCase() === value.toLocaleLowerCase()
      )
    ) {
      alert(`${value} is already in contacts`);
      this.setState({
        name: '',
      });
    }
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  // Фільтр контактів наявних у масиві
  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    // state.filter нормалізуємо один раз, а не при кожній ітерації методу filter
    const normalizedFilter = filter.toLocaleLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  // Метод виконується при сабміті форми
  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);

    // Записуємо у пропс значення стейту (передаємо дані у App-компонент)
    // this.props.submitData(this.state);
    this.addContacts(this.state);
    this.reset();
  };

  // Додає дані користувача у масив
  addContacts = ({ name, number }) => {
    console.log(name, number);
    const newContact = {
      id: this.nameInputId,
      name,
      number,
    };

    this.setState(prevState => ({
      contacts: [newContact, ...prevState.contacts],
    }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  // Очистка інпутів (через очистку стейту)
  reset = () => {
    this.setState({
      name: '',
      number: '',
    });
  };

  render() {
    const { name, number, filter } = this.state;
    const filteredContacts = this.getVisibleContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm
          name={name}
          number={number}
          handleSubmit={this.handleSubmit}
          handleInputChange={this.handleInputChange}
        />

        <h2>Contacts</h2>
        <Filter value={filter} changeFilter={this.changeFilter}></Filter>
        <ContactList
          filteredContacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
