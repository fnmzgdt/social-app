import React from "react";
import { Link } from "react-router-dom";

const PostContent = ({ content }) => {
  return (
    <span>
      {content &&
        content.split(" ").map((str, i) => {
          if (str.startsWith("#")) {
            return (
              <span key={i}>
                <Link
                  to={`/hashtag/${str.slice(1)}`}
                  style={{
                    color: "red",
                    textDecoration: "none"
                  }}
                >
                  {str}
                </Link>{" "}
              </span>
            );
          }
          return str + " ";
        })}
    </span>
  );
};

export default PostContent;
