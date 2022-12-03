import PropTypes from 'prop-types';
import { Container } from './style';

export function InputSearch({ value, onChange }) {
  return (
    <Container>
      <input
        type="text"
        value={value}
        placeholder="Pesquisar pelo nome..."
        onChange={onChange}
      />
    </Container>
  );
}

InputSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
