import React, { useEffect } from "react";
import { fetchUserPosts } from "../../actions/action";
import { useDispatch, useSelector } from "react-redux";
import PostCard from "../../components/PostCard/PostCard";
import {
  BigFollowButton,
  BigHeading,
  BigSeparatingDiv,
  FollowContainer,
  FollowersAndPosts,
  ProfileImage,
  UserMenu,
  UserPageContainer,
  Caption,
  SeparatingLine,
  MediumHeading,
  MediumSeparatingDiv,
  MenuWrap,
  EditIcon,
  AlignDiv,
} from "./UserPage.elements";
import Loader from "../../components/Loader/Loader";

const UserPage = (props) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);

  useEffect(() => {
    const userId = props.match.params.userid;
    dispatch(fetchUserPosts(userId));
  }, [props.match.params.userid]);

  return (
    <UserPageContainer>
      <UserMenu>
        <MenuWrap>
          <ProfileImage />
          <BigSeparatingDiv />
          <FollowContainer>
            <BigHeading>
              {state.data.posts.length > 0 && state.data.posts[0].username}
            </BigHeading>
            {2 === 3 && <BigFollowButton>Follow</BigFollowButton>}
            <BigFollowButton>Followers</BigFollowButton>
          </FollowContainer>
          <FollowersAndPosts>112 followers 54 posts</FollowersAndPosts>
          <BigSeparatingDiv />
          <AlignDiv>
            <BigHeading>About Me</BigHeading>
            <EditIcon width={2} height={2} marginl={0.75} />
          </AlignDiv>
          <Caption>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.
            Nulla consequat massa quis enim. Donec pede justo, fringilla vel.
          </Caption>
          <MediumSeparatingDiv />
          <SeparatingLine />
          <MediumSeparatingDiv />
          <AlignDiv>
            <MediumHeading>Website</MediumHeading>
            <EditIcon width={1.5} height={1.5} marginl={0.5} />
          </AlignDiv>
          <Caption>www.bitcoin.com</Caption>
          <MediumSeparatingDiv />
          <AlignDiv>
            <MediumHeading>Contacts</MediumHeading>
            <EditIcon width={1.5} height={1.5} marginl={0.5} />
          </AlignDiv>
          <Caption>blahblahblah@yahoo.com</Caption>
          <MediumSeparatingDiv />
          <AlignDiv>
            <MediumHeading>Developers</MediumHeading>
            <EditIcon width={1.5} height={1.5} marginl={0.5} />
          </AlignDiv>
          <Caption>Elon Musk, Leo Messi, Hasbulla</Caption>
          <MediumSeparatingDiv />
          <AlignDiv>
            <MediumHeading>Website</MediumHeading>
            <EditIcon width={1.5} height={1.5} marginl={0.5} />
          </AlignDiv>
          <Caption>www.bitcoin.com</Caption>
          <MediumSeparatingDiv />
          <AlignDiv>
            <MediumHeading>Contacts</MediumHeading>
            <EditIcon width={1.5} height={1.5} marginl={0.5} />
          </AlignDiv>
          <Caption>blahblahblah@yahoo.com</Caption>
          <MediumSeparatingDiv />
          <AlignDiv>
            <MediumHeading>Developers</MediumHeading>
            <EditIcon width={1.5} height={1.5} marginl={0.5} />
          </AlignDiv>
          <Caption>Elon Musk, Leo Messi, Hasbulla</Caption>
        </MenuWrap>
      </UserMenu>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {state.data.posts.length > 0 &&
          state.data.posts.map((post) => {
            return (
              <div key={post.id + 1000}>
                <PostCard
                  type={post.feed_type}
                  postId={post.id}
                  userId={post.user_id}
                  //likeCount={post.like_count}
                  //liked={post.liked_by_current_user == 1 ? true : false}
                  likeCount={"12"}
                  liked={false}
                  username={post.username}
                  date_added={post.date_added}
                  body={post.body}
                  imageUrl={post.imageUrl ? post.imageUrl[0] : null}
                  options_votes={post.options_votes}
                />
              </div>
            );
          })}
        {state.data.loading && (
          <div
            style={{
              width: "608px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Loader />
          </div>
        )}
      </div>
    </UserPageContainer>
  );
};

export default UserPage;
