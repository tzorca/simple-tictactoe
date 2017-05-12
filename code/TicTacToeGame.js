var TicTacToeGame = function(gridWidth, gridHeight) {
	var self = this;

	var SYMBOLS = {
		X: "X",
		O: "O",
		Empty: ""
	};

	var isPlayerXTurn = true;
	var grid = [];

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
		return isPlayerXTurn ? SYMBOLS.X : SYMBOLS.O;
	};

	self.moveIsValid = function(symbol, row, col) {
		console.log(col);
		console.log(grid);

		if (row >= grid.length || row < 0) {
			console.log("row out of bounds")
			return false;
		}

		if (col >= grid[0].length || col < 0) {
			console.log("col out of bounds")
			return false;
		}

		if (symbol != SYMBOLS.X && symbol != SYMBOLS.O) {
			console.log("invalid symbol")
			return false;
		}

		if (grid[row][col] != SYMBOLS.Empty) {
			console.log("cell already occupied")
			return false;
		}

		return true;
	};

	self.makeMove = function(row, col) {
		if (!self.moveIsValid(self.getCurrentSymbol(), row, col)) {
			alert("Invalid move.");
			return;
		}

		grid[row][col] = self.getCurrentSymbol();

		isPlayerXTurn = !isPlayerXTurn;
		console.log("now turn " + self.getCurrentSymbol());
	};

	self.getGridState = function() {
		return JSON.parse(JSON.stringify(grid));
	};

};