function area(height, width = height) {
	return height*width;
}

function getMax(first, ...rest) {
	let maxVal = first;
	for(let v of rest) {
		if(v > maxVal)
			maxVal = v;
	}
	console.log(rest.length);
	return maxVal;
}

function getMin(v1, v2, v3) {
	console.log(v1 + " " + v2 + " " + v3);
}

function check() {
	let min = getMin;
	let arr = [23, 12, 89];
	min(23, 12, 89); 
}

