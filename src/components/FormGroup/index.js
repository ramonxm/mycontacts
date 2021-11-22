import PropTypes from 'prop-types';
import { Container } from './style';

export const FormGroup = ({ children }) => (
  <Container>
    {children}
  </Container>
);

FormGroup.propTypes = {
  children: PropTypes.node.isRequired,
};
