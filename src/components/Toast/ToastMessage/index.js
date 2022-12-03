import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Container } from './style';

export const ToastMessage = ({
  message, onRemoveMessage, isLeaving, animatedRef,
}) => {
  const handleRemoveToast = () => {
    onRemoveMessage(message.id);
  };

  useEffect(() => {
    const timeoutId = setTimeout(
      () => onRemoveMessage(message.id),
      message.duration ?? 7000,
    );

    return () => clearTimeout(timeoutId);
  }, [message, onRemoveMessage]);

  return (
    <Container
      type={message.type}
      isLeaving={isLeaving}
      onClick={handleRemoveToast}
      tabIndex={0}
      role="button"
      ref={animatedRef}
    >
      {message.type === 'danger' && (
        <img src="/assets/svg/x-circle.svg" alt="danger icon" />
      )}
      {message.type === 'success' && (
        <img src="/assets/svg/check-circle.svg" alt="success icon" />
      )}
      <strong>{message.text}</strong>
    </Container>
  );
};

ToastMessage.propTypes = {
  message: PropTypes.shape({
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['success', 'danger', 'default']),
    id: PropTypes.number.isRequired,
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
  animatedRef: PropTypes.shape().isRequired,
};
