import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: flex-start;
  gap: 24px;

  span {
    color: ${({ theme }) => theme.palette.gray[200]};
    word-break: break-word;
  }
`;
