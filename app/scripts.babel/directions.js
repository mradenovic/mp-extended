/* jshint latedef: nofunc*/
/* exported getCustomers */
/* globals $*/


function getStop(i) {
  var stop = '';
  if ($(`#stop${i}Address`).is(':visible')) {
    stop += $(`#stop${i}Address`).val() + ',';
    stop += $(`#stop${i}City`).val() + ',';
    stop += $(`#stop${i}State`).val() + ' ';
    stop += $(`#stop${i}Zip`).val() + '/';
  }
  console.log(stop);
  return stop;
}

function getDirectionsLink (options) {
  var mapsLink = 'https://google.com/maps/dir/';

  if (options.mpeParkingLotFirst && options.mpeParkingLotAddress !== '') {
    mapsLink += options.mpeParkingLotAddress + '/';
  }

  for (var i = 1; i < 5; i++) {
    mapsLink += getStop(i);
  }

  if (options.mpeParkingLotLast && options.mpeParkingLotAddress !== '') {
    mapsLink += options.mpeParkingLotAddress + '/';
  }

  console.log(mapsLink);

  return mapsLink;
}

function loadDirectionsButton(options) {
  // select last <tr> in DESTINATION action panel
  $('.singleBottom').last()
    // apend new <tr> at the bottom of the DESTINATION action panel
    .before($('<tr>')
      .addClass('dataA')
      // apend <td> and set css
      .append($('<td>')
        .css( 'padding-top', '5px' )
        .css( 'padding-bottom', '5px' )
        .css( 'background-color', 'LemonChiffon' )
        // apend <a> and set css
        .append($('<a>')
          .addClass('special')
          .text('Show Directions')
          .attr('target', '_mp-extended-directions')
          // dynamicaly set href attribute
          .click(function() {
            $(this).attr('href', getDirectionsLink(options));
          })
        )
      )
    )
}


function init() {
  chrome.storage.sync.get(null, function (options) {
    if (options.mpeDirections) {
      loadDirectionsButton(options);
    }
  });
}

init();
