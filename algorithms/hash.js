function hash(input, salt)
{
	salt   = parseInt(salt);
	let array  = String(input).split('');
	let output = [];
	let value  = 0;
									
	array.forEach(entry =>{
		output.push(parseInt(entry.charCodeAt().toString(16) + salt));
	});
											
	output.forEach(entry=>{
		value += entry;
	});
											
	return value.toString(16);
}

module.exports = hash;