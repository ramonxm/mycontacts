import PropTypes from 'prop-types';
import { FormGroup } from '../FormGroup';
import { Form, ButtonContainer } from './style';
import { Input } from '../Input';
import { Select } from '../Select';
import { Button } from '../Button';

export const ContactForm = ({ buttonLabel }) => (
  <Form>
    <FormGroup>
      <Input placeholder="Nome" />
    </FormGroup>
    <FormGroup>
      <Input placeholder="E-mail" />
    </FormGroup>
    <FormGroup>
      <Input placeholder="Telefone" />
    </FormGroup>
    <FormGroup>
      <Select>
        <option value="instagram">
          Instagram
        </option>
      </Select>
    </FormGroup>

    <ButtonContainer>
      <Button tye="submit">
        {buttonLabel}
      </Button>
    </ButtonContainer>
  </Form>
);

ContactForm.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
