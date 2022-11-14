import styled from 'styled-components';

export const Container = styled.header`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent};
  border-bottom: 2px solid ${({ theme }) => theme.palette.gray[100]};
  padding-bottom: 16px;
  strong {
    font-size: 24px;
  }

  a {
    color: ${({ theme }) => theme.palette.primary.main};
    text-decoration: none;
    font-weight: bold;
    border: 2px solid ${({ theme }) => theme.palette.primary.main};
    padding: 8px 16px;
    border-radius: 4px;
    transition: all .2s ease-in;

    &:hover {
      background: ${({ theme }) => theme.palette.primary.main};
      color: #fff;
    }
  }
`;
