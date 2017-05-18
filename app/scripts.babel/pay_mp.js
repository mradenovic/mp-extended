function getCustomerName() {
  var name = $('.customer').text();
  name = name.replace(/\u00a0.*/g, '');
  name = name.replace(/\s/g, '');
  name = name.split(',');
  name = name[1] + ' ' + name[0];
  return name;
}

function logPayment(payment) {
  var date = new Date().toLocaleDateString();
  var logMsg = `\n${date} ${payment.type} charged $${payment.amount} ${payment.quoteId}`;
  var $internalNotes = $('#internalnotes');
  $internalNotes.val($internalNotes.val() + logMsg)

}

function postPayment(payment) {
  payment.quoteId = $('#quoteId').val() + payment.type[0];
  payment.customerName = getCustomerName();

  var message = {
    action: 'Post Payment',
    payment: payment
  }
  logPayment(payment);
  chrome.runtime.sendMessage(message);
}

function addPaymentLink($amount, amount, paymentType) {
  var payment = {};
  payment.date = $amount.parent().prev().text();
  payment.amount = amount;
  payment.type = paymentType;

  var title = paymentType[0] + ' ' +amount;
  // append  Charge
  $($amount).parent().parent()
    .after($('<td>')
    .addClass('dataA')
      // .append($('<td>')
        .css( 'background-color', '#85bb65' )
        .append($('<a>')
        .addClass('special')
          .text(title)
          .click(function() {
            postPayment(payment);
          })
        )
      // )
    );
}

function amountReady(element) {
  var $amount = $(element);
  var amount = Math.floor($amount.val());

  var splitAmount = $amount.attr('type') == 'hidden';


  var deposit = splitAmount ? Math.round(amount * 0.25 / 5) * 5 : amount;
  var balance = splitAmount ? amount - deposit : amount;
  addPaymentLink($amount, balance, 'Balance')
  addPaymentLink($amount, deposit, 'Deposit')
  console.log(deposit, balance, splitAmount)
}

function amounts() {
  console.log('hello amounts');
  ready('[name^=allocation]', amountReady);
}

function init() {
  console.log('pay_mp.js loaded!')
  chrome.storage.sync.get(null, function (options) {
    if (options.mpeQuickPay) {
      amounts();
    }
  });
}

init();
