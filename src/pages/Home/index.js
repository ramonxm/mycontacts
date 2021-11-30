import { Link } from 'react-router-dom';
import {
  Container, InputSearchContainer, Header, ListContainer, Card,
} from './style';

export const Home = () => (
  <Container>
    <InputSearchContainer>
      <input type="text" placeholder="Pesquisar pelo nome..." />
    </InputSearchContainer>
    <Header>
      <strong>3 contatos</strong>
      <Link to="/new-contact">Novo contato</Link>
    </Header>
    <ListContainer>
      <header>
        <button type="button">
          <span>Nome</span>
          <img src="/assets/svg/arrow.svg" alt="arrow" />
        </button>
      </header>
      <Card>
        <div className="info">
          <div className="contact-name">
            <strong>Ramon Xavier</strong>
            <small>instagram</small>
          </div>
          <span>ramon1234rxm@gmail.com</span>
          <span>(21) 98929-9455</span>
        </div>
        <div className="actions">
          <a href="/">
            <img src="/assets/svg/edit.svg" alt="Edit" />
          </a>
          <button type="button">
            <img src="/assets/svg/trash.svg" alt="Trash" />
          </button>
        </div>
      </Card>
    </ListContainer>
  </Container>
);
