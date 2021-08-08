import styled from 'styled-components';

export const Link = styled.a`
  width: 100%;
`;

export const AvatarContainer = styled.div`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  margin-top: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  color: var(--text);
  width: 100%;
  max-width: 100%;
  transition: transform 0.2s ease-in-out;

  :hover {
    transform: translateY(-1rem);
  }
`;

export const StreamerAvatar = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 1px solid var(--gray800);
`;

export const StreamerInformation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StreamerName = styled.h2`
  font-size: 16px;
  line-height: 18px;
  letter-spacing: -0.02em;
`;

export const StreamerDescription = styled.p`
  font-size: 14px;
  line-height: 16px;
  letter-spacing: -0.02em;
`;
