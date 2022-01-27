import React, { Component } from 'react'
import Contacts from './Component/Contacts/Contacts';
import Form from './Component/Fopm/Form';
import shortid from 'shortid';
import Title from './Component/Title/Title';
import Filter from './Component/Filter/Filter';


class App extends Component {

  state = { contacts: [],
    filter: ''
  }

  componentDidUpdate(prevProps, prevState) {
    const contacts = this.state.contacts;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  };

  componentDidMount() {
    const contact = localStorage.getItem('contacts');
    const parsedContact = JSON.parse(contact);
    if (parsedContact) {
      this.setState({ contacts: parsedContact });
    }

  };

  addForm = (name, number) => {
    const nameToAdd = this.state.contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase() && contact.number === number,
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
