import PropTypes from 'prop-types';
import { Button } from '../../../../components/Button';
import { Container } from './style';

export function ErrorStatus({ onTryAgain }) {
  return (
    <Container>
      <img src="/assets/svg/sad.svg" alt="Sad" />
      <div className="details">
        <strong>Ocorreu um erro ao obter os seus contatos!</strong>
        <Button type="button" onClick={onTryAgain}>
          Tentar novamente
        </Button>
      </div>
    </Container>
  );
}

ErrorStatus.propTypes = {
  onTryAgain: PropTypes.func.isRequired,
};
