import React, { useEffect } from "react";
import PostCard from "../components/PostCard/PostCard";
import { useDispatch, useSelector } from "react-redux";
import { fetchHashtagPosts, getHashtagViews } from "../actions/action";
import Loader from "../components/Loader/Loader";

const HashtagPage = (props) => {
  const dispatch = useDispatch();
  const myId = useSelector((state) => state.user.id);
  useEffect(() => {
    const tagname = props.match.params.tagname;
    dispatch(getHashtagViews(tagname));
    dispatch(fetchHashtagPosts(tagname, myId));
  }, []);

  const views = useSelector((state) => state.data.hashtagViews);
  const posts = useSelector((state) => state.data.posts);
  const loading = useSelector((state) => state.data.loading);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Views: </h1> {views}
      {posts.length > 0 &&
        posts.map((post) => {
          return (
            <PostCard
              key={post.id}
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
              imageUrl={post.imageUrl}
              options_votes={post.options_votes}
            />
          );
        })}
      {loading && (
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
  );
};

export default HashtagPage;
