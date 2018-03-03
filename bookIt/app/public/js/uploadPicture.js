$(document).ready(function(){
  "use strict;"
   var htmlButtonGroup = "<div class='btn-group btn-group-custom crop-remove'><input type='file' class='files' name='files[]' /><button class='btn btn-default uploadButton'><i class='fa fa-file-image-o' aria-hidden='true'></i></button><button class='btn btn-default cropButton'><i class='fa fa-crop' aria-hidden='true'></i>Crop</button><button class='btn btn-default removeButton'><i class='fa fa-trash-o' aria-hidden='true'></i></button></div> ";
  $('.imageDiv').append(htmlButtonGroup);
  $('.crop-remove').hide();//Crop initially hidden
  $('.cropButton, .btn').click(function(event){
    event.preventDefault();
  });
  var holdUploadButtonthis;
  var holdRemoveButtonthis;
  // Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
  function handleFileSelect(evt) {
    var imageHolder=$(this).parent().parent().find('div.imageHolder');
    var files = evt.target.files; // FileList object

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
          // Render image.
          var span = document.createElement('span');
          span.innerHTML = ['<img class="imgForUpload img-responsive" src="', e.target.result,
                            '" title="', escape(theFile.name), '"/>'].join('');
          imageHolder.html(span);
          showCrop();
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }
    $(document).on('click', '.uploadButton', function(event){
   event.preventDefault();
         //hide upload/capture
     holdUploadButtonthis = $(this).parent().parent().find('.upload-capture');
     holdRemoveButtonthis=  $(this).parent().parent().find('.crop-remove');
    var file = $(this).parent().find('.files');
    file.trigger('click');
  });
  var classname=document.getElementsByClassName('files');
  for (var i = 0; i < classname.length; i++) {
    classname[i].addEventListener('change', handleFileSelect, false);
  }
} else {
  alert('The File APIs are not fully supported in this browser.');
}

$('.removeButton').click(function(){
  event.preventDefault();
  $(this).parent().parent().find('.imageHolder').html("");
  //show upload/capture
  $(this).parent().parent().find('.crop-remove').hide();
  $(this).parent().parent().find('.upload-capture').show();
});

/*Bring out crop option*/
function showCrop() {
    if($('.imageHolder').find('img').length != 0){
      holdUploadButtonthis.hide();
      holdRemoveButtonthis.show();
  }  
}
 

 $('.registerNewFace').click(function(){
  if($('.imageHolder').find('img').length == 0){
    alert('Add images');
  }
 });

});