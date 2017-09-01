var deemphasizePrintout = function(term) {
  $('.jsLog2:contains(' + term + ')').addClass('translucent');
}

function supports_html5_storage() {
  try {
    return 'localStorage' in window && window['localStorage'] !== null;
  } catch (e) {
    return false;
  }
}

var displayTerm = function(term) {
  $('#defField').text(storage[term]);
  $('#termDisplay').text(term);
}

var showTitle = function() {
  $('#TitleText').text(title);
  $('#DescriptionText').text(desc);
}

var hidePopups = function() {
  $('.popupDiv').hide();
}

var displayStoredItem = function(itemName) {
  var $body = $('#scrollbox');
  var $textBit = $('<div class="jsLog2"><button class="termButton">' + itemName + '</button></div>');
  $textBit.prependTo($body);
};

var clearTextFields = function() {
  $('#wordField').val('');
  $('#defInputField').val('');
  $('#searchField').val('');
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
    title = 'The Geekicon';
    desc = 'The Lexicon of Geekology';
    storage = {};
  } else {
    console.log('Load old storage');
    storage = JSON.parse(result);
    title = localStorage.getItem('GeekiconTitle');
    desc = localStorage.getItem('GeekiconDesc');
    $('#TitleText').text(title);
    $('#DescriptionText').text(desc);
    loadSortedKeys();
  }
}

var loadSortedKeys = function() {
  var tempStorage = [];
  for (var key in storage) {
    tempStorage.push(key);
  }
  console.log('pre-sort', tempStorage);
  tempStorage.sort();
  console.log('post-sort', tempStorage);
  for (var i = tempStorage.length - 1; i >= 0; i--) {
    displayStoredItem(tempStorage[i]);
  }
};

var writeTitle = function() {
  localStorage.setItem("GeekiconTitle", title);
  localStorage.setItem("GeekiconDesc", desc);
}

var writeStorage = function() {
  localStorage.setItem(storageName, JSON.stringify(storage));
}
