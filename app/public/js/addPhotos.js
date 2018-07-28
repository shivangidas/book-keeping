$(document).ready(function(){
  "use strict;"
// Check for the various File API support.
if (window.File && window.FileReader && window.FileList) {
    
	//function to read and display selected images
    function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        //alert("Please select an image");
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', (theFile.name), '"/>'].join('');
          var nameOfFile = (theFile.name);
          //console.log(nameOfFile);
          $('#uploadImage').val(nameOfFile);
          document.getElementById('list').insertBefore(span, null);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }
  $(document).on('click', '.browse', function(event){
   event.preventDefault();
	  var file = $(this).parent().find('#files');
	  file.trigger('click');
	});
  document.getElementById('files').addEventListener('change', handleFileSelect, false);
  function handleDropSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files; // FileList object.

        // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      var reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render thumbnail.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="thumb" src="', e.target.result,
                            '" title="', (theFile.name), '"/>'].join('');
          document.getElementById('list').insertBefore(span, null);
          $('#uploadImage').val(theFile.name);
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }

  }

  function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
  }

  // Setup the dnd listeners.
  var dropZone = document.getElementById('drop_zone');
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleDropSelect, false);
} else {
  alert('The File APIs are not fully supported in this browser.');
}
  $('#registeredDB input[type=radio]').click(function(){
    $('#registeredDB').find('.registerButton').removeClass('disabled');
    $('#recentDB').find('button').addClass('disabled');
  });

  $('#recentDB input[type=radio]').click(function(){
    $('#recentDB').find('button').removeClass('disabled');
    $('#registeredDB').find('.registerButton').addClass('disabled');
  });

  $('.registerButton').click(function(){
    event.preventDefault();
    //connect to DB or some crazy stuff
  });

});