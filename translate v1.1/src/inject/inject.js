var trigger_key = 74; //ASCII key code for the letter 'J'
var positionX = 0;
var positionY = 0;
 
if (window == top) {
 window.addEventListener('keyup', doKeyPress, false);
 window.addEventListener('mouseup',createPopupWindow, false);
}
 
function doKeyPress(e){
 if (e.keyCode == trigger_key){
 	var selObj = window.getSelection();
 	console.log(selObj);
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
	newDiv.style.cssText = 'position:absolute;width:200px;height:200px;-moz-border-radius:100px;border:1px  solid #ddd;-moz-box-shadow: 0px 0px 8px  #fff;display: block;background-color: white;';
 	newDiv.style.top = positionY + "px";
 	newDiv.style.left = positionX + "px";

	newDiv.innerHTML = "<p>транскрипция -- " + request.word + "</br>" + 
  		"слово -- " + request.reading + "</br>" + 
  		"перевод -- " + request.english_definitions + "</br>" + 
  		"часть речи -- " + request.part_of_speech + "</p>";

	var body = document.querySelector("body");
	body.style.position = "relative";	
	console.log(body);

	body.appendChild(newDiv);

  /*alert("транскрипция -- " + request.word + "\n\r" + 
  		"слово -- " + request.reading + "\n\r" + 
  		"перевод -- " + request.english_definitions + "\n\r" + 
  		"часть речи -- " + request.part_of_speech );  
  }*/

);