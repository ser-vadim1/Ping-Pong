import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const AuthHeader = ({ onLogout }) => {
  return (
    <Wrapper>
      <div>Navigation</div>
      <button onClick={onLogout}>Logout</button>
    </Wrapper>
  );
};
