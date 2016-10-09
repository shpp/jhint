chrome.extension.onRequest.addListener(function(request, sender)
{
    alert("Background got message from contentscript:'" + request.message + "'");

    var words = request.message;
    var jax = new XMLHttpRequest();
    jax.open("GET","http://jisho.org/api/v1/search/words?keyword=" + words);   
    jax.send();
    jax.onreadystatechange = function() { 
        if(jax.readyState==4) {
          var responseText = jax.responseText; 
          console.log("result" + responseText); 
          var responseObject = JSON.parse(responseText);
          var data = responseObject.data;
          console.log(data);
          var current = data[0];
          returnMessage(current);
        }
    }

 
});
 
function returnMessage(current)
{
    var japanese = current.japanese[0];
    var tags = current.tags[0];
    var senses = current.senses[0];
    var english_definitions = senses.english_definitions;
    var part_of_speech = senses.part_of_speech;
    chrome.tabs.getSelected(null, function(tab) {      
        alert("Background script send message to contentscript:'");
        chrome.tabs.sendMessage(tab.id, {word: japanese.word,
                                         reading: japanese.reading,
                                         tags: tags,
                                         english_definitions: english_definitions, 
                                         part_of_speech: part_of_speech});
    });
}