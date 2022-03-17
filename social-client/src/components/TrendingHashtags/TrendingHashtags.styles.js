import styled from "styled-components";

export const Trending = styled.p`
  margin: 1.5rem 0;
  color: #8c8c8c;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: underline;
`;

export const TrendingHashtag = styled.div`
  width: fit-content;
  display: flex;
  padding: 0.1rem 0.75rem;
  height: 1.5rem;
  border: 1px solid #c4c4c4;
  border-radius: 3rem;
  margin: 0 0.5rem 0.75rem 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: #dfdfdf;
  }
`;

export const HashtagName = styled.span`
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 18px;
`;
