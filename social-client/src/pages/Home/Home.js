import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPosts,
  getSuggestedUsers,
  loadPaginatedPosts,
} from "../../actions/action";
import { useLocation } from "react-router";
import PostWrite from "../../components/PostWrite";
import { HomeContainer, SideMenu } from "./Home.elements";
import PostCard from "../../components/PostCard/PostCard";
import SuggestedFriend from "../../components/SuggestedFriend/SuggestedFriend";
import { SuggestedFriends } from "../../components/SuggestedFriend/SugestedFriend.elements";
import Loader from "../../components/Loader/Loader";
import { SeparatingLine } from "../Users/UserPage.elements";
import TrendingHastags from "../../components/TrendingHashtags/TrendingHastags";
function Home() {
  //  const [posts, setPosts] = useState(null);
  // const [lastId, setLastId] = useState(null);
  const [currentScrollHeight, setCurrentScrollHeight] = useState(0);
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const lastId = state.data.lastId;
  const currentUserId = state.user.id;
  const suggestedUsers = state.data.suggestedUsers;
  //console.log(currentUserId);
  //const location = useLocation();

  useEffect(() => {
    console.log(currentUserId);
    dispatch(fetchPosts(currentUserId));
    dispatch(getSuggestedUsers(currentUserId));
  }, []);

  /* useEffect(() => {
    axios.get("/latestposts").then((res) => {
      setPosts(res.data);
      setLastId(res.data[res.data.length - 1].id);
    });
  }, []);*/

  /*  const loadPaginatedPosts = () => {
    axios.get("/paginatedposts", { params: { lastId: lastId } }).then((res) => {
      setPosts((prevState) => [...prevState, ...res.data]);
      if (res.data.length > 0) {
        setLastId(res.data[res.data.length - 1].id);
      }
    });
  };*/

  window.onscroll = () => {
    const isBottom =
      window.innerHeight + document.documentElement.scrollTop >
      document.documentElement.offsetHeight - 300;
    if (
      isBottom &&
      currentScrollHeight < document.documentElement.offsetHeight &&
      lastId !== 1 &&
      !state.data.loading
    ) {
      console.log("reached bottom");
      setCurrentScrollHeight(document.documentElement.offsetHeight);
      //dispatch(loadPaginatedPosts(currentUserId, lastId));
    }
  };

  return (
    <div style={{ backgroundColor: "#fafcff", width: "100%", height: "100%" }}>
      <HomeContainer>
        <SideMenu>
          <SuggestedFriends>Suggested friends</SuggestedFriends>
          {suggestedUsers &&
            suggestedUsers.map((user) => (
              <SuggestedFriend
                key={user.username}
                username={user.username}
                userId={user.id}
                mutualfriends={24}
              />
            ))}
          <TrendingHastags />
        </SideMenu>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {<PostWrite />}
          {state.data.posts &&
            state.data.posts.map((post) => {
              return (
                <div key={post.id + 1000}>
                  <PostCard
                    type={post.feed_type}
                    postId={post.id}
                    userId={post.user_id}
                    //likeCount={post.like_count}
                    liked={post.liked == 1 ? true : false}
                    likeCount={post.likeCount}
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
      </HomeContainer>
    </div>
  );
}

export default Home;
