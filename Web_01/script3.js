unique.counter = 0;

function unique() {
	return unique.counter++;
}

// we are going to consider an array property of factorial function
function factorial(n) {
	if(Number.isInteger(n) && n > 0) {
		// if n is not in the array, calculate it, otherwise return it.
		if(!(n in factorial)) {
			factorial[n] = n * factorial(n-1);
		}
		return factorial[n];
	} else {
		return NaN;
	}
}

function check() {
	factorial[1] = 1;
	factorial(6);
	console.log(factorial[5]);

	
}
