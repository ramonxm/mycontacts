import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, InputSearchContainer, Header, ListHeader, Card,
} from './style';

const baseURL = 'http://localhost:3001';

export const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');

  useEffect(() => {
    fetch(`${baseURL}/contacts?orderBy=${orderBy}`)
      .then(async (response) => {
        const contact = await response.json();
        setContacts(contact);
      }).catch((error) => {
        throw new Error(error);
      });
  }, [orderBy]);

  const handleToggleOrderBy = () => {
    setOrderBy((prevState) => (
      prevState === 'asc' ? 'desc' : 'asc'
    ));
  };

  return (
    <Container>

      <InputSearchContainer>
        <input type="text" placeholder="Pesquisar pelo nome..." />
      </InputSearchContainer>

      <Header>
        <strong>
          {contacts.length}
          {contacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new-contact">Novo contato</Link>
      </Header>

      <ListHeader orderBy={orderBy}>
        <button type="button" onClick={handleToggleOrderBy}>
          <span>Nome</span>
          <img src="/assets/svg/arrow.svg" alt="arrow" />
        </button>
      </ListHeader>

      {contacts.map((contact) => (
        <Card key={contact.id}>
          <div className="info">
            <div className="contact-name">
              <strong>{contact.name}</strong>
              {contact.category_name && (
              <small>{contact.category_name}</small>
              )}
            </div>
            <span>{contact.email}</span>
            <span>{contact.phone}</span>
          </div>
          <div className="actions">
            <Link to={`/edit/${contact.id}`}>
              <img src="/assets/svg/edit.svg" alt="Edit" />
            </Link>
            <button type="button">
              <img src="/assets/svg/trash.svg" alt="Trash" />
            </button>
          </div>
        </Card>
      ))}
    </Container>
  );
};
