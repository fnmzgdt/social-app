import styled from "styled-components";
import { keyframes } from "styled-components";
import { ReactComponent as like } from "../../images/favorite.svg";
import { ReactComponent as likeborder } from "../../images/heartbord.svg";
import { ReactComponent as comment } from "../../images/chat.svg";
import { ReactComponent as share } from "../../images/share.svg";
import { Link } from "react-router-dom";

export const CardContainer = styled.div`
  width: 38rem;
  display: flex;
  padding: 3rem 0;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
`;

export const AvatarContainer = styled.div`
  width: 3rem;
  height: 100%;
  margin-right: 12px;
`;

export const AvatarImage = styled.svg`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: purple;
`;

export const ContentContainer = styled.div`
  width: 34.25rem;
  background: inherit;
  display: flex;
  flex-direction: column;
`;

export const NameLikeCommentContainer = styled.div`
  width: 100%;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Username = styled(Link)`
  font-size: 16px;
  font-weight: 700;
  color: black;
  text-decoration: none;
`;

export const ActionButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;

export const LikeIcon = styled(like)`
  width: 1.625rem;
  height: 1.625rem;
  fill: black;
  opacity: 0.8;
  margin-right: -2px;
  &:hover {
    cursor: pointer;
  }
`;

export const LikeIconBorder = styled(likeborder)`
  width: 1.625rem;
  height: 1.625rem;
  fill: black;
  opacity: 0.8;
  margin-right: -2px;
  &:hover {
    cursor: pointer;
  }
`;

export const CommentIcon = styled(comment)`
  width: 1.4rem;
  height: 1.4rem;
  fill: black;
  opacity: 0.8;
`;
export const Counter = styled.div`
  font-weight: 500;
  font-size: 14px;
  width: 2rem;
  text-align: center;
`;

export const ShareIcon = styled(share)`
  width: 1.4rem;
  height: 1.4rem;
  fill: black;
  opacity: 0.8;
`;

export const ImageContainer = styled.div`
  width: 100%;
  padding-right: 10px;
  margin-bottom: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  -webkit-user-select: none;
`;

export const PostImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 16px;
`;

export const TextBox = styled.p`
  padding-right: 10px;
  font-size: 15px;
  font-weight: 400;
  color: #0f1419;
`;

export const ShareContainer = styled.div`
  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const likeHeartAnimation = keyframes`
  0%,
  to {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  15% {
    opacity: 0.95;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  30% {
    -webkit-transform: scale(0.95);
    transform: scale(0.95);
  }
  45%,
  80% {
    opacity: 0.95;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
`;

export const DoubleClickHeart = styled(like)`
  position: absolute;
  display: inline-block;
  width: 150px;
  height: 150px;
  opacity: 0;
  fill: red;
  &.like {
    animation-name: ${likeHeartAnimation};
    animation-duration: 2s;
    animation-iteration-count: ease-in-out forwards;
  }
`;

/*export const DoubleClickHeart = styled(like)`
  position: absolute;
  display: inline-block;
  width: 150px;
  height: 150px;
  opacity: 0;
  fill: red;
    animation-name: ${props => (props.active ? likeHeartAnimation : "" )};
    animation-duration: 2s;
    animation-iteration-count: ease-in-out forwards;
`;
*/

export const Separator = styled.hr`
  color: #776a6a;
  opacity: 0.7;
`;
