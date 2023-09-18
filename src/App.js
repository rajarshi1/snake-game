import logo from './logo.svg';
import './App.css';
import React, { useState, useRef, useEffect  } from "react";
import { useIntervalHook } from "./intervalHook";
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
  const [snake, setSnake] = useState(START_AT);
  const [rat, setRat] = useState(RAT_POP);
  const [dir, setDir] = useState([0,-1]);
  const [level, setLevel] = useState(500);
  const [gameOver, setGameOver] = useState(false);

  function gameInit() {
    
  }
  function endGame(){

  }
  function snakeControll({ keycode }){
    return setDir(CONTROLS[keycode]);
  }
  function ratInit(){

  }
  function detectObstacle(){

  }
  function detectRat(){

  }
  function loop(){
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    snakeCopy.pop();
    setSnake(snakeCopy);
  }
  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = 'pink';
    snake.forEach(([x,y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = 'lightblue';
    context.fillRect(rat[0], rat[1], 1, 1); 
  }, [snake, rat, gameOver]);

  useIntervalHook(() => loop(), level )

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
