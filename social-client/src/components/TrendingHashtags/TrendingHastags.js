import React from "react";
import {
  HashtagName,
  Trending,
  TrendingHashtag,
} from "./TrendingHashtags.styles";

const TrendingHastags = () => {
  return (
    <div>
      <Trending>Trending</Trending>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        <TrendingHashtag>
          <HashtagName># ronaldo</HashtagName>
        </TrendingHashtag>
        <TrendingHashtag>
          <HashtagName># ronaldo</HashtagName>
        </TrendingHashtag>
        <TrendingHashtag>
          <HashtagName># ronaldo</HashtagName>
        </TrendingHashtag>
        <TrendingHashtag>
          <HashtagName># JESUISJESUSBLESS</HashtagName>
        </TrendingHashtag>
      </div>
    </div>
  );
};

export default TrendingHastags;
