var storage;
var storageName = "Geekicon";

var main = function() {
  // console.log(JSON.stringify(storage));
};

//====== Helper Functions======

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
    if (storage.hasOwnProperty(term)) {
      if (!confirm(term+ ' already exists. Overwrite?')) {
        return;
      }
    } else {
      displayStoredItem(term);
    }
    storage[term] = definition;
    clearTextFields();
    writeStorage();
  });

  $('#searchButton').on('click', () => {
    var term = $('#wordField').val();
    if (term === '') {
      alert('Enter a search term!');
    } else if (storage[term] === undefined) {
      alert('Term \'' + term + '\' not found!');
    } else {
      $('#defField').val(storage[term]);
    }
  });

  $('#scrollbox').on('click', '.termButton', function() {
    var term = $(this).text();
    // console.log('Clicked a term:', $(this).text());
    $('#defField').val(storage[term]);
    $('#wordField').val(term);
  });

  $('#removeButton').on('click', () => {
    var term = ($('#wordField').val());
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

//====Make sure this is last==
$(document).ready(function() {
  loadStorage();
  hidePopups();
  initiateTextFields();
  main();
  jQueryStuff();
});
