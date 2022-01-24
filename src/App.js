import React, { Component } from 'react'
import Contacts from './Component/Contacts/Contacts';
import Form from './Component/Fopm/Form';
import shortid from 'shortid';
import Title from './Component/Title/Title';
import Filter from './Component/Filter/Filter';


class App extends Component {

  state = { contacts: [{id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
    {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
    {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
    {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},],
    filter: ''
  }

  addForm = (name, number) => {
    const nameToAdd = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase(),
    );
    if (nameToAdd) {
      return alert(`${name} is already in contacts.`);
    }
    const contact = {
      id: shortid.generate(),
      name,
      number,
    }

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts]
    })
    )
  };

  deleteContact = (contactId)=>{
this.setState(prevState=>({contacts:prevState.contacts.filter(contact=> contact.id !== contactId),}))
}

  filterChange = (e) => {
    this.setState({
      filter: e.target.value
    })
  };

  render() {
    const normalizeFilter = this.state.filter.toLowerCase();
    const filterContact = this.state.contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter));
    return (
      <>
        <Title title={'Phonebook' }/>
        <Form onSubmit={this.addForm} contacts={ filterContact} />
        <Title title={'Contacts'} />
        <Filter filter={this.state.filter} filterChange={ this.filterChange}/>
        <Contacts contacts={filterContact} onDeleteContact={this.deleteContact }/>
      </>
    );
  };
};

export default App;
