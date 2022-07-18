import PropTypes from 'prop-types';
import { Spinner } from '../Spinner';
import * as S from './style';

const Button = ({
  children, type, isLoading, disabled, danger, onClick,
}) => (
  <S.Button
    type={type}
    onClick={onClick}
    disabled={disabled || isLoading}
    danger={danger}
  >
    {!isLoading && children}
    {isLoading && <Spinner size={16} />}
  </S.Button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
  isLoading: false,
  disabled: false,
  danger: false,
  onClick: undefined,
};

export { Button };
