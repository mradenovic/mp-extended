var port = chrome.runtime.connect({name: 'lead'});


function updateLead(lead) {
  var date = lead['Move Date:'].split('/');
  $('#emdm').val(date.shift());
  $('#emdd').val(date.shift());
  var name = lead['Name:'].split(' ');
  var fname = name.shift();
  var lname = name.length ? name.shift() : fname;
  $('#fname').val(fname);
  $('#lname').val(lname);
  $('#currentPhone, #purchaseOrder').val(lead['Phone:']);
  $('#primaryEmail').val(lead['Email:']);
  var apt = lead['Apt Size:'];
  // TODO map apt size values
  $('[name=adSource]').val(lead['Apt Size:']);
  $('[name$=Zip]').val('11106')
  $('[name$=Zip]').trigger('keyup');
  $('[name$=Stairs]').val(0);
}


port.postMessage({leadReady: true});
port.onMessage.addListener(function(msg) {
  console.log('lead recived', msg.lead)
  if (msg.lead) {
    updateLead(msg.lead);
  }
});

console.log('mp_leads.js loaded')
