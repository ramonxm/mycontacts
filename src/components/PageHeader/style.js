import styled from 'styled-components';

export const Container = styled.header`
  margin-bottom: 24px;
  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    span {
      font-weight: bold;
      color: ${({ theme }) => theme.palette.primary.main};
    }
    img {
      margin-right: 8px;
      transform: rotate(-90deg);
    }
  }
`;
