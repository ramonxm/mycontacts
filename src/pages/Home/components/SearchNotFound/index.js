/* eslint-disable react/jsx-one-expression-per-line */
import PropTypes from 'prop-types';
import { Container } from './style';

export const SearchNotFound = ({ searchTerm }) => (
  <Container>
    <img
      src="/assets/svg/magnifier-question.svg"
      alt="magnifier-question"
    />
    <span>Nenhum resultado foi encontrado para <strong>{searchTerm}</strong>.</span>
  </Container>
);

SearchNotFound.propTypes = {
  searchTerm: PropTypes.string.isRequired,
};
