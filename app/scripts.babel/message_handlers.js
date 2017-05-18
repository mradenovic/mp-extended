var leadPort;
var paymentPort;

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
  switch (message.action) {
    case 'Create Lead':
      console.log('Lead creation...', message.lead);
      if (leadPort) {
        leadPort.postMessage(message);
      }
      break;
      case 'Post Payment':
        console.log('Post Payment...', message.payment);
        if (paymentPort) {
          paymentPort.postMessage(message);
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

  if (port.name == 'payment') {
    paymentPort = port;
    port.onMessage.addListener(paymentOnMessage);
  }
});

function leadOnMessage(msg) {
  console.log(msg);
  leadPort.postMessage({
    text: 'Hello lead'
  });
}

function paymentOnMessage(msg) {
  console.log(msg);
  paymentPort.postMessage({
    text: 'Hello payment'
  });
}
