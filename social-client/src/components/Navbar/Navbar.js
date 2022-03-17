import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  Nav,
  NavbarContainer,
  Icon,
  HomeIcon,
  SendIcon,
  AvatarIcon,
  IconContainer,
  IconLink,
} from "./Navbar.elements";

const Navbar = () => {
  const history = useHistory();
  const userId = useSelector((state) => state.user.id);
  return (
    <Nav>
      <NavbarContainer>
        <Icon to="/home">LinkSlide</Icon>
        <IconContainer>
          <SendIcon />
          <IconLink to="/home">
            <HomeIcon />
          </IconLink>
          <IconLink to={`/user/${userId}`}>
            <AvatarIcon />
          </IconLink>
        </IconContainer>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
