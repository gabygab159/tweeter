/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

////// Prevents XSS

const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}



const data = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac",
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants",
    },
    created_at: 1461116232227,
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd",
    },
    content: {
      text: "Je pense , donc je suis",
    },
    created_at: 1461113959088,
  },
];

$(document).ready(() => {
  const renderTweets = (tweets) => {
    let tweetContainer = $("#tweets-container");

    tweets.forEach((tweet) => {
      let tweetElement = createTweetElement(tweet);
      tweetContainer.prepend(tweetElement);
    });
  };

  const createTweetElement = (tweetObj) => {
    const $tweet = $(`<article  class="tweetContainer">`).addClass("tweet");
    let html = `<header class="header2">
    <div class="topleft">
      <img class="smallAvatar" src=${tweetObj.user.avatars}> 
    </div>
    <div class="tweetName">${tweetObj.user.name}</div>
    <div class="handle">${tweetObj.user.handle}</div>
  </header>
  <br>  
  <div class='tweetContent'>${escape(tweetObj.content.text)}</div>
  <footer id="footer" class="footer">
    <div class="posted">${tweetObj.created_at}</div>
    <span class="icons">
      <i class="icon ion-md-share"></i>
      <i class="icon ion-md-flag"></i>
      <i class="icon ion-md-heart"></i>
    </span>           
  </footer>
</article>`;

    let tweetElement = $tweet.append(html);

    return tweetElement;
  };

  renderTweets(data);

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
    })
      .then((res) => renderTweets(res))
      .catch((err) => console.log(err));
  };

  loadTweets();

  const handleSubmit = (event) => {
    event.preventDefault();

    let textLength = $(event.target).serialize().length - 5;
    console.log(textLength);

    if (textLength > 140) {
      alert("Your tweet is too long");
      return;
    }

    if (textLength === 0) {
      alert("Please write something");
      return;
    }

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: $(event.target).serialize(),
    })
      .then((res) => loadTweets())
      .catch((err) => console.log(err));
  };

  $(".form").on("submit", handleSubmit);
});
