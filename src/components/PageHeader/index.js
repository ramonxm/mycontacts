import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as S from './style';

export const PageHeader = ({ title }) => (
  <S.Container>
    <Link to="/">
      <img src="/assets/svg/arrow.svg" alt="back" />
      <span>Voltar</span>
    </Link>
    <h1>
      {title}
    </h1>
  </S.Container>
);

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
};
