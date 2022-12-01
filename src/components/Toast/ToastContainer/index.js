import { useCallback, useEffect, useState } from 'react';
import { Container } from './style';

import { ToastMessage } from '../ToastMessage';

import { toastManager } from '../../../utils/toast';

export const ToastContainer = () => {
  const [messages, setMessages] = useState([]);
  const [pendingRemovalMessageId, setPendingRemovalMessageId] = useState([]);

  useEffect(() => {
    const handleAddToast = ({ type, text, duration }) => {
      setMessages((prevState) => [
        ...prevState,
        {
          type, text, id: Math.random(), duration,
        },
      ]);
    };
    toastManager.on('addtoast', handleAddToast);
    return () => toastManager.removeListener('addtoast', handleAddToast);
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setPendingRemovalMessageId((prevState) => [...prevState, id]);
  }, []);

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          isLeaving={pendingRemovalMessageId.includes(message.id)}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
};
