
    var trigger_key = 74; //ASCII key code for the letter 'J'
	var positionX = 0;
	var positionY = 0;
	 
	if (window == top) {
	    window.addEventListener('keyup', doKeyPress, false);
	    window.addEventListener('mouseup',createPopupWindow, false);
	}
	 
	function doKeyPress(e){
		if (e.keyCode == trigger_key){ 		
		 	var sel = window.getSelection().toString();
		 	if(sel.length) {
		 		alert("Contentscript send message background script: '" + sel  + "'");
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
			alert("Contentscript send get message from background script");
		 	var $newDiv = $('<div>');
		 	var $contentDiv = $('<div>');
		 	$contentDiv.attr("id", "contentDiv");
		 	$newDiv.attr("id", "newDiv");

		 	if(request.english_definitions != undefined) {
		 		var arr = request.english_definitions;		 		
				var str = "";
				for (var i = 0; i < arr.length; i++) {
					str = str + arr[i] + ", "
				};
				request.english_definitions = str;
			} else {
				request.english_definitions = "";
			}	
			if(request.reading == undefined) {
				request.reading = "";
			} else if (request.word == undefined) {
				request.word = "";
			} else if(request.part_of_speech == undefined) {
				request.part_of_speech = "noun";
			}
			$contentDiv.append($('<a>').addClass("boxclose").attr("id","boxclose"))
				  .append($('<p>').text(request.reading))	
				  .append($('<p>').text(request.word).addClass("word")) 
				  .append($('<p>').text(request.english_definitions))
		  		  .append($('<p>').text(request.part_of_speech))
		  		  .append($('<p>')
		  		  	.append($('<a>').attr("href","http://jisho.org/").text("jlpt n5")));	  		 
		  	$newDiv.append($contentDiv);	 
			var $body = $('body');				
			$body.append($newDiv);
			$boxclose = $("#boxclose"); 
			var width = $("#newDiv").innerWidth();  
			var height = $("#newDiv").innerHeight();  	
			var currentY = positionY + 25;
			var currentX = positionX - 25;
		  	$newDiv.css("top", currentY + "px");
		 	$newDiv.css("left", currentX + "px");

		 	$boxclose.click(function(event){
				$newDiv.remove();
			})

	});

