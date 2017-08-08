var handlebars = require('handlebars');
var $ = require('jquery');
let source = $('#etsy-item').html();
let template = handlebars.compile(source);
let items = [];
let url = "https://api.etsy.com/v2/listings/active.js?api_key=cdwxq4soa7q4zuavbtynj8wx&keywords=succulent&includes=Images,Shop"; 

// JSON fetch function
function fetchJSONP(url, callback) {
  var callbackName = 'jsonp_callback_' + Math.round(100000 * Math.random());
  var script = document.createElement('script');

  window[callbackName] = function(data) {
      delete window[callbackName];
      document.body.removeChild(script);
      callback(data);
  };

  script.src = url + (url.indexOf('?') >= 0 ? '&' : '?') + 'callback=' + callbackName;
  document.body.appendChild(script);
}

fetchJSONP(url, function(items) {
  items = items.results;
  console.log(items);

  items.forEach( function(item) {
    let renderedHtml = template(item);
    $('#etsy-items').append(template(item));
  });

});
