import styled from "styled-components";

export const SuggestedFriends = styled.p`
  margin: 1.5rem 0;
  color: #8c8c8c;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: underline;
`;

export const SuggestedFriendContainer = styled.div`
  width: 17.5rem;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
`;

export const UsernameMutualWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const NumberOfMutualFriends = styled.p`
  color: #7e7878;
  font-size: 14px;
  font-weight: 400;
`;

export const FollowButton = styled.button`
  width: 5.75rem;
  height: 2rem;
  background: #fafcff;
  border: 2px solid #f92c55;
  border-radius: 4px;
  color: #f92c55;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: rgba(249, 44, 85, 0.2);
  }
`;
