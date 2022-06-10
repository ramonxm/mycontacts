import PropTypes from 'prop-types';
import { Container } from './style';

export const ToastMessage = ({ text, type }) => (
  <Container type={type}>
    {type === 'danger' && <img src="/assets/svg/x-circle.svg" alt="danger icon" />}
    {type === 'success' && <img src="/assets/svg/check-circle.svg" alt="success icon" />}
    <strong>
      {text}
    </strong>
  </Container>
);

ToastMessage.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'danger', 'default']),
};

ToastMessage.defaultProps = {
  type: 'default',
};
