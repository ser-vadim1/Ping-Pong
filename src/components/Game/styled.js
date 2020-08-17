import styled, { keyframes } from "styled-components";

export const WrapperCanvas = styled.div`
  position: fixed;
  margin-top: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export const Canvas = styled.canvas`
  background: rgb(19, 19, 19);
  background: linear-gradient(
    90deg,
    rgba(19, 19, 19, 0.8211659663865546) 100%,
    rgba(216, 216, 226, 1) 100%
  );
`;

export const ComputerRocket = styled.div`
  position: absolute;
  top: ${(props) => props.Top + "px"};
  right: 0;
  background-color: #15114f;
  width: 30px;
  height: 100px;
  border: 2px solid #d7d8df;
`;
export const PlayerRocket = styled(ComputerRocket)`
  background-color: #1f38b7;
  top: ${(props) => props.Top + "px"};
  left: 0;
`;
