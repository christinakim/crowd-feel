$(document).ready(function() {
  // handle the form submit
  $("#searchText").on('keypress', function(e) {
    if (e.which == 13 || e.keyCode == 13) {
      if ($(this).val().trim().length > 0) {
        // initiate an AJAX call to send the data
        fireAJAX($(this).val().trim());
      }
    }
  });

  function fireAJAX(text) {
    $.ajax({
      type: "POST",
      url: "/search",
      data: {
        "search": text
      },
      beforeSend: function(xhr) {
        $('.tweets').html('');
        $('.results').show();
        enableState();
      },
      success: parseData,
      error: error
    });
  }

  function parseData(data) {
    disableState();
    var html = '';
    for (var i = 0; i < data.length; i++) {
      var s = data[i].sentiment,
        t = data[i].tweet;

      var result = {
        imgSrc: t.user.profile_image_url,
        tweetLink: 'http://twitter.com/' + t.user.screen_name + '/status/' + t.id_str,
        tweet: t.text,
        score: s.score ? s.score : '--',
        wordsMatched: s.words && s.words.length ? s.words : '--',
        positiveWords: s.positive && s.positive.length ? s.positive : '--',
        negativeWords: s.negative && s.negative.length ? s.negative : '--'
      };

      html += tmpl('tweet_template', result);
    };
    $('.tweets').html(html);
  }

  function error(data) {
    $('.error').show();
    disableState();
  }

  function disableState() {
    $('.loading').hide();
    $('#searchText').prop('disabled', false);
  }

  function enableState() {
    $('.loading').show();
    $('#searchText').prop('disabled', true);
  }

});


//JavaScript Micro-Templating design from John Resig - http://ejohn.org/blog/javascript-micro-templating/ - MIT Licensed
(function() {
  var cache = {};

  this.tmpl = function tmpl(str, data) {
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
      tmpl(document.getElementById(str).innerHTML) :

    // Generate a reusable function that will serve as a template
    // generator (and which will be cached).
    new Function("obj",
      "var p=[],print=function(){p.push.apply(p,arguments);};" +

      // Introduce the data as local variables using with(){}
      "with(obj){p.push('" +

      // Convert the template into pure JavaScript
      str
      .replace(/[\r\t\n]/g, " ")
      .split("{{").join("\t") // modified
      .replace(/((^|\}\})[^\t]*)'/g, "$1\r") // modified
      .replace(/\t=(.*?)}}/g, "',$1,'") // modified
      .split("\t").join("');") 
      .split("}}").join("p.push('") // modified
      .split("\r").join("\\'") + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn(data) : fn;
  };
})();
