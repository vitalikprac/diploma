import styled from 'styled-components';

export const Wrapper = styled.div`
  font-size: 1.25rem;
`;

export const TextSpan = styled.span`
  font-size: 1rem;
`;

export const StepDiv = styled.div`
  margin-top: ${(props) => (props.firstTop ? '0' : '1rem')};
  font-weight: bold;
  opacity: ${(props) => (props.disabled ? '0.4' : '1')};
`;

export const JsonWrapper = styled.div`
  font-size: 1rem;
`;

export const SelectField = styled.div`
  ul,
  li {
    list-style: none;
    text-decoration: none;
  }
`;

export const ChildField = styled.div`
  margin-left: 1rem;
`;
