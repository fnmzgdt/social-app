import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "../GlobalStyles";
import { ReactComponent as home } from "../../images/home_black_24dp (1).svg";
import { ReactComponent as avatar } from "../../images/account_circle_black_24dp.svg";
import { ReactComponent as send } from "../../images/send.svg";

export const Nav = styled.nav`
  background: white;
  height: 3.5rem;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 999;
`;

export const NavbarContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  ${Container}
`;

export const Icon = styled(Link)`
  font-family: Tahoma;
  font-size: 24px;
  font-weight: 800;
  text-decoration: none;
  color: black;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const HomeIcon = styled(home)`
  color: black;
  width: 31px;
  height: 31px;
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export const IconLink = styled(Link)`
  align-items: center;
  justify-content: center;
  display: flex;
`;

export const AvatarIcon = styled(avatar)`
  color: black;
  width: 28px;
  height: 28px;
  margin-left: 20px;
  &:hover {
    cursor: pointer;
  }
`;

export const SendIcon = styled(send)`
  //transform: rotate(21.97deg);
  stroke: black;
  stroke-width: 16;
  color: black;
  width: 22px;
  height: 22px;
  &:hover {
    cursor: pointer;
  }
`;
