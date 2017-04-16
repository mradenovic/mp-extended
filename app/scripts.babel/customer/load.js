/* jshint latedef: nofunc*/
/* exported getCustomers */
/* globals $*/

/**
 * Loads customer content script
 *
 */
function loadCustomerScript() {

  // Suppress submit on enter
  $('form#quote').on('keyup keypress', function (e) {
    var code = e.keyCode || e.which;
    if (code === 13) {
      e.preventDefault();
      return false;
    }
  });

  // Load customer.js into script tag
  $('head')
    .append($('<script>')
      .load(chrome.extension.getURL('scripts/customer/customer.js'), initMapsAPI())
    );
}

/**
 * Initializes Google Maps API
 *
 */
function initMapsAPI() {
  // append Google Maps API script tag
  $('head')
    .append($('<script>')
      .attr('type', 'text/javascript')
      .attr('src', 'https://maps.googleapis.com/maps/api/js?libraries=places&callback=initAutocomplete&key=AIzaSyDA0RPbFYPVn97BRhwioW32Kdi-YqlJYbU')
    );
}

function init() {
  chrome.storage.sync.get(null, function (options) {
    if (options.mpeMapsAutocomplete) {
      loadCustomerScript();
    }
  });
}

init();
