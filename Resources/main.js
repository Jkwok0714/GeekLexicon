var main = function() {

};

var jQueryStuff = function() {
  $('#cancelOverwriteButton').on('click', function() {
    $('#verifyPopup').addClass('invisible');
  });
};


//====Make sure this is last==
$(document).ready(function() {
  main();
  jQueryStuff();
});
