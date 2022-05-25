class Validator {
	static validate(sudoku) {
		const validator = new Validator
		return validator.validate(sudoku)
	}

	validate(sudoku) {
		const validResult = 'Sudoku is valid.';
		const invalidResult = 'Sudoku is invalid.';
		const incompleteResult = 'Sudoku is valid.'; 

		// build input that is easier to work with
		let sudokuString = '';
		for (let ch of sudoku) {
			if (/^\d+$/.test(ch)) {
				sudokuString += ch;
			}
		}




		// build rows
		let rowChunks = [];
		for (let i = 0; i < sudokuString.length; i += 9) {
			rowChunks.push(sudokuString.slice(i, i + 9));
		}

		// validate invalid_due_to_row_dupe
		if (rowChunks.some(this.stringHasCharDupes)) {
			console.log('invalid_due_to_row_dupe');
			return invalidResult;
		}




		// build columns
		let columnChunks = Array.from({ length: 9 });
		for (let rc of rowChunks) {
			for (let j = 0; j < 9; j++) {
				if (!columnChunks[j]) {
					columnChunks[j] = [];
				}
				columnChunks[j].push(rc[j]);
			}
		}

		// validate invalid_due_to_column_dupe
		if (columnChunks.some(this.stringHasCharDupes)) {
			console.log('invalid_due_to_column_dupe');
			return invalidResult;
        }





		// setup triplet chunks		
		let tripletChunks = [];
		for (let i = 0; i < sudokuString.length; i += 3) {
			tripletChunks.push(sudokuString.slice(i, i + 3));
		}

		// build subgroup chunks
		let subGroupChunks = [];
		for (let i = 0; i < 3; i++) {

			let firstSubGroupTripletIndex = i * 9;
			for (let j = 0; j < 3; j++) {

				let subGroupTripletIndex = firstSubGroupTripletIndex + j;
				let concatResult = [];
				for (let k = 0; k < 3; k++) {

					let tripletIndex = subGroupTripletIndex + (k * 3);
					concatResult = concatResult.concat(tripletChunks[tripletIndex]);
				}
				subGroupChunks.push(concatResult.join(''));
			}
		}

		// validate invalid_due_to_row_dupe
		if (subGroupChunks.some(this.stringHasCharDupes)) {
			console.log('invalid_due_to_subgroup_dupe');
			return invalidResult;
		}




		// validate incomplete
		if (sudokuString.indexOf('0') > -1) {
			console.log('valid_incomplete');  
			return incompleteResult;
		}		

		console.log('valid_complete');  
		return validResult;
	}

	stringHasCharDupes(valueString) {
		for (let i = 0; i < valueString.length; i++) {
			let char = valueString[i];
			if (char != '0' && valueString.lastIndexOf(char) !== i) {
				return true;
			}
		}

		return false;
	}
}

module.exports = Validator