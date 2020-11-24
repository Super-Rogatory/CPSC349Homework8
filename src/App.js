// Chukwudi Ikem. NOTE* I used a plethora of online resources and could only come up with a partially working game. Enjoy.
import React from 'react';
import './App.css';

class App extends React.Component {
    constructor(){
        super();

        this.state = {
            player1: 1,
            player2: 2,
            currentPlayer: null,
            board: [],
            winner: '', //message -> winner
            gameOver: false
          };
        this.start = this.start.bind(this);
    }

    initializeBoard() {
        let frame = [];
        for(let i = 0; i < 6; i++){
          let row = [];
          for(let j = 0; j < 7; j++) {
            row.push(0);
          }
          frame.push(row);
          
          this.setState({
            board: frame,
            currentPlayer: this.state.player1,
            playerTurn: this.state.player2,
            gameOver: false,
            message: ''
          });
        }
    }
    nextTurn() {
        if(this.state.currentPlayer === this.state.player1){
          return this.state.player2;
        }
        return this.state.player1;
    }
    status() {
        let result = this.checkWinner(this.state.board);
        if(this.state.gameOver !== true){ 
          if (result === this.state.player1) {
            this.setState({ board: this.state.board, gameOver: true, message: 'Player 1 wins!' });
          } else if (result === this.state.player2) {
            this.setState({ board: this.state.board, gameOver: true, message: 'Player 2 wins!' });
          } else if (result === 'draw') {
            this.setState({ board: this.state.board, gameOver: true, message: `It's a draw.` });
          } else {
            this.setState({ board: this.state.board, currentPlayer: this.nextTurn() });
          }
        }
    }
    start(col){
        if(this.state.gameOver !== true) {
          let board = this.state.board;
          for(let row = 5; row >= 0; row--) {
            if(!this.state.board[row][col]) {
              board[row][col] = this.state.currentPlayer;
              break;
            }
          }
          this.status();
        }else {
          this.setState({ message: 'Game over. Please start a new game.' });
        }
    }
    checkLine(a,b,c,d) {
      return ((a !== null) && (a === b) && (a === c) && (a === d));
    }
    checkWinner(cb){
        for (let col = 0; col < 7; col++){
          for(let row = 0; row < 4; row++){
            if(this.checkLine(cb[col][row], cb[col][row + 1], cb[col][row + 2], cb[col][row + 3])) {
              return cb[col][row] + ' wins';
            }
          }
        }
        for (let row = 0; row < 6; row++){
          for(let col = 0; col < 4; col++){
            if(this.checkLine(cb[col][row], cb[col + 1][row], cb[col + 2][row], cb[col + 3][row])) {
              return cb[col][row] + ' wins';
            }
          }
        }
        for (let row = 0; row < 7; row++){
          for(let col = 0; col < 4; col++){
            if(this.checkLine(cb[col][row], cb[col + 1][row + 1], cb[col + 2][row + 2], cb[col + 3][row + 3])) {
              return cb[col][row] + ' wins';
            }
          }
        }
        for (let row = 0; row < 7; row++){
          for(let col = 3; col < 6; col++){
            if(this.checkLine(cb[col][row], cb[col - 1][row + 1], cb[col - 2][row + 2], cb[col - 3][row + 3])) {
              return cb[col][row] + ' wins';
            }
          }
        }
    }
    render(){
        return (
            <div>
              <div className="button" onClick={() => {this.initializeBoard()}}>New Game!</div>
              
              <table>
                <thead>
                </thead>
                <tbody>
                  {this.state.board.map((row, i) => (<Row key={i} row={row} start={this.start} />))}
                </tbody>
              </table>
              
            </div>
          );
        }
      
    //checkDraw

}
// Row component
const Row = ({ row, start }) => {
    return (
      <tr>
        {row.map((cell, i) => <Cell key={i} value={cell} columnIndex={i} start={start} />)}
      </tr>
    );
  };
  
  const Cell = ({ value, columnIndex, start }) => {
    let color = 'white';
    if (value === 1) {
      color = 'red';
    } else if (value === 2) {
      color = 'yellow';
    }
      
    return (
      <td>
        <div className="cell" onClick={() => {start(columnIndex)}}>
          <div className={color}></div>
        </div>
      </td>
    );
  };
  
  export default App;