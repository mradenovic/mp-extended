var leadPort;
var hangoutsPort;

function leads() {
  chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    switch (message.action) {
      case 'Create Lead':
        console.log('Lead creation...', message.lead);
        if (leadPort) {
          leadPort.postMessage(message);
        }
        break;
      default:
        console.log('Message: ', message);
    }
    sendResponse({});
  });


  chrome.runtime.onConnect.addListener(function(port) {
    if (port.name == 'lead') {
      leadPort = port;
      port.onMessage.addListener(leadOnMessage);
    }
  });

}


function leadOnMessage(msg) {
  console.log(msg);
  leadPort.postMessage({
    text: 'Hello lead'
  });
}

function init() {
  chrome.storage.sync.get(null, function (options) {
    if (options.mpeLeads) {
      leads();
    }
  });
}

init();
