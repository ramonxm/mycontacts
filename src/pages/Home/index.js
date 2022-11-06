/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-nested-ternary */
import { Link } from 'react-router-dom';
import {
  Container,
  InputSearchContainer,
  Header,
  ListHeader,
  Card,
  ErrorContainer,
  EmptyListContainer,
  SearchNotFoundContainer,
} from './style';
import { Loader } from '../../components/Loader';
import { Button } from '../../components/Button';
import { Modal } from '../../components/Modal';

import { useHome } from './useHome';

export const Home = () => {
  const {
    handleChangeSearchTerm,
    handleCloseDeleteModal,
    handleConfirmDeleteContact,
    handleDeleteContact,
    handleTryAgain,
    handleToggleOrderBy,
    filteredContacts,
    isLoadingDelete,
    hasError,
    isLoading,
    isDeleteModalVisible,
    contacts,
    contactBeingDeleted,
    searchTerm,
    orderBy,
  } = useHome();

  return (
    <Container>
      <Loader isLoading={isLoading} />

      <Modal
        danger
        isLoading={isLoadingDelete}
        visible={isDeleteModalVisible}
        onCancel={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteContact}
        title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
      />
      {contacts?.length > 0 && (
        <InputSearchContainer>
          <input
            type="text"
            value={searchTerm}
            placeholder="Pesquisar pelo nome..."
            onChange={handleChangeSearchTerm}
          />
        </InputSearchContainer>
      )}

      <Header
        justifyContent={
          hasError
            ? 'flex-end'
            : contacts?.length > 0
              ? 'space-between'
              : 'center'
        }
      >
        {!hasError && contacts?.length > 0 && (
          <strong>
            {filteredContacts?.length}
            {filteredContacts?.length === 1 ? ' contato' : ' contatos'}
          </strong>
        )}
        <Link to="/new-contact">Novo contato</Link>
      </Header>

      {hasError && (
        <ErrorContainer>
          <img src="/assets/svg/sad.svg" alt="Sad" />
          <div className="details">
            <strong>Ocorreu um erro ao obter os seus contatos!</strong>
            <Button type="button" onClick={handleTryAgain}>
              Tentar novamente
            </Button>
          </div>
        </ErrorContainer>
      )}

      {!hasError && (
        <>
          {contacts?.length < 1 && !isLoading && (
            <EmptyListContainer>
              <img src="/assets/svg/empty-box.svg" alt="empty-box" />
              <p>
                Você ainda não tem nenhum contato cadastrado! Clique no botão{' '}
                <strong>”Novo contato”</strong> à cima para cadastrar o seu
                primeiro!
              </p>
            </EmptyListContainer>
          )}

          {contacts?.length > 0 && filteredContacts?.length < 1 && (
            <SearchNotFoundContainer>
              <img
                src="/assets/svg/magnifier-question.svg"
                alt="magnifier-question"
              />
              <span>
                Nenhum resultado foi encontrado para{' '}
                <strong>{searchTerm}</strong>.
              </span>
            </SearchNotFoundContainer>
          )}

          {filteredContacts?.length > 0 && (
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
                  {contact.category.name && (
                    <small>{contact.category.name}</small>
                  )}
                </div>
                <span>{contact.email}</span>
                <span>{contact.phone}</span>
              </div>
              <div className="actions">
                <Link to={`/edit/${contact.id}`}>
                  <img src="/assets/svg/edit.svg" alt="Edit" />
                </Link>
                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact)}
                >
                  <img src="/assets/svg/trash.svg" alt="Trash" />
                </button>
              </div>
            </Card>
          ))}
        </>
      )}
    </Container>
  );
};
