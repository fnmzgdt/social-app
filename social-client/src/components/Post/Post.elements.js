import styled from "styled-components";

export const PollCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: rgb(0 0 0 / 2%) 0px 2px 24px 0px, rgb(0 0 0 / 6%) 0px 0px 0px 1px;
  border-radius: 12px;
  align-items: center;
`;

export const PollWrapper = styled.div`
width: 100%;
  padding: 20px 40px;
`;

export const PollQuestion = styled.p`
  font-size: 20px;
  margin-bottom: 20px;
`;

export const PollOption = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 3rem;
  border: 1px solid #d4d4d4;
  border-radius: 8px;
  margin: 10px 0;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: -moz-none;
  -o-user-select: none;
  user-select: none;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    background: rgba(212, 212, 212, 0.2);
  }
  &.selected {
    border: 3px solid #aeaeae;
  }
`;

export const PollOptionText = styled.div`
  width: 100%;
  margin: 0 10px;
  z-index: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const PercantageBar = styled.div`
  position: absolute;
  height: 100%;
  width: ${(props) => `${props.barpercent}%`};
  background: rgba(175, 212, 212, 0.9);
  opacity: 0;
`;
export const OptionPercantage = styled.p`
  opacity: 0
`;

export const OptionsWrapper = styled.div`
  &.answered {
    ${PercantageBar} {
      opacity: 1;
      background: rgba(175, 212, 212, 1);
    }
    ${OptionPercantage} {
      opacity: 1;
    }
  }
`;


