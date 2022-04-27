import { useState} from 'react'
import Contacts from './Component/Contacts/Contacts';
import Form from './Component/Fopm/Form';
import shortid from 'shortid';
import Title from './Component/Title/Title';
import Filter from './Component/Filter/Filter';
import LocalStorage from './Component/LocalStorage/LocalStorage';



function App() {
  const [contacts, setContacts] = LocalStorage('contacts',[]);
  const [filter, setFilter] = useState('');

  const addForm = (name, number) => {
    const nameToAdd = contacts.find(
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
    setContacts( [contact, ...contacts])
  };

  const deleteContact = (contactId) => {
    setContacts( contacts.filter(contact => contact.id !== contactId) )
  };

  const filterChange = (e) => {
     setFilter(e.target.value)
   };

    const normalizeFilter = filter.toLowerCase();
    const filterContact = contacts.filter(contact => contact.name.toLowerCase().includes(normalizeFilter));
    return (
      <>
        <Title title={'Phonebook' }/>
        <Form onSubmit={addForm} contacts={ filterContact} />
        <Title title={'Contacts'} />
        <Filter filter={filter} filterChange={filterChange}/>
        <Contacts contacts={filterContact} onDeleteContact={deleteContact}/>
      </>
    );

}

export default App;
