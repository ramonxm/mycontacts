import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Container, InputSearchContainer, Header, ListHeader, Card,
} from './style';
import { Loader } from '../../components/Loader';
import delay from '../../utils/delay';

const baseURL = 'http://localhost:3001';

export const Home = () => {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const filteredContacts = useMemo(() => contacts.filter((contact) => (
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  )), [contacts, searchTerm]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${baseURL}/contacts?orderBy=${orderBy}`);
        await delay(500);
        const contact = await response.json();
        setContacts(contact);
      } catch (error) {
        throw new Error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [orderBy]);

  const handleToggleOrderBy = () => {
    setOrderBy((prevState) => (
      prevState === 'asc' ? 'desc' : 'asc'
    ));
  };

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container>
      <Loader isLoading={isLoading} />
      <InputSearchContainer>
        <input
          type="text"
          value={searchTerm}
          placeholder="Pesquisar pelo nome..."
          onChange={handleChangeSearchTerm}
        />
      </InputSearchContainer>

      <Header>
        <strong>
          {filteredContacts.length}
          {filteredContacts.length === 1 ? ' contato' : ' contatos'}
        </strong>
        <Link to="/new-contact">Novo contato</Link>
      </Header>

      {filteredContacts.length > 0 && (
      <ListHeader orderBy={orderBy}>
        <button type="button" onClick={handleToggleOrderBy}>
          <span>Nome</span>
          <img src="/assets/svg/arrow.svg" alt="arrow" />
        </button>
      </ListHeader>
      )}

      {filteredContacts.map((contact) => (
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
