import PropTypes from 'prop-types';
import { StyledSpinner } from './style';

const Spinner = ({ size }) => <StyledSpinner size={size} />;

Spinner.propTypes = {
  size: PropTypes.number,
};

Spinner.defaultProps = {
  size: 32,
};

export { Spinner };
