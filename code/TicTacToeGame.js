var TicTacToeGame = function(gridWidth, gridHeight, updateCallback) {
	var self = this;

	var SYMBOLS = {
		X: "X",
		O: "O",
		Empty: ""
	};

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
	var grid = [];

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
				gridRow.push(SYMBOLS.Empty);
			}
			grid.push(gridRow);
		}
	};

	self.resetGame();

	self.getCurrentSymbol = function() {
		return players[currentPlayerIndex].symbol;
	};

	self.currentPlayerIsHuman = function() {
		return players[currentPlayerIndex].isHuman;
	};

	var makeComputerMove = function() {
		var validMoves = self.getValidMoves();
		if (validMoves.length == 0) {
			console.log("No valid moves left.");
			return;
		}
		var moveIdx = getRandomInt(0, validMoves.length);
		var move = validMoves[moveIdx];

		self.makeMove(move[0], move[1], /*isHuman:*/ false);
	};

	self.getValidMoves = function() {
		var validMoves = [];
		for (var rowIdx = 0; rowIdx < gridHeight; rowIdx++) {
			var row = grid[rowIdx];
			for (var colIdx = 0; colIdx < gridWidth; colIdx++) {
				if (self.moveIsValid(rowIdx, colIdx)) {
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

	self.moveIsValid = function(row, col) {
		if (row >= grid.length || row < 0) {
			return false;
		}

		if (col >= grid[0].length || col < 0) {
			return false;
		}

		if (grid[row][col] != SYMBOLS.Empty) {
			return false;
		}

		return true;
	};

	self.makeMove = function(row, col, isHuman) {
		if (!self.playerTypeIsValid(isHuman) && isHuman) {
			alert("It's the computer's turn right now.");
			return;
		}

		if (!self.moveIsValid(row, col)) {
			alert("Invalid move.");
			return;
		}

		grid[row][col] = self.getCurrentSymbol();

		incrementCurrentPlayer();

		updateCallback();
		console.log("now turn " + self.getCurrentSymbol());

		if (!self.currentPlayerIsHuman()) {
			window.setTimeout(function() {
				makeComputerMove();	
			}, 1000);
		}
	};

	self.getGridState = function() {
		return JSON.parse(JSON.stringify(grid));
	};

};