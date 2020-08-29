import React, {
  useState,
  useEffect,
  useRef,
  Fragment,
  useContext,
} from "react";
import usePaintBall from "../hooks/usePaintBall/usePaintBall.js";
import {
  Canvas,
  WrapperCanvas,
  ComputerRocket,
  PlayerRocket,
  HedearScore,
  Container,
} from "./styled";
import * as firebase from "firebase";
import { AuthContext } from "../../components/Auth/index";
import { Score } from "../../pages/Score/Score.jsx";
import { useCountRenders } from "../hooks/useCountRenders/useCountRenders";
// COMPONENT

const Game = () => {
  let canvasRef = useRef(null);
  let playerRocketRef = useRef(null);
  let ComputerRocketRef = useRef(null);
  let animateBall = useRef(null);
  const [width] = useState(window.innerWidth / 1.5);
  const [height] = useState(window.innerHeight / 1.5);
  const [score, setScore] = useState(0);
  const [top_PlayerRocket, setTop_PlayerRocket] = useState(height / 2 - 50);
  const [top_ComputerRocket, setTop_ComputerRocket] = useState(height / 2 - 50);
  const [startGame, setStartGame] = useState(false);
  const [keyTimestamp, setKey] = useState([]);
  const [moveBall, setMoveBall] = useState({
    ballRadius: 10,
    x: 43,
    y: Math.round(height / 2),
    speed_X: 7,
    speed_Y: -7,
    acceleration: 1.2,
  });
  const { email, uid, displayName } = firebase.auth().currentUser;
  let db = firebase.database();
  let time = new Date().toLocaleString();

  const paintBall = usePaintBall();
  useEffect(() => {
    let mount = true;
    mount && paintBall(canvasRef, moveBall.x, moveBall.y, width, height);
    return () => {
      mount = false;
    };
  }, [startGame]);

  const replacePositionBall = () => {
    if (!startGame) {
      moveBall.y = playerRocketRef.current.offsetTop + 50;
      paintBall(canvasRef, moveBall.x, moveBall.y, width, height);
    } else {
      return;
    }
  };

  // MOVE ROCKET PLAYER
  const movePlayerRocket = (e) => {
    let canvasTop = canvasRef.current.getBoundingClientRect().top;
    let top = parseInt(e.changedTouches[0].clientY - canvasTop - 50);
    replacePositionBall();
    if (top <= 0) {
      setTop_PlayerRocket(0);
    } else if (top > height - 100) {
      setTop_PlayerRocket(height - 100);
    } else {
      setTop_PlayerRocket(top);
    }
  };

  // Move Ball
  const movingBall = async (e) => {
    let topPlayer_R = playerRocketRef.current.offsetTop;
    let topComp_R = ComputerRocketRef.current.offsetTop;
    let { ballRadius } = moveBall;
    if (moveBall.y - 50 <= 0) {
      setTop_ComputerRocket(0);
    } else if (moveBall.y >= height - 50) {
      setTop_ComputerRocket(height - 100);
    } else {
      setTop_ComputerRocket(moveBall.y - 50);
    }

    if (!startGame) {
      setStartGame(true);
      moveBall.x = moveBall.x + moveBall.speed_X;
      moveBall.x += moveBall.speed_X;
      moveBall.y += moveBall.speed_Y;
      setMoveBall({ ...moveBall });
      animateBall.current = requestAnimationFrame(movingBall);
      paintBall(canvasRef, moveBall.x, moveBall.y, width, height);
      if (
        moveBall.y + moveBall.speed_Y > height - ballRadius ||
        moveBall.y + moveBall.speed_Y < ballRadius
      ) {
        moveBall.speed_Y = -moveBall.speed_Y;
      } else if (
        moveBall.x + moveBall.speed_X > width - 40 &&
        moveBall.y >= topComp_R &&
        moveBall.y <= topComp_R + 100
      ) {
        moveBall.speed_X = -moveBall.speed_X;
      } else if (moveBall.x + ballRadius < 0) {
        setMoveBall({ ...moveBall, x: 43, y: Math.round(height / 2) });
        setTop_PlayerRocket(height / 2 - 50);
        setTop_ComputerRocket(height / 2 - 50);
        setStartGame(false);
        setScore((prev) => prev + 1);
        cancelAnimationFrame(animateBall.current);
        animateBall.current = null;
        return;
      } else if (
        moveBall.x <= 40 &&
        moveBall.y >= topPlayer_R &&
        moveBall.y <= topPlayer_R + 100
      ) {
        moveBall.speed_X = -moveBall.speed_X;
      }
    }
  };

  return (
    <Fragment>
      <Container>
        <HedearScore>
          {displayName}: {score} - Computer: 0
        </HedearScore>

        <WrapperCanvas>
          <Canvas
            onTouchStart={movingBall}
            ref={canvasRef}
            width={width}
            height={height}
          ></Canvas>
          <PlayerRocket
            ref={playerRocketRef}
            Top={top_PlayerRocket}
            onTouchMove={movePlayerRocket}
          />
          <ComputerRocket ref={ComputerRocketRef} Top={top_ComputerRocket} />
        </WrapperCanvas>
      </Container>
    </Fragment>
  );
};
export default Game;
