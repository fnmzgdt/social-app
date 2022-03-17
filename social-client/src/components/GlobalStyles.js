import styled, { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*{
    box-sizing: border-box;
    font-size: 16px;
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    
}
html {
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0.75rem;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: rgba(0, 0, 0, 0.25);
  }
}
`

export const Container = styled.div`
    width: 100%;
    max-width: 68.75rem;
    margin-left: auto;
    margin-right: auto;
    display: flex;
`

export default GlobalStyle