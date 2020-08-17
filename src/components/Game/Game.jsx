import React, { useState, useEffect, useRef, Fragment } from "react";
import usePaintBall from "../hooks/usePaintBall/usePaintBall.js";
import { Canvas, WrapperCanvas, ComputerRocket, PlayerRocket } from "./styled";

// COMPONENT
const Game = () => {
  let canvasRef = useRef(null);
  let playerRocketRef = useRef(null);
  let ComputerRocketRef = useRef(null);
  let animateBall = useRef(null);
  let animateRef = useRef(null);
  const [Score, SetScore] = useState(0);
  const [width] = useState(window.innerWidth / 1.5);
  const [height] = useState(window.innerHeight / 1.5);
  let [top_PlayerRocket, setTop_PlayerRocket] = useState(height / 2 - 50);
  let [top_ComputerRocket, setTop_ComputerRocket] = useState(height / 2 - 50);
  const [startGame, setStartGame] = useState(false);
  const [moveBall, setMoveBall] = useState({
    ballRadius: 10,
    x: 43,
    y: Math.round(height / 2),
    speed_X: 4,
    speed_Y: -4,
    acceleration: 1.2,
  });
  const paintBall = usePaintBall();
  useEffect(() => {
    paintBall(canvasRef, moveBall.x, moveBall.y);
  }, []);

  const replacePositionBall = () => {
    if (!startGame) {
      moveBall.y = playerRocketRef.current.offsetTop + 50;
      paintBall(canvasRef, moveBall.x, moveBall.y, width, height);
    } else {
      return;
    }
  };

  useEffect(() => {
    const animate = () => {
      if (startGame) {
        if (moveBall.y >= height - 50) {
          setTop_ComputerRocket(height - 100);
        } else if (moveBall.y - 50 <= 0) {
          setTop_ComputerRocket(0);
        } else {
          setTop_ComputerRocket(moveBall.y - 50);
        }
        animateRef.current = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animateRef.current);
        setTop_ComputerRocket(height / 2 - 50);
      }
    };
    animate();
    return () => {
      cancelAnimationFrame(animateRef.current);
      cancelAnimationFrame(animateBall.current);
    };
  }, [startGame]);

  // MOVE ROCKET PLAYER
  const movePlayerRocket = (e) => {
    let canvasTop = canvasRef.current.getBoundingClientRect().top;
    let top = parseInt(e.changedTouches[0].clientY - canvasTop - 50);
    replacePositionBall();
    if (top <= 0) {
      setTop_PlayerRocket((top = 0));
    } else if (top > height - 100) {
      setTop_PlayerRocket(height - 100);
    } else {
      setTop_PlayerRocket(top);
    }
  };

  // Move Ball
  const movingBall = (e) => {
    let topPlayer_R = playerRocketRef.current.offsetTop;
    let topComp_R = ComputerRocketRef.current.offsetTop;
    let { ballRadius } = moveBall;
    setStartGame(true);
    if (!startGame) {
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
      } else if (moveBall.x < 0) {
        moveBall.x = 43;
        moveBall.y = height / 2;
        paintBall(canvasRef, moveBall.x, moveBall.y, width, height);
        setTop_PlayerRocket(height / 2 - 50);
        setStartGame(false);
        cancelAnimationFrame(animateBall.current);
        return;
      } else if (
        moveBall.x <= 40 &&
        moveBall.y >= topPlayer_R &&
        moveBall.y <= topPlayer_R + 100
      ) {
        moveBall.speed_X = -moveBall.speed_X;
      }
      moveBall.y += moveBall.speed_Y;
      moveBall.x += moveBall.speed_X;
      animateBall.current = requestAnimationFrame(movingBall);
      paintBall(canvasRef, moveBall.x, moveBall.y, width, height);
    }
  };

  return (
    <Fragment>
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
    </Fragment>
  );
};
export default Game;
