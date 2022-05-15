import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .ant-divider-horizontal {
    margin: 0;
  }
`;

export const CloudWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: 1px solid #1d39c4;
  padding: 0.5rem;
`;

export const Step = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;
