var trigger_key = 74; //ASCII key code for the letter 'J'
var positionX = 0;
var positionY = 0;
 
if (window == top) {
 window.addEventListener('keyup', doKeyPress, false);
 window.addEventListener('mouseup',createPopupWindow, false);
}
 
function doKeyPress(e){
 if (e.keyCode == trigger_key){
 	//var selObj = window.getSelection(); 	
 	var sel = window.getSelection().toString();
 	if(sel.length) {
 		//alert("Contentscript отправил сообщение background script: '" + sel  + "'");
 		chrome.extension.sendRequest({message: sel});
 	}  
  
 }
}

function createPopupWindow(event) {
	positionX = event.pageX;
	positionY = event.pageY;
}
 
chrome.runtime.onMessage.addListener(
 function(request, sender) {
 	var newDiv = document.createElement('div')
 	newDiv.id = "newDiv";
	newDiv.style.cssText = 'position:absolute;padding: 1rem;border-radius:20px;border:1px solid #ddd;box-shadow: 0px 0px 8px  #fff;display: block;background-color: white;'; 	

	newDiv.innerHTML = "<p>транскрипция -- " + request.word + "</p>" + 
  		"<p>слово -- " + request.reading + "</p>" + 
  		"<p>перевод -- " + request.english_definitions + "</p>" + 
  		"<p>часть речи -- " + request.part_of_speech + "</p>";  
	var body = document.querySelector("body");
	body.style.position = "relative";
	body.appendChild(newDiv);
	var width = document.getElementById("newDiv").offsetWidth;  
	var height = document.getElementById("newDiv").offsetHeight;  	
	var currentY = positionY - (height + 100);
  	newDiv.style.top = currentY + "px";
 	newDiv.style.left = positionX + "px";

	

});