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
  const [score, setScore] = useState(0);

  function gameInit() {
    setSnake(START_AT);
    setRat(RAT_POP);
    setDir([0,-1]);
    setLevel(SPEED);
    setGameOver(false);
    setScore(0); 
  }

  function endGame(){
    setLevel(null);
    setGameOver(true);
  }

  function snakeControll({ keyCode }){
    return setDir(CONTROLS[keyCode]);
  }

  function ratInit(){
    return rat.map((_,i) => Math.floor(Math.random() * (BOARD_SIZE[i]) / SCALE));
  }

  function detectObstacle(obstacle, snk = snake){
      if(
        obstacle[0] * SCALE >= BOARD_SIZE[0]
        || obstacle[0] < 0
        || obstacle[1] * SCALE >= BOARD_SIZE[1]
        || obstacle[1] < 0
      ){ 
        return true;
      }  
      // } else {return false};    
      for (const part of snk){
        if(obstacle[0] === part[0] && obstacle[1] === part[1]){ 
          return true
        }; 
      } 
    return false;    
  }

  function detectRat(newSnake){
    if(newSnake[0][0] === rat[0] && newSnake[0][1] === rat[1]){
      let newRat = ratInit();
      while (detectObstacle(newRat, newSnake)){
        newRat = ratInit();
      }
      setRat(newRat);
      setScore(score + 1);
      return true;
    }
    return false; 
  }

  function loop(){
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]];
    snakeCopy.unshift(newSnakeHead);
    if (detectObstacle(newSnakeHead)){
      endGame();
    } 
    if (!detectRat(snakeCopy)){
      snakeCopy.pop();
    }
    // snakeCopy.pop();
    setSnake(snakeCopy);
  }

  useEffect(() => {
    const context = canvasRef.current.getContext('2d');
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = 'green';
    snake.forEach(([x,y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = 'red';
    context.fillRect(rat[0], rat[1], 1, 1); 
  }, [snake, rat, gameOver]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      snakeControll(e);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useIntervalHook(() => loop(), level )

  return (
    <div role="button" tabIndex="0" onKeyDown={e => snakeControll(e)}>
      <canvas
        style={{ border: '1px solid black'}}
        ref={canvasRef}
        width={`${BOARD_SIZE[0]}px`}
        height={`${BOARD_SIZE[1]}px`}
      />
      <div>Score: {score}</div>  
      {gameOver && <div>GAME OVER!</div>}
      <button onClick={gameInit}>Start Game</button> 
    </div>
  );
}

export default App;
