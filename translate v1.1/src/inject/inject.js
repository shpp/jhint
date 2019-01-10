var trigger_key = 74; //ASCII key code for the letter 'J'
var positionX = 0;
var positionY = 0;

const cardId = "jhint_newDiv";
var close_on_clicking_outside = false;

if (window == top) {
    window.addEventListener('keyup', doKeyPress, false);
    window.addEventListener('mouseup', createPopupWindow, false);
    // Close card on all clicks (except prevented when click lands within card
    // itself).
    if (close_on_clicking_outside) {
        window.addEventListener('click', removeCard, false);
    }
}

function removeCard(event) {
    const card = $('#' + cardId);
    if (event) {
        if (!$(event.target).closest('#' + cardId).length) {
            if (card.length > 0) {
                card.remove();
            }
        }
    } else {
        card.remove();
    }
}

function doKeyPress(e) {
    if (e.keyCode == trigger_key) {
        var sel = window.getSelection().toString();
        var message = encodeURI(sel);
        if (sel.length) {
            chrome.extension.sendRequest({
                message: message
            });
        }
    }
}

function createPopupWindow(event) {
    positionX = event.pageX;
    positionY = event.pageY;
}

chrome.runtime.onMessage.addListener(function(request, sender) {
    removeCard();

    var $newDiv = $('<div>');
    var $contentDiv = $('<div>');

    $contentDiv.attr("id", "jhint_contentDiv");
    $newDiv.attr("id", cardId);

    // Prevent closing of card due to clicking on the card itself.
    $newDiv.click(function(event) {
        if (event) {
            event.stopPropagation();
        }
    });


    var english_definitions = request.english_definitions ? request.english_definitions.join(', ') : '';
    var reading = request.reading || '';
    var word = request.word || '';
    var parts_of_speech = request.parts_of_speech || [];

    var $character = $('<ruby>').text(word).append($('<rt>').text(reading));
    var $parts_of_speech = parts_of_speech.length && $('<p>');

    parts_of_speech.map(function(item) {
        $parts_of_speech.append($('<span class="jhint_partOfSpeech">').text(item));
    });

    $contentDiv
        .append($('<a>').addClass("jhint_boxclose").attr("id", "jhint_boxclose"))
        .append($('<p>').append($character))
        .append($('<p>').text(english_definitions))
        .append($parts_of_speech)
        .append($('<p>')
            .append($('<a>')
                .attr("target", "_blank")
                .attr("href", "http://jisho.org/search/" + word)
                .text('jisho.org')
            )
        );

    $newDiv.append($contentDiv);

    $('body').append($newDiv);

    $boxclose = $("#jhint_boxclose");

    var width = $('#' + cardId).innerWidth();
    var height = $('#' + cardId).innerHeight();
    var currentY = positionY + 25;
    var currentX = positionX - 25;

    $newDiv.css("top", currentY + "px");
    $newDiv.css("left", currentX + "px");

    $boxclose.click(function(event) {
        $newDiv.remove();
    });

    console.log('Added new card!');
});