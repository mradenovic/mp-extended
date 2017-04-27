function createLeadRequest(lead) {
  let message = {
    action: 'Create Lead',
    lead: lead
  }
  console.log('createLeadRequest(): ', message);
  chrome.runtime.sendMessage(message);
}


function getLeadObject($lead) {
  var lead = {};
  $($lead).find('b').each(function(index) {
    var aContent = $(this).next('a').text();
    var content = aContent ? aContent : this.nextSibling.nodeValue.trim();
    lead[this.innerText] = content;
  });

  return lead;
}


function leadReady(element) {
  var $lead = $(element);
  var lead = getLeadObject($lead);

  // append  Create Lead button
  $($lead)
    .addClass('mpe-lead')
    .append($('<div>')
      .append($('<button>')
        .text('Create Lead')
        .click(function() {
          createLeadRequest(lead);
        })
      )
    );
}

function leads() {
  ready('td span+p', leadReady);
  ready('td br+p', leadReady);
}

function init() {
  chrome.storage.sync.get(null, function (options) {
    if (options.mpeLeads) {
      leads();
    }
  });
}

init();
