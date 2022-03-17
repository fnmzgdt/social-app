import React, { useState, useRef } from "react";
import {
  ActionButtonsContainer,
  AvatarContainer,
  AvatarImage,
  CardContainer,
  CommentIcon,
  ContentContainer,
  LikeIcon,
  NameLikeCommentContainer,
  ShareIcon,
  Username,
  Counter,
  ShareContainer,
  LikeIconBorder,
} from "./PostCard.elements";
import { useDispatch, useSelector } from "react-redux";
import { postLike, removeLike } from "../../actions/action";
import Post from "../Post/Post";

const PostCard = ({
  type,
  postId,
  userId,
  likeCount,
  liked,
  username,
  date_added,
  body,
  imageUrl,
  options_votes,
}) => {
  const myId = useSelector((state) => state.user.id);

  const dispatch = useDispatch();

  const dialog = useRef();

  const [mouseOnUsername, setMouseOnUsername] = useState(false);
  const [mouseOnDialog, setMouseOnDialog] = useState(false);
  /*const handleDoubleClick = () => {
    if (!liked) {
      const icon = document.getElementById(`${postId}${imageUrl}`);
      dispatch(postLike(myId, postId));
      setActive(true);
      icon.classList.add("like");
      setTimeout(() => {
        icon.classList.remove("like");
      }, 2000);
      //setTimeout(() => {
      //  setActive(false);
      //}, 2000);
    } else {
      dispatch(removeLike(myId, postId));
    }
  };
  */

  const handleLike = () => {
    liked
      ? dispatch(removeLike(myId, postId))
      : dispatch(postLike(myId, postId));
  };

  /*const Post = () => {
    switch (type) {
      case "post":
        return (
          <div>
            {imageUrl && (
              <ImageContainer onDoubleClick={handleDoubleClick}>
                <DoubleClickHeart id={`${postId}${imageUrl}`} />
                <PostImage src={imageUrl} />
              </ImageContainer>
            )}
            <TextBox>
              <PostContent content={content} />
            </TextBox>
          </div>
        );
      case "poll":

      default:
        console.log("popoopo");
    }
  };
*/

  const handleHover = () => {
    //wait 2s.
    //fetch user's bio, etc.
    if (mouseOnDialog) {
      setMouseOnUsername(true);
    } else {
      setTimeout(() => {
        setMouseOnUsername(true);
      }, 100);
    }
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setMouseOnUsername(false);
    }, 100);
  };

  const handleHoverDialog = () => {
    setMouseOnDialog(true);
  };

  const handleMouseLeaveDialog = () => {
    setTimeout(() => {
      setMouseOnDialog(false);
    }, 100);
  };

  return (
    <CardContainer>
      <AvatarContainer>
        <AvatarImage />
      </AvatarContainer>
      <ContentContainer>
        <NameLikeCommentContainer style={{ position: "relative" }}>
          <Username
            to={`/user/${userId}`}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
          >
            {username}
          </Username>
          {mouseOnUsername || mouseOnDialog ? (
            <div
              style={{
                width: "250px",
                height: "150px",
                backgroundColor: "rgb(250, 252, 255)",
                border: "1px solid rgba(230,230,230,1)",
                borderRadius: "8px",
                position: "absolute",
                left: "-25%",
                top: "75%",
                transition: "all .25s ease-in-out",
              }}
              onMouseEnter={handleHoverDialog}
              onMouseLeave={handleMouseLeaveDialog}
            ></div>
          ) : (
            <></>
          )}
          <ActionButtonsContainer>
            {liked ? (
              <LikeIcon onClick={handleLike} />
            ) : (
              <LikeIconBorder onClick={handleLike} />
            )}
            <Counter>{likeCount}</Counter>
            <CommentIcon />
            <Counter>6</Counter>
          </ActionButtonsContainer>
        </NameLikeCommentContainer>
        <Post
          type={"post"}
          postId={postId}
          liked={liked}
          //posts
          imageUrl={imageUrl}
          body={body}
          //polls
          options_votes={options_votes}
        />
      </ContentContainer>
      <ShareContainer>
        <ShareIcon />
      </ShareContainer>
    </CardContainer>
  );
};

export default PostCard;
