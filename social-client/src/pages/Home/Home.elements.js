import styled from "styled-components";
import { Container } from "../../components/GlobalStyles";

export const HomeContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  
  ${Container}
`;
export const SideMenu = styled.div`
  width: 22.5rem;
  height: calc(100vh - 56px);
  position: sticky;
  top: 56px;
`;
