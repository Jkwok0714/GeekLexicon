var reddifyPrintout = function(term) {
  $('.jsLog2:contains(' + term + ')').addClass('reddified');
}

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

var hidePopups = function() {
  $('.popupDiv').addClass('invisible');
}

var displayStoredItem = function(itemName) {
  var $body = $('#scrollbox');
  var $textBit = $('<div class="jsLog2"><button class="termButton">' + itemName + '</button></div>');
  $textBit.prependTo($body);
};

var clearTextFields = function() {
  $('#wordField').val('');
  $('#defInputField').val('');
};

var initiateTextFields = function() {
  clearTextFields();
}

var clearStorage = function() {
  storage = {};
  writeStorage();
}

var loadStorage = function() {
  var result = localStorage.getItem(storageName);
  if (result === undefined || result === null) {
    console.log('New storage');
    storage = {};
  } else {
    console.log('Load old storage');
    storage = JSON.parse(result);
    for (var key in storage) {
      displayStoredItem(key);

    }
  }
}

var writeStorage = function() {
  localStorage.setItem(storageName, JSON.stringify(storage));
}
