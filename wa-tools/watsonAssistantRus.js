function handler(event) {
	var myData = event.data.input['text'];
	if (myData!="") {
		var answer = loadJSONSync("https://covidspellcheck152.ibm-platform.club/spell_text",myData);
		if (answer!=null ) {
			event.data.input.text=answer.spelling_text;
			console.log("answer.text = " + answer.text);
			console.log("answer.spelling_text = " + answer.spelling_text);
		}
	}
}

function loadJSONSync(url, data) {
	var xmlhttp=new XMLHttpRequest();
	xmlhttp.open("POST",url,false);
	xmlhttp.setRequestHeader("Content-Type", "application/json");
	try {
		xmlhttp.send('{ "text":"'+data+'"}');
	} catch(exception) {
		if(exception.name == 'NetworkError') {
			console.log('There was a network error!');
		}
	}
	if (xmlhttp.status==200) {
		return JSON.parse(xmlhttp.responseText);
	} else {
		return null;
	}
}
