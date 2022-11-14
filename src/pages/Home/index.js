import { Loader } from '../../components/Loader';
import { Modal } from '../../components/Modal';
import { ContactList } from './components/ContactsList';
import { EmptyList } from './components/EmptyList';
import { ErrorStatus } from './components/ErrorStatus';
import { Header } from './components/Header';
import { InputSearch } from './components/InputSearch';
import { SearchNotFound } from './components/SearchNotFound';
import { Container } from './style';
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
      <Header
        hasError={hasError}
        qtyOfContacts={contacts?.length}
        qtyOfFilteredContacts={filteredContacts?.length}
      />
      {hasError && (
        <ErrorStatus onTryAgain={handleTryAgain} />
      )}
      {!hasError && (
        <>
          {contacts?.length < 1 && !isLoading && (
            <EmptyList />
          )}
          {contacts?.length > 0 && filteredContacts?.length < 1 && (
          <SearchNotFound />
          )}
          <ContactList
            orderBy={orderBy}
            filteredContacts={filteredContacts}
            onDeleteContact={handleDeleteContact}
            onToggleOrderBy={handleToggleOrderBy}
          />
          <Modal
            danger
            isLoading={isLoadingDelete}
            visible={isDeleteModalVisible}
            onCancel={handleCloseDeleteModal}
            onConfirm={handleConfirmDeleteContact}
            title={`Tem certeza que deseja remover o contato "${contactBeingDeleted?.name}"?`}
          >
            <p>
              Essa ação não poderá ser desfeita!
            </p>

          </Modal>
        </>

      )}
      {contacts?.length > 0 && (
        <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />
      )}
    </Container>
  );
};
