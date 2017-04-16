/* jshint camelcase: false */
/* exported initAutocomplete */
/* globals google*/

/**
 * A list of key value pairs.
 *
 * The key is id attribute of the address input field that needs autocomplete.
 * The value is id attribute of the zip input field that needs to be updated.
 * @type {Object}
 */
const formFields = {
  address1: 'Zip',
  stop1Address: 'stop1Zip',
  stop2Address: 'stop2Zip',
  stop3Address: 'stop3Zip',
  stop4Address: 'stop4Zip',
}

/**
 * [setAutocomplete description]
 * @param {string} address Address input field id attribute.
 * @param {string} zip     Zip input field id attribute.
 */
function setAutocomplete(address, zip) {
  var addressInput = document.getElementById(address);
  var autocomplete = new google.maps.places.Autocomplete(
    addressInput, {
      types: ['address']
    });
  autocomplete.addListener('place_changed', function () {
    var zipInput = document.getElementById(zip);
    var place = autocomplete.getPlace();
    for (var i = 0; i < place.address_components.length; i++) {
      var componentType = place.address_components[i].types[0];
      if (componentType == 'postal_code') {
        var val = place.address_components[i]['short_name'];
      }
    }
    zipInput.value = val;
    $(zipInput).trigger('keyup');
    addressInput.value = place.name;
  });
}


/**
 * Initializes autocomplete object
 */
function initAutocomplete() {
  for (var key in formFields) {
    var address = key;
    var zip = formFields[key];
    setAutocomplete(address, zip);
  }
}
