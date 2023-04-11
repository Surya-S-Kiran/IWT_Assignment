
function check() {
	let o = Object.create({x:1});
	o.y = 2;
	o.z = 3;
	o.test = function() {return o.toObject();}
	o.valueOf = function() {return o.x+o.y+o.z;};
//	o.toString = function () {return `(${this.x}, ${this.y})`};

	console.log(o.hasOwnProperty("x"));
	console.log(o.hasOwnProperty("y"));

/*	for(let k of Object.getOwnPropertyNames(o)) {
		console.log(k);
	}
*/
	let a = new Array(10);
	a[0] = 5;

	console.log(Number(o));
}
