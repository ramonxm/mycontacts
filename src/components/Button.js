import styled from 'styled-components';

export const Button = styled.button`
  height: 52px;
  padding: 0 16px;
  border: none;
  background: ${({ theme }) => theme.palette.primary.main};
  font-size: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
  transition: background .2 ease-in;

  &:hover {
    background: ${({ theme }) => theme.palette.primary.ligth};
  }

  &:active {
    background: ${({ theme }) => theme.palette.primary.dark};
  }

  &[disabled] {
    background: #ccc;
    cursor: default;
  }
`;
