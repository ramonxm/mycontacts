import styled, { css } from 'styled-components';

export const Input = styled.input`
  background: #fff;
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border: 2px solid #fff;
  height: 52px;
  border-radius: 4px;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color 0.2s ease-in;

  &:focus {
    border-color: ${({ theme }) => theme.palette.primary.main};
  }

  ${({ theme, error }) => error && css`
    color: ${theme.palette.danger.main};
    border-color: ${theme.palette.danger.main};
    &:focus {
      border-color: ${theme.palette.danger.main};
    }
  `}
`;
