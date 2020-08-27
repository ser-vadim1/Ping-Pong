import styled, { keyframes } from "styled-components";

export const WrapperCanvas = styled.div`
  position: relative;
  margin-top: 5%;
  border: 1px solid green;
`;
export const Canvas = styled.canvas`
  background-color: black;
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
export const HedearScore = styled.h3`
  /* display: inline-block;
  margin-left: 50%;
  transform: translateY(-50%);
  border: 1px solid black; */
`;

export const Container = styled.div`
  max-width: 1200px;
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  border: 1px solid red;
`;
