// if you checked "fancy-settings" in extensionizr.com, uncomment this lines

// var settings = new Store("settings", {
//     "sample_setting": "This is how you use Store.js to remember values"
// });


//example of using a message handler from the inject scripts
/*chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });*/
var seltext = null;

chrome.extension.onRequest.addListener(function(request, sender, sendResponse)
{
    switch(request.message)
    {
        case 'setText':
            window.seltext = request.data
        break;

        default:
            sendResponse({data: 'Invalid arguments'});
        break;
    }
});


function savetext(info,tab)
{
    var jax = new XMLHttpRequest();
    jax.open("GET","http://beta.jisho.org/api/v1/search/words?keyword=" + seltext, true);
    /*jax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");*/
    jax.send();
    jax.onreadystatechange = function() { if(jax.readyState==4) { alert(jax.responseText);  }}
}

var contexts = ["selection"];
for (var i = 0; i < contexts.length; i++)
{
    var context = contexts[i];
    chrome.contextMenus.create({"title": "Send to Server", "contexts":[context], "onclick": savetext});  
}