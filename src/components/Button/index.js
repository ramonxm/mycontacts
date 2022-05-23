import PropTypes from 'prop-types';
import { Spinner } from '../Spinner';
import * as S from './style';

const Button = ({
  children, type, isLoading, disabled,
}) => (
  <S.Button type={type} disabled={disabled || isLoading}>
    {!isLoading && children}
    {isLoading && <Spinner size={16} />}
  </S.Button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  type: 'button',
  isLoading: false,
  disabled: false,
};

export { Button };
