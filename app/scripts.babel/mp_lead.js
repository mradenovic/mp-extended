var port = chrome.runtime.connect({name: 'lead'});

var SIZE_MAP = {
	'Just a few items':	'Few Items Only',
	'Studio or Alcove Studio':	'Studio',
	'1 Bedroom - Small':	'1 Bedroom - Small',
	'1 Bedroom - Large':	'1 Bedroom - Large',
	'2 Bedrooms':	'2 Bedroom',
	'3+ Bedrooms':	'3 Bedroom +',
	'Commercial Space':	'Commercial'
}

function updateLead(lead) {
  var date = lead['Move Date:'].split('/');
  $('#emdm').val(date.shift());
  $('#emdd').val(date.shift());
  var name = lead['Name:'].split(' ');
  var fname = name.shift();
  var lname = name.length ? name.shift() : fname;
  $('#fname').val(fname);
  $('#lname').val(lname);
  var phone = lead['Phone:'].replace(/\D/g, '')
  $('#currentPhone, #purchaseOrder').val(phone);
  $('#primaryEmail').val(lead['Email:']);
  var size = SIZE_MAP[lead['Apt Size:']];
  $('[name=adSource]').val(size);
  $('#Zip, #stop1Zip, #stop4Zip').val('11106')
  $('#Zip, #stop1Zip, #stop4Zip').trigger('keyup');
  $('#stop1Stairs, #stop4Stairs').val(0);
}

function leads() {
	port.postMessage({leadReady: true});
	port.onMessage.addListener(function(msg) {
	  if (msg.lead) {
	    updateLead(msg.lead);
	  }
	});
}

console.log('mp_leads.js loaded')

function init() {
  chrome.storage.sync.get(null, function (options) {
    if (options.mpeLeads) {
      leads();
    }
  });
}

init();
