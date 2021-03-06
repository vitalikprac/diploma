import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  & svg {
    user-select: none;
    width: 100%;
    height: calc(100vh - 150px);
    g text {
      cursor: pointer;
    }
  }
`;

export const Selected = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 300px;
  height: 100%;
  padding: 0.5rem;
  overflow-y: auto;
  overflow-wrap: anywhere;
  background-color: rgba(53, 192, 192, 0.2);
`;

export const Settings = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  left: 1rem;
  top: 1rem;
  height: auto;
  width: 300px;
  padding: 0.5rem;
  background-color: rgba(53, 192, 192, 0.2);
  gap: 0.5rem;
`;

export const SettingsTitle = styled.div`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

export const SettingsColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
