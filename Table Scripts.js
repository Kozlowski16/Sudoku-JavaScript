function isNumberKey(evt) {
	var charCode = (evt.which) ? evt.which : event.keyCode;
	if (charCode > 31 && (charCode < 49 || charCode > 57))
		return false;
	return true;
}

    function onTextFieldChanged(evt){
		console.log(typeof evt);
        var caller = evt.target || evt.srcElement;
        if (caller.value.length == 1){
			console.log("##########");
			console.log(typeof caller.value);
        	console.log(caller.value);
			solver.setNumber(caller.id.charAt(0),caller.id.charAt(2),caller.value-1,false);
            caller.style.backgroundColor = '#67B598';
        }else{
			solver.removeNumber(caller.id.charAt(0),caller.id.charAt(2));
            caller.style.backgroundColor = 'transparent';
        }
		console.log("ran");
    }
function no() {
	console.log("");
	return false;
}

let mainTable = document.getElementById('t')

console.log("hello");
for (let row = 0; row < 3; row++) {
	let tableRow = document.createElement("tr");
	tableRow.id = `r${row}`;
	
	for (let col = 0; col < 3; col++) {
		let tableCol = document.createElement("td");
		let subGrid = document.createElement("table");
		subGrid.id= "subGrid";
		for (let subRow = 0; subRow < 3; subRow++) {
			
			let subGridRow = document.createElement("tr");
			
			for (let subCol = 0; subCol < 3; subCol++){
				let subGridCol = document.createElement("td");
				let input = document.createElement("input");
				input.id =  (row*3+subRow).toString() + " " + (col*3+subCol).toString();
				input.addEventListener("change", function(event){
					onTextFieldChanged(event);
				});
				
				input.onkeypress = function(evt) {
        let charCode = (evt.which) ? evt.which : event.keyCode;
        if (charCode > 31 && (charCode < 49 || charCode > 57))
            return false;
        return true;
				};
				input.maxLength = "1"
				//input.addEventListener('input', function() {
					//gotoNode(input.value);
				//});
				subGridCol.appendChild(input);
				subGridRow.appendChild(subGridCol);
			}
			
			subGrid.appendChild(subGridRow);
			
		}
		
		tableCol.appendChild(subGrid);
		tableRow.appendChild(tableCol);
		
	}
	
	mainTable.appendChild(tableRow);
}
function outPut(){
	solver.log();
	let count=0;
	for(let row = 0; row<9;row++){
		
			for(let col=0;col<9;col++,count++){

				//console.log(`(${Math.floor(row/3)*3+Math.floor(col/3)},${(row%3)*3+col%3})`)
				if((col+1)%3==0){
					console.log(" ");
				}
				if(solver.board[Math.floor(row/3)*3+Math.floor(col/3)][(row%3)*3+col%3].solvedNumber!= undefined){
					cells[count].value = solver.board[Math.floor(row/3)*3+Math.floor(col/3)][(row%3)*3+col%3].solvedNumber+1;
				}

			}
	}
}
function clearBoard(){
	for(let i=0;i<cells.length;i++){
		cells[i].value = "";
		cells[i].style.backgroundColor = 'transparent';
	}
	console.log("ASDKJH");
	solver =  new Solver();
		console.log("ASDKJH");
}
var cells = document.getElementsByTagName("input");
console.log(cells.length);
for(let i=0;i<cells.length;i++){
	//console.log(cells[i].id);
	if((i+1)%3==0){
		//console.log("");
	}
}
