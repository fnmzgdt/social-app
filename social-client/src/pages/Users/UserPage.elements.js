import styled from "styled-components";
import { Container } from "../../components/GlobalStyles";
import { ReactComponent as edit } from "../../images/edit.svg";

export const UserPageContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;

  ${Container}
`;

export const UserMenu = styled.div`
  width: 21rem;
  height: calc(100vh - 3.5rem);
  position: sticky;
  top: 56px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 0.5rem;
    visibility: none;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0);
  }
  &:hover {
    ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: rgba(230, 230, 230, 1);
  }
  }
`;

export const MenuWrap = styled.div`
  padding: 3rem 1rem 3rem 0;
`;

export const ProfileImage = styled.svg`
  display: block;
  height: 11.25rem;
  width: 11.25rem;
  background: brown;
  border-radius: 50%;
`;

export const FollowContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const BigFollowButton = styled.button`
  width: 6.25rem;
  height: 2.25rem;
  background: #f92c55;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    background: rgba(249, 44, 85, 0.7);
  }
`;

export const BigHeading = styled.p`
  font-size: 24px;
  font-weight: 700;
`;

export const FollowersAndPosts = styled.p`
  margin-top: 0.2rem;
`;
export const Caption = styled.p`
  margin-top: 0.2rem;
  color: #776a6a;
  font-size: 15px;
  font-weight: 400;
`;

export const SeparatingLine = styled.hr`
  border-bottom: 1px solid rgba(230, 230, 230, 1);
  border-top: transparent;
`;

export const MediumHeading = styled.p`
  font-size: 20px;
  font-weight: 700;
`;

export const BigSeparatingDiv = styled.div`
  height: 2rem;
  width: 100%;
  opacity: 0;
`;

export const MediumSeparatingDiv = styled.div`
  height: 1.25rem;
  width: 100%;
  opacity: 0;
`;

export const EditIcon = styled(edit)`
  width: ${(props) => props.width}rem;
  height: ${(props) => props.height}rem;
  margin-left: ${(props) => props.marginl}rem;
  fill: #776a6a;
  &:hover {
    cursor: pointer;
  }
`;

export const AlignDiv = styled.div`
  display: flex;
  align-items: center;
`;
