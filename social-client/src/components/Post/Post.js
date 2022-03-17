import React, { useState, useEffect, useRef } from "react";
import {
  DoubleClickHeart,
  ImageContainer,
  PostImage,
  TextBox,
} from "../PostCard/PostCard.elements";
import PostContent from "../PostContent";
import { useDispatch, useSelector } from "react-redux";
import { postLike, removeLike } from "../../actions/action";
import {
  OptionPercantage,
  OptionsWrapper,
  PercantageBar,
  PollCard,
  PollOption,
  PollOptionText,
  PollQuestion,
  PollWrapper,
} from "./Post.elements";

const Post = ({ type, imageUrl, postId, liked, body, options_votes }) => {
  const myId = useSelector((state) => state.user.id);
  const dispatch = useDispatch();

  const [votes, setVotes] = useState([]);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState("");

  const [shouldLoad, setShouldLoad] = useState(false);
  const placeholderRef = useRef(null);

  useEffect(() => {
    if (type === "poll") {
      const query = options_votes;
      let meta = query.split("--");
      let optionBody = [];
      let voteCount = [];
      let optionId = [];
      let myVote;
      for (let i = 0; i !== meta.length; i++) {
        let options = meta[i].split("||");
        optionBody.push(options[0]);
        voteCount.push(Number(options[1]));
        optionId.push(options[2]);
        Number(options[3]) !== 0
          ? (myVote = Number(options[3]))
          : (myVote = "-");
      }
      setVotes(voteCount);
      setOptions(optionBody);
    }
  }, []);

  useEffect(() => {
    if (!shouldLoad && placeholderRef.current) {
      const observer = new IntersectionObserver(([{ intersectionRatio }]) => {
        if (intersectionRatio > 0) {
          setShouldLoad(true);
        }
      });
      observer.observe(placeholderRef.current);
      return () => observer.disconnect();
    }
  }, [shouldLoad, placeholderRef]);

  const handleVote = (i, body, option) => {
    const bars = document.getElementById(body);

    if (selected === "") {
      setSelected(option);
      const newVotes = [...votes];
      newVotes[i]++;
      setVotes(newVotes);
      bars.classList.add("answered");
    } else if (selected === option) {
      console.log("same selected");
      const newVotes = [...votes];
      newVotes[i]--;
      setVotes(newVotes);
      setSelected("");
      bars.classList.remove("answered");
    } else {
      const newVotes = [...votes];
      newVotes[options.indexOf(selected)]--;
      newVotes[i]++;
      setVotes(newVotes);
      setSelected(option);
    }
  };

  const handleDoubleClick = () => {
    if (!liked) {
      const icon = document.getElementById(`${postId}${imageUrl}`);
      dispatch(postLike(myId, postId));
      icon.classList.add("like");
      setTimeout(() => {
        icon.classList.remove("like");
      }, 2000);
    } else {
      dispatch(removeLike(myId, postId));
    }
  };

  switch (type) {
    case "post":
      return (
        <div>
          {imageUrl && (
            <>
              {shouldLoad ? (
                <ImageContainer onDoubleClick={handleDoubleClick}>
                  <DoubleClickHeart id={`${postId}${imageUrl}`} />
                  <PostImage src={imageUrl} />
                </ImageContainer>
              ) : (
                <div
                  ref={placeholderRef}
                  style={{
                    content: "Placeholder!",
                    width: "494px",
                    height: "300px",
                  }}
                />
              )}
            </>
          )}
          <TextBox>
            <PostContent content={body} />
          </TextBox>
        </div>
      );
    case "poll":
      return (
        <PollCard>
          <PollWrapper>
            <PollQuestion>{body}</PollQuestion>
            <OptionsWrapper id={body}>
              {options.map((option, i) => (
                <PollOption
                  key={option}
                  onClick={() => handleVote(i, body, option)}
                  className={option === selected ? "selected" : ""}
                >
                  <PollOptionText>
                    <div>{option}</div>
                    <OptionPercantage>
                      {(
                        (votes[i] / votes.reduce((a, b) => a + b) >= 0
                          ? votes[i] / votes.reduce((a, b) => a + b)
                          : 0) * 100
                      ).toFixed(1)}
                      %
                    </OptionPercantage>
                  </PollOptionText>
                  <PercantageBar
                    barpercent={(
                      (votes[i] / votes.reduce((a, b) => a + b, 0)) *
                      100
                    ).toFixed(1)}
                  />
                </PollOption>
              ))}
            </OptionsWrapper>
          </PollWrapper>
        </PollCard>
      );
    default:
      console.log("popoopo");
  }
};

export default Post;
