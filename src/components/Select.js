import styled from 'styled-components';

export const Select = styled.select`
  background: #fff;
  width: 100%;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  border: 2px solid #fff;
  height: 52px;
  border-radius: 4px;
  border: none;
  outline: none;
  padding: 0 16px;
  font-size: 16px;
  transition: border-color .2s ease-in;
  appearance: none;

  &:focus{
    border-color: ${({ theme }) => theme.palette.primary.main};
  }

  &[disabled]{
    background: ${({ theme }) => theme.palette.gray[100]};
    border-color: ${({ theme }) => theme.palette.gray[200]};
  }
`;
