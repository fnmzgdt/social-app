import React from "react";
import styled from "styled-components";
import { keyframes } from "styled-components";

const elipsis1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const elipsis3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0.1);
  }
`;

const elipsis2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;

const LoaderContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
`;

const Balls1 = styled.div`
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: red;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
  left: 8px;
  animation: ${elipsis1} 0.6s infinite;
`;
const Balls2 = styled.div`
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: red;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
  left: 8px;
  animation: ${elipsis2} 0.6s infinite;
`;

const Balls3 = styled.div`
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: red;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
  left: 32px;
  animation: ${elipsis2} 0.6s infinite;
`;

const Balls4 = styled.div`
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: red;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
  left: 56px;
  animation: ${elipsis3} 0.6s infinite;
`;

const Loader = () => {
  return (
    <LoaderContainer>
      <Balls1 />
      <Balls2 />
      <Balls3 />
      <Balls4 />
    </LoaderContainer>
  );
};

export default Loader;
