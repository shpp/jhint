/*chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("Hello. This message was sent from scripts/inject.js");
		// ----------------------------------------------------------

	}
	}, 10);
});*/
document.addEventListener('mouseup',function(event)
{
    var sel = window.getSelection().toString();

    if(sel.length)
        chrome.extension.sendRequest({'message':'setText','data': sel},function(response){})
})