//---------------------------------------------------------------//
// Made by CaptainCluster                                        //
//                                                               //
// The jQuery script for the project.                            //
//                                                               //
// Ideas utilized from the example project of FreeCodeCamp,      //
// and some relevant code taken.                                 //
//                                                               //
// https://random-quote-machine.freecodecamp.rocks/              //
//---------------------------------------------------------------//


/**
 * Fetching the data from the site
 * @returns The quotes (json)
 */
function getQuotes() {
  return $.ajax({
    dataType: "json",
    url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
  });
}

/**
 * Uses Math.random to select a random quote
 * @param {array} quotes 
 * @returns Quote tuple from the array
 */
function getRandomQuote(quotes) {
  return quotes[
    Math.floor(Math.random() * quotes.length)
  ];
}

/**
 * Setting up the quote
 * @param {array} quotes 
 */
function setUpQuote(quotes) {
  let selectedQuote = getRandomQuote(quotes);
  const url = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + selectedQuote.quote + '" ' + selectedQuote.author)

  //Setting up tweet-button
  $("#tweet-quote").attr("href", url);
  //Using JQuery for the dynamic effects, and to assign the quote and the author
  //to the #text and #author elements.
  $("#well").animate({ opacity: 0 }, 500, function() { 
    $(this).animate({opacity: 1}, 500);
  });

  $('#text').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#text').text(selectedQuote.quote);
  });

  $('#author').animate({ opacity: 0 }, 500, function () {
    $(this).animate({ opacity: 1 }, 500);
    $('#author').text(selectedQuote.author);
  });

}

async function main(){
  $("#new-quote").on("click", function(){
    setUpQuote(quotes.quotes);
  });

  const quotes = await getQuotes(); //Async fetch for the quotes
  setUpQuote(quotes.quotes)
}

$(document).ready(function(){
  main();
});