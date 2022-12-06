import {
  useEffect, useState, useMemo, useCallback, useDeferredValue,
} from 'react';
import ContactsService from '../../services/ContactsService';
import toast from '../../utils/toast';

export const useHome = () => {
  const [contacts, setContacts] = useState([]);
  const [orderBy, setOrderBy] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  const defferedSearchTerm = useDeferredValue(searchTerm);

  const filteredContacts = useMemo(
    () => contacts?.filter(
      (contact) => contact.name.toLowerCase().includes(defferedSearchTerm.toLowerCase()),
    ),
    [contacts, defferedSearchTerm],
  );

  const loadContacts = useCallback(async (signal) => {
    try {
      const contactsList = await ContactsService.listContacts(orderBy, signal);
      setContacts(contactsList);
      setHasError(false);
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        setHasError(true);
        setContacts([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    const controller = new AbortController();
    loadContacts(controller.signal);

    return () => {
      controller.abort();
    };
  }, [orderBy, loadContacts]);

  const handleToggleOrderBy = useCallback(() => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  }, []);

  const handleChangeSearchTerm = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleTryAgain = () => {
    loadContacts();
  };

  const handleDeleteContact = useCallback((contact) => {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  }, []);

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  const handleConfirmDeleteContact = async () => {
    try {
      setIsLoadingDelete(true);
      await ContactsService.deleteContact(contactBeingDeleted.id);
      toast({
        text: 'Contato deletado com successo!',
        type: 'success',
      });
      handleCloseDeleteModal();
      setContacts((prevState) => prevState.filter(
        (contact) => contact.id !== contactBeingDeleted.id,
      ));
    } catch {
      toast({
        text: 'Ocorreu um erro ao deletar o contato!',
        type: 'danger',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  };

  return {
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
    contactBeingDeleted,
    contacts,
    searchTerm,
    orderBy,
  };
};
