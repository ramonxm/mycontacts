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

  const hasContacts = !hasError && contacts?.length > 0;
  const isListEmpty = !hasError && (!isLoading && !hasContacts);
  const isSearchEmpty = !hasError && (hasContacts && filteredContacts?.length < 1);

  return (
    <Container>
      <Loader isLoading={isLoading} />
      {hasContacts && <InputSearch value={searchTerm} onChange={handleChangeSearchTerm} />}
      <Header
        hasError={hasError}
        qtyOfContacts={contacts?.length}
        qtyOfFilteredContacts={filteredContacts?.length}
      />
      {hasError && <ErrorStatus onTryAgain={handleTryAgain} />}
      {isListEmpty && <EmptyList />}
      {isSearchEmpty && <SearchNotFound searchTerm={searchTerm} />}
      {hasContacts && (
        <>
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
    </Container>
  );
};
