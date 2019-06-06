function Solver() {
	this.board = [];
	this.numberSolved=0;
	for (let row = 0; row < 9; row++) {
		let temp = [];
		for (let col = 0; col < 9; col++) {
			temp.push(new cell());
		}
		this.board.push(temp);
	}
	this.largeInput = function(array) {
		let count = 0;
		console.log(array.length);
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++, count++) {
				console.log(count);
				if (array[count] != 0) {
					this.setNumber(row, col, array[count] - 1,false);
				}

			}
		}
	}
	
	this.setNumber = function(row, col, number, booleanChange = true) {
		if(number <0 || number>8){
			console.log(number);
			throw "Number is not between 0 and 8"; 
		}
		console.log(`(${row},${col}) set to ${number}`);
		this.board[row][col].setNumber(number);
		if (booleanChange) {
			this.numberSolved++;
			for (let row = 0; row < 9; row++) {
				this.board[row][col].numBooleans[number] = false;
			}
			for (let col = 0; col < 9; col++) {
				this.board[row][col].numBooleans[number] = false;
			}
			row = Math.floor(row / 3) * 3 + 3;
			col = Math.floor(col / 3) * 3 + 3;
			//console.log(`(${row},${col})`)
			for (let y = row - 3; y < row; y++) {
				for (let x = col - 3; x < col; x++) {
					//console.log(`(${x},${y})`)
					this.board[y][x].numBooleans[number] = false;
				}
			}
		}
	}
	this.removeNumber = function(row, col) {
		console.log(`(${row},${col}) removed`);
		this.board[row][col].removeNumber();

	}
	this.checkColum = function(col) {
		for (let number = 0; number < 9; number++) {
			let occurence = 0;
			let usedRow = 0;
			for (let row = 0; row < 9; row++) {
				if (this.board[row][col].numBooleans[number]) {
					occurence++;
					usedRow = row;
					if (occurence != 1) {
						break;
					}
				}
			}
			if (occurence == 1) {
				this.setNumber(usedRow, col, number);
			}
		}
	}
	this.checksquare = function(row, col) {
		for (let number = 0; number < 9; number++) {
			let occurence = 0;
			let usedRow = 0;
			let usedCol = 0;
			for (let col2 = col; col2 < col + 3; col2++) {
				for (let row2 = row; row2 < row + 3; row2++) {
					//console.log(`(${row2},${col2})`)
					if (this.board[row2][col2].numBooleans[number]) {
						occurence++;
						usedCol = col2;
						usedRow = row2;
						if (occurence != 1) {
							break;
						}
					}
				}
			}
			if (occurence == 1) {
				this.setNumber(usedRow, usedCol, number);
			}
		}
	}
	
	this.checkRow = function(row) {
		for (let number = 0; number < 9; number++) {
			let occurence = 0;
			let usedRow = 0;
			for (let col = 0; col < 9; col++) {
				if (this.board[row][col].numBooleans[number]) {
					occurence++;
					usedCol = col;
					if (occurence != 1) {
						break;
					}
				}
			}
			if (occurence == 1) {
				this.setNumber(row, usedCol, number);
			}

		}
	}
	this.solve = function() {
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (this.board[row][col].solvedNumber != undefined) {
					let number = this.board[row][col].solvedNumber;
					this.setNumber(row, col, number)
				}
			}
		}
		/*
		for (let number = 0; number < 9; number++) {
			let occurence = 0;
			for (let col = 0; col < 9; col++) {
				for (let row = 0; row < 9; row++) {
					if(this.board[row][col].solvedNumber == number){
						occurence++;
						if(occurence>1){
							alert("Impossible board");
							return;
						}
					}
				}

			}
			occurence=0;
			

			for (let col = 0; col < 9; col++) {
				if(this.board[row][col].solvedNumber == number){
					occurence++;
				}
			}
			if(occurence>1){
				alert("Impossible board");
				return;
			}
			occurence=0;
			row = Math.floor(row / 3) * 3 + 3;
			col = Math.floor(col / 3) * 3 + 3;
			//console.log(`(${row},${col})`)
			for (let y = row - 3; y < row; y++) {
				for (let x = col - 3; x < col; x++) {
					//console.log(`(${x},${y})`)
				if(this.board[row][col].solvedNumber == number){
					occurence++;
				}
				}
			}
			if(occurence>1){
				alert("Impossible board");
				return;
			}
		}
		*/
		this.basicSolve();
		this.backTrack(0,-1);
		outPut();
	}
	this.backTrack = function(row, col) {
		do{
			col++;
			console.log("flag 1");
			if(col>8){
				console.log("flag 3");
				col=0;
				row++;
				if(row>8){
					solver=this;
					return true;
				}
			}
		}
		while(this.board[row][col].solvedNumber != undefined);
		
		let newSolver = copy(this);

		//let newSolver =  new Solver();
		//newSolver.board = this.board.slice(0);
		//let newSolver = Object.assign({}, this);

		//let newSolver = $.extend(true, [], this);;
		/*
		console.log("Test");
		this.log();
		console.log("");
		newSolver.log();
		console.log("REsult");
		newSolver.setNumber(0,0,5);
		this.log();
		console.log("");
		newSolver.log();
		*/
		
		for(let number=0;number<9;number++){
			if(newSolver.board[row][col].numBooleans[number]){
				console.log("flag 2");
				newSolver.setNumber(row,col,number);
				newSolver.basicSolve();
				if(newSolver.validate()){
					if(newSolver.backTrack(row,col)){
						return true;
					}
					else{
						newSolver = copy(this);
					}
				}
				else{
					newSolver = copy(this);
				}
			}
		}
		newSolver.log();
		console.log("flag 4");
		return false;
	}
	this.validate = function(){
		for(let row=0;row<9;row+=3){
			for (let col = 0; col < 9; col+=3) {
				if(!this.board[row][col].validate()){
					return false;
				}
			}
		}
		return true;
	}
	this.basicSolve = function() {
		let lastSolved=0;
		while(lastSolved!=this.numberSolved){
			lastSolved=this.numberSolved;
			for (let row = 0; row < 9; row++){
				this.checkRow(row);
			}
		
			for (let col = 0; col < 9; col++) {
				this.checkColum(col);
			}
			for (let row = 0; row < 9; row += 3) {
				for (let col = 0; col < 9; col += 3) {
					this.checksquare(row, col);
				}
			}
			for (let row = 0; row < 9; row++) {
				for (let col = 0; col < 9; col++) {
					let number = this.board[row][col].check();
					if (number != -1) {
						this.setNumber(row, col, number);
					}
				}
		
			}
		}
	}

	this.log = function() {
		for (let row = 0; row < 9; row++) {
			let rowString = "[";
			for (let col = 0; col < 9; col++) {
				rowString += " ";
				if (this.board[row][col].solvedNumber != undefined) {
					rowString += (this.board[row][col].solvedNumber + 1).toString();
				} else {
					rowString += " ";
				}
				rowString += " ";

			}
			rowString += "]";
			console.log(rowString);
		}
	}
	console.log("ran");
	console.log(this.board);
}
function point(x,y){
	this.Row4 = y;
	this.Col4= x;

}
function copy(o) {
   var output, v, key;
   output = Array.isArray(o) ? [] : {};
   for (key in o) {
       v = o[key];
       output[key] = (typeof v === "object") ? copy(v) : v;
   }
   return output;
}

function cell() {
	this.numBooleans = [true, true, true, true, true, true, true, true, true];
	this.solvedNumber = undefined;
	this.removeNumber = function() {
		this.solvedNumber = undefined;
		for (let i = 0; i < this.numBooleans.length; i++) {
			this.numBooleans[i] = true;
		}

	}
	this.setNumber = function(number) {
		if (typeof number != "number") {
			throw "Parameter is not a number!";
		}
		this.solvedNumber = number;
		for (let i = 0; i < this.numBooleans.length; i++) {
			this.numBooleans[i] = false;
		}
	}
	this.validate = function(){
		if(this.solvedNumber != undefined){
			return true;
		}
		return this.numBooleans.includes(true);
	}
	this.check = function() {
		if (this.solvedNumber != undefined) {
			return -1;
		}
		let output = -1;
		for (let i = 0; i < this.numBooleans.length; i++) {
			if (this.numBooleans[i]) {
				if (output == -1) {
					output = i;
				} else {
					return -1;
				}
			}
		}
		return output;
	}
}

var solver = new Solver();
solver.log();

solver.log();

/*
solver.largeInput([0,2,0,4,5,6,7,8,9,
				   4,5,7,0,8,0,2,3,6,
				   6,8,9,2,3,7,0,4,0,
				   
				   0,0,5,3,6,2,9,7,4,
				   2,7,4,0,9,0,6,5,3,
				   3,9,6,5,7,4,8,0,0,
				   
				   0,4,0,6,1,8,3,9,7,
				   7,6,1,0,4,0,5,2,8,
				   9,3,8,7,2,5,0,6,0]);
				   outPut();

*/


console.log("solver Loaded");