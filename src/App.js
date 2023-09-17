import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect  } from "react";
import { intervalHook } from "./intervalHook";
import {
   SCALE,
   SPEED,
   CONTROLS,
   BOARD_SIZE,
   START_AT,
   RAT_POP
 } from "./game_params";

function App() {
  const canvasRef = useRef();
  function gameInit() {
    
  }
  function endGame(){

  }
  function snakeControll(){

  }
  function ratInit(){

  }
  function detectObstacle(){

  }
  function detectRat(){

  }
  function loop(){

  }
  useEffect(() => {

  })

  return (
    <div role="button" tabIndex="0" onKeyDown={e => snakeControll(e)}>
      <canvas
        style={{ border: '1px solid black'}}
        ref={canvasRef}
        width={`${BOARD_SIZE[0]}px`}
        height={`${BOARD_SIZE[1]}px`}
      />  
      <button onClick={gameInit}>Start Game</button> 
    </div>
  );
}

export default App;
