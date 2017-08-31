var storage;
var storageName = 'Geekicon';
var addOrRevise = 'add';
var fadeSpeed = 500;
var title, desc;

//===== TO DO =======
//Change title/desc, save, loadStorage
//Change background image maybe


var main = function() {
  // console.log(JSON.stringify(storage));
};

//====== Helper Functions======

var jQueryStuff = function() {
  $('.cancelButton').on('click', function() {
    console.log('Cancel all the things');
    $('.popupDiv').hide(fadeSpeed);
  });

  $('#addButton').on('click', function() {
    $('#addTermPopup').show(fadeSpeed);
    addOrRevise = 'add';

  });

  $('#setTitleButton').on('click', function() {
    $('#setTitlePopup').show(fadeSpeed);
  });

  $('#setTitleConfirmButton').on('click', function() {

  });

  $('#reviseButton').on('click', function() {
    // console.log($('#defField').text());
    if ($('#defField').text() === '' || $('#defField').text() === undefined) {
      alert('No current term selected! Please select/search a term.');
      return;
    }
    addOrRevise = 'revise';
    $('#addTermPopup').show(fadeSpeed);
    $('#wordField').val($('#termDisplay').text());
    $('#defInputField').val($('#defField').text());
  });


  $('#addTermButton').on('click', () => {
    var term = $('#wordField').val();
    var definition = $('#defInputField').val();
    if (term === '' || definition === '') {
      alert('Attempted to add empty values!\nTerm: ' + term + '\nDefinition: ' + definition);
      return;
    }
    if (storage.hasOwnProperty(term) && addOrRevise === 'add') {
      if (!confirm(term+ ' already exists. Overwrite?')) {
        return;
      }
    } else if (storage.hasOwnProperty(term) && addOrRevise === 'revise') {

    } else {
      displayStoredItem(term);
    }
    storage[term] = definition;
    clearTextFields();
    writeStorage();
    displayTerm(term);
    $('#addTermPopup').hide(fadeSpeed);
  });

  $('#searchButton').on('click', () => {
    var term = $('#searchField').val();
    if (term === '') {
      alert('Enter a search term!');
    } else if (storage[term] === undefined) {
      alert('Term \'' + term + '\' not found!');
    } else {
      displayTerm(term);
    }
  });

  $('#scrollbox').on('click', '.termButton', function() {
    var term = $(this).text();
    // console.log('Clicked a term:', $(this).text());
    displayTerm(term);
  });

  $('#removeButton').on('click', () => {
    var term = ($('#termDisplay').text());
    if (storage[term] === undefined) {
      alert('Term \'' + term + '\' not found!');
    } else {
      if (confirm('Are you sure you wish to delete entry for ' + term + '?')) {
        delete storage[term];
        initiateTextFields();
        deemphasizePrintout(term);
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
