function TicTacToeGame(gridWidth, gridHeight) {
	var self = this;

	var SYMBOLS = {
		X: "X",
		O: "O",
		None: "_"
	};

	var isPlayerXTurn = true;
	var grid = [];

	self.resetGame = function() {
		for (var i = 0; i < gridHeight; i++) {
			var gridRow = [];
			for (var i = 0; i < gridWidth; i++) {
				gridRow.push(SYMBOLS.Blank);
			}
			grid.push(gridRow);
		}
	};

	self.getCurrentSymbol = function() {
		return isPlayerXTurn ? SYMBOLS.X : SYMBOLS.O;
	};

	self.moveIsValid = function(symbol, col, row) {
		if (col >= grid.length || col < 0) {
			console.log("col out of bounds")
			return false;
		}

		if (row >= grid[0].length || row < 0) {
			console.log("row out of bounds")
			return false;
		}

		if (symbol != SYMBOLS.X && symbol != SYMBOLS.O)
	};

	self.makeMove = function(col, row) {
		if (!moveIsValid(self.getCurrentSymbol(), col, row) {
			alert("Invalid move.");
			return;
		}

		grid[row][col] = self.getCurrentSymbol();

		isPlayerXTurn = !isPlayerXTurn;
	};


};