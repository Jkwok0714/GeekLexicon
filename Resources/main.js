var storage;
var storageName = "Geekicon";

var main = function() {
  // console.log(JSON.stringify(storage));
};

//====== Helper Functions======

var jQueryStuff = function() {
  $('#cancelButton').on('click', function() {
    $('.popupDiv').addClass('invisible');
  });

  $('#addButton').on('click', function() {
    $('#addTermPopup').removeClass('invisible');

  });
  $('#reviseButton').on('click', function() {
    console.log($('#defField').text());
    if ($('#defField').text() === '' || $('#defField').text() === undefined) {
      alert('No current term selected! Please select/search a term.');
      return;
    }
    $('#addTermPopup').removeClass('invisible');
    $('#wordField').val($('#searchField').val());
    $('#defInputField').val($('#defField').text());
  });


  $('#addTermButton').on('click', () => {
    var term = $('#wordField').val();
    var definition = $('#defInputField').val();
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
    $('#addTermPopup').addClass('invisible');
  });

  $('#searchButton').on('click', () => {
    var term = $('#searchField').val();
    if (term === '') {
      alert('Enter a search term!');
    } else if (storage[term] === undefined) {
      alert('Term \'' + term + '\' not found!');
    } else {
      $('#defField').text(storage[term]);
    }
  });

  $('#scrollbox').on('click', '.termButton', function() {
    var term = $(this).text();
    // console.log('Clicked a term:', $(this).text());
    $('#defField').text(storage[term]);
    $('#searchField').val(term);
  });

  $('#removeButton').on('click', () => {
    var term = ($('#searchField').val());
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
