var trigger_key = 74; //ASCII key code for the letter 'J'
var positionX = 0;
var positionY = 0;

if (window == top) {
    window.addEventListener('keyup', doKeyPress, false);
    window.addEventListener('mouseup',createPopupWindow, false);
}

function doKeyPress(e) {
	if (e.keyCode == trigger_key) {
	 	var sel = window.getSelection().toString();
	 	var message = encodeURI(sel);
	 	if (sel.length) {
	 		chrome.extension.sendRequest({message: message});
	 	}

	}
}

function createPopupWindow(event) {
	positionX = event.pageX;
	positionY = event.pageY;
}

chrome.runtime.onMessage.addListener(function(request, sender) {
 	var $newDiv = $('<div>');
 	var $contentDiv = $('<div>');

 	$contentDiv.attr("id", "jhint_contentDiv");
 	$newDiv.attr("id", "jhint_newDiv");

  request.english_definitions = request.english_definitions ? request.english_definitions.join(', ') : '';
  request.reading = request.reading || '';
  request.word = request.word || '';
  request.parts_of_speech = request.parts_of_speech || 'noun';

  var $character = $('<ruby>').text(request.word).append($('<rt>').text(request.reading));

	$contentDiv
    .append($('<a>').addClass("jhint_boxclose").attr("id", "jhint_boxclose"))
    .append($('<p>').append($character))
	  .append($('<p>').text(request.english_definitions))
  	.append($('<p>').append($('<span class="jhint_partOfSpeech">').text(request.parts_of_speech)))
  	.append($('<p>').append($('<a>').attr("href","http://jisho.org/").text('jisho.org')));

  $newDiv.append($contentDiv);

	$('body').append($newDiv);

	$boxclose = $("#jhint_boxclose");

	var width = $("#jhint_newDiv").innerWidth();
	var height = $("#jhint_newDiv").innerHeight();
	var currentY = positionY + 25;
	var currentX = positionX - 25;

	$newDiv.css("top", currentY + "px");
 	$newDiv.css("left", currentX + "px");

 	$boxclose.click(function(event) {
		$newDiv.remove();
	});
});
