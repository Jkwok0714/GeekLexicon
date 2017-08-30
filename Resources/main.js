var storage;
var storageName = "Geekicon";

var main = function() {
  function supports_html5_storage() {
    try {
      return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
      return false;
    }
  }
  // console.log(JSON.stringify(storage));
};

var hidePopups = function() {
  $('.popupDiv').addClass('invisible');
}

var displayStoredItem = function(itemName) {
  var $body = $('#scrollbox');
  var $textBit = $('<div class="jsLog2">' + itemName + '</div>');
  $textBit.prependTo($body);
};

var clearTextFields = function() {
  $('#wordField').val('');
  $('#defField').val('');
};

var jQueryStuff = function() {
  $('#cancelOverwriteButton').on('click', function() {
    $('#verifyPopup').addClass('invisible');
  });

  $('#addButton').on('click', () => {
    var term = $('#wordField').val();
    var definition = $('#defField').val();
    if (term === '' || definition === '') {
      alert('Attempted to add empty values!\nTerm: ' + term + '\nDefinition: ' + definition);
      return;
    }
    storage[term] = definition;
    clearTextFields();
    displayStoredItem(term);
    writeStorage();
  });

  $('#removeButton').on('click', () => {
    var term = $('#wordField').val();
    if (storage[term] === undefined) {
      alert('Term \'' + term + '\' not found!');
    } else {
      if (confirm('Are you sure you wish to delete entry for ' + term + '?')) {
        delete storage[term];
        reddifyPrintout(term);
        writeStorage();
      }
    }
  });
};

var reddifyPrintout = function(term) {
  $('.jsLog2:contains(' + term + ')').addClass('reddified');
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


//====Make sure this is last==
$(document).ready(function() {
  loadStorage();
  hidePopups();
  clearTextFields();
  main();
  jQueryStuff();
});
