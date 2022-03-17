import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FollowButton,
  NumberOfMutualFriends,
  SuggestedFriendContainer,
  UsernameMutualWrapper,
} from "./SugestedFriend.elements";

import { AvatarImage, Username } from "../PostCard/PostCard.elements";
import { followUser } from "../../actions/action";

const SuggestedFriend = ({ username, userId, mutualfriends }) => {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.id);

  const handleFollow = () => {
    dispatch(followUser(currentUserId, userId));
  };

  return (
    <SuggestedFriendContainer>
      <AvatarImage />
      <UsernameMutualWrapper>
        <Username to="/ddd">{username}</Username>
        <NumberOfMutualFriends>N/A mutual friends</NumberOfMutualFriends>
      </UsernameMutualWrapper>
      <FollowButton onClick={handleFollow}>Follow</FollowButton>
    </SuggestedFriendContainer>
  );
};

export default SuggestedFriend;
