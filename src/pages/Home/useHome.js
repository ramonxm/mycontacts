import {
  useEffect, useState, useMemo, useCallback,
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

  const filteredContacts = useMemo(
    () => contacts?.filter(
      (contact) => contact.name.toLowerCase().includes(searchTerm.toLowerCase()),
    ),
    [contacts, searchTerm],
  );

  const loadContacts = useCallback(async () => {
    try {
      const contactsList = await ContactsService.listContacts(orderBy);
      setContacts(contactsList);
      setHasError(false);
    } catch {
      setHasError(true);
      setContacts([]);
    } finally {
      setIsLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    loadContacts();
  }, [orderBy, loadContacts]);

  const handleToggleOrderBy = () => {
    setOrderBy((prevState) => (prevState === 'asc' ? 'desc' : 'asc'));
  };

  const handleChangeSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleTryAgain = () => {
    loadContacts();
  };

  const handleDeleteContact = (contact) => {
    setIsDeleteModalVisible(true);
    setContactBeingDeleted(contact);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalVisible(false);
    setContactBeingDeleted(null);
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
