import PropTypes from 'prop-types';
import { Container } from './style';

export const FormGroup = ({ children, error }) => (
  <Container>
    {children}
    {!!error && <small>{error}</small>}
  </Container>
);

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
  error: PropTypes.string,
};

FormGroup.defaultProps = {
  error: null,
};
