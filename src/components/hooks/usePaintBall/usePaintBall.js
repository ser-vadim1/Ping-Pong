import React, { useState, useEffect, useRef, Fragment } from "react";

function usePaintBall() {
  const paintBall = (context, x, y, width, height) => {
    let ctx = context.current.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  };
  return paintBall;
}

export default usePaintBall;
