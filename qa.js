function change(person){
	var image = document.getElementById(person);
	if (image.src.includes("adult")) {
		image.src="images/qa/" +person+ "child.jpg"
	}
	else{
	image.src = "images/qa/adults/" + person + ".jpg";
	}
}
