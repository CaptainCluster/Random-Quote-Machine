/**
 * Fetching the data from the site
 * @returns The quotes (list)
 */
async function getQuotes() {
  const url = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
  const res = await fetch(url)
  const data =  await res.json();
  
  return data.quotes
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
 * 
 * @param {array} quotes 
 */
function getQuote(quotes) {
  let selectedQuote = getRandomQuote(quotes);

  //Setting up tweet-button
  const tweetButton = document.getElementById("tweet-quote");
  const url = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + selectedQuote.quote + '" ' + selectedQuote.author)
  tweetButton.setAttribute("href", url);

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
  const newQuoteButton = document.getElementById("new-quote");
  newQuoteButton.addEventListener("click", () => {
    getQuote(quotes);
  });

  const quotes = await getQuotes(); //Async fetch for the quotes
  getQuote(quotes)
}

if (document.readyState !== "loading") {
  main();
} else {
  document.addEventListener("DOMContentLoaded", () => {
    main();
  });
}

