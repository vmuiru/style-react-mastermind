// Add an import statement for the useState hook using the "named import" syntax
import { useState } from "react";

import './App.css';
import GameBoard from './components/GameBoard/GameBoard';
import ColorPicker from './components/ColorPicker/ColorPicker';
import GameTimer from './components/GameTimer/GameTimer';
import NewGameButton from './components/NewGameButton/NewGameButton';

function App (){
    const colors = ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'];
    

    const [selColorIdx, setColorIdx] = useState(0);

    const [gameState, setGameState] = useState({
      guesses: [getNewGuess(), getNewGuess(), getNewGuess(), getNewGuess()],
      code: genCode()
    });


    /* helper functions */

    function genCode() {
      return new Array(4).fill().map(() => Math.floor(Math.random() * colors.length));
    }


    function getNewGuess() {
      return {
        code: [1,3,0,2],
        score: {
          perfect: 0,
          almost: 0
        }
      };
    }

    function getWinTries() {
      // if winner, return num guesses, otherwise 0 (no winner)
      let lastGuess = gameState.guesses.length - 1;
      return gameState.guesses[lastGuess].score.perfect === 4 ? lastGuess + 1 : 0;
    }
    
    const winTries = getWinTries();

    return (
      <div className="App">
        <header className='App-header-footer'>R E A C T &nbsp;&nbsp;&nbsp;M A S T E R M I N D</header>
        <div className="flex-h align-flex-end">
          <GameBoard colors={colors} guesses={gameState.guesses} />
          <div className="App-controls">
            <ColorPicker 
                colors={colors} 
                selColorIdx={selColorIdx}
                setColorIdx={setColorIdx}
                />
            <GameTimer />
            <NewGameButton />
          </div>
        </div>
        <footer className='App-header-footer'>{winTries ? `You Won in ${winTries} Guesses!` : 'Good Luck!'}</footer>
      </div>
    );
}

export default App;