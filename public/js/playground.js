var endpointCount = 77;
// var endpointCount = 1;
var collection = [];

for (var i = 0; i < endpointCount; i++) {
	// Make a call to our server, requesting a set of data.
	// The data we get back is a chunk of strings that form
	// a larger message.
	(function(i){
		$.ajax({
			type: 'GET',
			url: '/' + i,
			dataType: 'json',
			accepts: { json: 'text/json' },
			success: function(data) {
				console.log(data);
				var chunk = parseData(data);
				collection[i] = chunk;
				isDone(collection);
			}
		});
	})(i);
}

function isDone(collection) {
	if (collection.length == endpointCount) {
		console.log(collection);
		var text = buildText(collection);
		displayText(text);
	}
}

function parseData(data) {
	var pieceOne = data["0"];
	var pieceTwo = data["1"];
	var pieceThree = data["2"];
	var chunk = '';
	if (pieceOne) { chunk += pieceOne; }
	if (pieceTwo) { chunk += pieceTwo; }
	if (pieceThree) { chunk += pieceThree; }
	return chunk;
}

function buildText(collection) {
	var text = '';
	for (var i = 0; i < collection.length; i++) {
		var chunk = collection[i];
		chunk = chunk.replace(/(\r\n|\n|\r)/gm,"<br>");
		text += chunk;
	}
	return text;
}

function displayText(text) {
	$('#container').append(text);
}
