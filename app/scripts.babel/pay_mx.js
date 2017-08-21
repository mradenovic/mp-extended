var port = chrome.runtime.connect({name: 'payment'});

function updatePayment(payment) {
	var event = new Event('change');
	$('input#amount').val(payment.amount * 100)[0].dispatchEvent(event);
	$('input#customerName').val(payment.customerName)[0].dispatchEvent(event);
	$('textarea#customData').val(payment.date)[0].dispatchEvent(event);
	$('input#invoice').val(payment.quoteId)[0].dispatchEvent(event);
}


port.postMessage({paymentReady: true});
port.onMessage.addListener(function(msg) {
	console.log('onMessage: ', msg)
  if (msg.payment) {
    updatePayment(msg.payment);
  }
});

console.log('pay_mx.js loaded')
