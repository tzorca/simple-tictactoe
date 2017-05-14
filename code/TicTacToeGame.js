var TicTacToeGame = function(gridWidth, gridHeight, callbackAfterUpdate) {

	var EMPTY_SYMBOL = "";

	var self = this;
	var internal = {};

	internal.players = [
		{
			symbol: "X",
			isHuman: true
		},
		{
			symbol: "O",
			isHuman: false
		}
	];
	
	internal.currentState = {
		playerIndex: 0,
		board: []
	};

	internal.switchTurnPlayer = function(gameState) {
		if (gameState.playerIndex >= internal.players.length - 1) {
			gameState.playerIndex = 0;
		} else {
			gameState.playerIndex++;
		}
	};

	internal.getSymbolForTurn = function(gameState) {
		return internal.players[gameState.playerIndex].symbol;
	};

	internal.turnPlayerIsHuman = function(gameState) {
		return internal.players[gameState.playerIndex].isHuman;
	};

	internal.getBoardScore = function(targetPlayerIndex, board, depth) {
		var playerSymbol = internal.players[targetPlayerIndex].symbol;

		var winningSymbol = self.getWinningSymbol(board);
		if (winningSymbol == null) {
			// No winner
			return 0;
		} else if (winningSymbol == playerSymbol) {
			// The specified player has won
			return 10 - depth;
		} else {
			// The opponent of the specified player has won
			return depth - 10;
		}
	};

	internal.minimax = function(targetPlayerIndex, gameState, depth) {
		if (self.gameIsOver(gameState.board)) {
	    return {
        score: internal.getBoardScore(targetPlayerIndex, gameState.board, depth)
      };
	  }

    depth++;
    var moveScores = [];

    var validMoves = self.getValidMoves(gameState.board);
    if (!validMoves.length) {
      return 0;
    }

    validMoves.forEach(function(move) {
    	var possibleGameState = deepClone(gameState);
      internal.updateGameStateForMove(possibleGameState, move[0], move[1]);
      var moveScore = internal.minimax(targetPlayerIndex, possibleGameState, depth);
      moveScore.move = move;

    	moveScores.push(moveScore);
    });

    if (gameState.playerIndex == targetPlayerIndex) {
        // Max
        moveScores.sort(function(a, b) {
          return b.score - a.score;
        });
    } else {
        // Min
        moveScores.sort(function(a, b) {
          return a.score - b.score;
        });
    }

    return moveScores[0];
	};

	internal.makeComputerMove = function() {
		var validMoves = self.getValidMoves(internal.currentState.board);
		if (validMoves.length == 0) {
			console.log("No valid moves left.");
			return;
		}

		var bestMoveScore = internal.minimax(internal.currentState.playerIndex, internal.currentState, 0);
    console.log(bestMoveScore);
		// var moveIdx = getRandomInt(0, validMoves.length);
		// var move = validMoves[moveIdx];

		self.makeMove(bestMoveScore.move[0], bestMoveScore.move[1], /*isHuman:*/ false);
	};

	internal.updateGameStateForMove = function(gameState, row, col) {
		gameState.board[row][col] = internal.getSymbolForTurn(gameState);
		internal.switchTurnPlayer(gameState);
	};


	self.resetGame = function() {
		for (var vIdx = 0; vIdx < gridHeight; vIdx++) {
			var gridRow = [];
			for (var hIdx = 0; hIdx < gridWidth; hIdx++) {
				gridRow.push(EMPTY_SYMBOL);
			}
			internal.currentState.board.push(gridRow);
		}
	};

	self.resetGame();

	self.gameIsOver = function(board) {
		if (self.getValidMoves(board).length == 0) {
			return true;
		}

		var winningPlayer = self.getWinningSymbol(board);

		return winningPlayer != null;
	};

	self.getWinningSymbol = function(board) {
		var rowIdx, colIdx, diagIdx;

		// all in a row match
		for (rowIdx = 0; rowIdx < gridHeight; rowIdx++) {
			var row = board[rowIdx];

			if (row[0] != EMPTY_SYMBOL && row.allValuesSame()) {
				return row[0];
			}
		}

		// all in a column match
		for (colIdx = 0; colIdx < gridWidth; colIdx++) {
			var col = [];
			for (rowIdx = 0; rowIdx < gridHeight; rowIdx++) {
				col.push(board[rowIdx][colIdx]);
			}

			if (col[0] != EMPTY_SYMBOL && col.allValuesSame()) {
				return col[0];
			}
		}

		// 3 in a diagonal match
		if (gridWidth => 3 && gridHeight >= 3) {
			var diagonals = [
				[ board[0][0], board[1][1], board[2][2] ],
				[ board[2][0], board[1][1], board[0][2] ]
			];

			for (diagIdx = 0; diagIdx < diagonals.length; diagIdx++) {
				var diag = diagonals[diagIdx];
				if (diag[0] != EMPTY_SYMBOL && diag.allValuesSame()) {
					return diag[0];
				}
			}
		}

		return null;
	};

	self.getValidMoves = function(board) {
		var validMoves = [];
		for (var rowIdx = 0; rowIdx < gridHeight; rowIdx++) {
			for (var colIdx = 0; colIdx < gridWidth; colIdx++) {
				if (self.moveIsValid(board, rowIdx, colIdx)) {
					validMoves.push([rowIdx, colIdx]);
				}
			}
		}
		return validMoves;
	};

	self.playerTypeIsValid = function(isHuman, gameState) {
		if (internal.turnPlayerIsHuman(gameState) != isHuman) {
			console.log("wrong type of player for this move (human for computer move or computer for human move)")
			return false;
		}
		return true;
	}

	self.moveIsValid = function(board, row, col) {
		if (row >= gridHeight || row < 0) {
			return false;
		}

		if (col >= gridWidth || col < 0) {
			return false;
		}

		if (board[row][col] != EMPTY_SYMBOL) {
			return false;
		}

		return true;
	};


	self.makeMove = function(row, col, isHuman) {
		if (self.gameIsOver(internal.currentState.board)) {
			alert("The game is over.");
			return;
		}

		if (!self.playerTypeIsValid(isHuman, internal.currentState) && isHuman) {
			alert("It's the computer's turn right now.");
			return;
		}

		if (!self.moveIsValid(internal.currentState.board, row, col)) {
			alert("Invalid move.");
			return;
		}

		internal.updateGameStateForMove(internal.currentState, row, col);

		callbackAfterUpdate();

		console.log("now turn " + internal.getSymbolForTurn(internal.currentState));

		if (self.gameIsOver(internal.currentState.board)) {
			console.log("Game is over!");
			var winningSymbol = self.getWinningSymbol(internal.currentState.board);
			if (winningSymbol != null) {
				alert(winningSymbol + " wins!");
			}
			return;
		}

		if (!internal.turnPlayerIsHuman(internal.currentState)) {
			window.setTimeout(function() {
				internal.makeComputerMove();	
			}, 500);
		}
	};

	self.getBoardState = function() {
		return deepClone(internal.currentState.board);
	};
};