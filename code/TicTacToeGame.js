var TicTacToeGame = function(gridWidth, gridHeight, updateCallback) {
	var self = this;

	var EMPTY_SYMBOL = "";

	var players = [
		{
			symbol: "X",
			isHuman: true
		},
		{
			symbol: "O",
			isHuman: false
		}
	];
	
	var currentPlayerIndex = 0;
	var currentBoard = [];

	var incrementCurrentPlayer = function() {
		if (currentPlayerIndex >= players.length - 1) {
			currentPlayerIndex = 0;
		} else {
			currentPlayerIndex++;
		}
	};

	self.resetGame = function() {
		for (var vIdx = 0; vIdx < gridHeight; vIdx++) {
			var gridRow = [];
			for (var hIdx = 0; hIdx < gridWidth; hIdx++) {
				gridRow.push(EMPTY_SYMBOL);
			}
			currentBoard.push(gridRow);
		}
	};

	self.resetGame();

	self.getCurrentSymbol = function() {
		return players[currentPlayerIndex].symbol;
	};

	self.currentPlayerIsHuman = function() {
		return players[currentPlayerIndex].isHuman;
	};

	self.gameIsOver = function(board) {
		if (self.getValidMoves(board).length == 0) {
			return true;
		}

		var winningPlayer = self.getWinningSymbol(board);

		if (winningPlayer != null) {
			return true;
		}
		return false;
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

	var makeComputerMove = function() {
		var validMoves = self.getValidMoves(currentBoard);
		if (validMoves.length == 0) {
			console.log("No valid moves left.");
			return;
		}
		var moveIdx = getRandomInt(0, validMoves.length);
		var move = validMoves[moveIdx];

		self.makeMove(move[0], move[1], /*isHuman:*/ false);
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

	self.playerTypeIsValid = function(isHuman) {
		if (self.currentPlayerIsHuman() != isHuman) {
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
		if (self.gameIsOver(currentBoard)) {
			alert("The game is over.");
			return;
		}

		if (!self.playerTypeIsValid(isHuman) && isHuman) {
			alert("It's the computer's turn right now.");
			return;
		}

		if (!self.moveIsValid(currentBoard, row, col)) {
			alert("Invalid move.");
			return;
		}

		currentBoard[row][col] = self.getCurrentSymbol();

		incrementCurrentPlayer();

		updateCallback();
		console.log("now turn " + self.getCurrentSymbol());

		if (self.gameIsOver(currentBoard)) {
			console.log("Game is over!");
			var winningSymbol = self.getWinningSymbol(currentBoard);
			if (winningSymbol != null) {
				alert(winningSymbol + " wins!");
			}
			return;
		}

		if (!self.currentPlayerIsHuman()) {
			window.setTimeout(function() {
				makeComputerMove();	
			}, 1000);
		}
	};

	self.getBoardState = function() {
		return JSON.parse(JSON.stringify(currentBoard));
	};

};