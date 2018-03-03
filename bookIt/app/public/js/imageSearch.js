$(document).ready(function(){
  "use strict;"
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
          enableRecogniseButton();
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }
    $(document).on('click', '.uploadButton', function(event){
   event.preventDefault();
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

$('.cancelButton').click(function(){
  $(this).parent().parent().find('.imageHolder').html("");
  $('.recogniseButton').removeClass('btn-success').addClass('disabled btn-default');
});

/*function to enable recognise and save on uploading a picture*/
function enableRecogniseButton() {
    if($('.imageHolder').find('img').length != 0){
      $('.recogniseButton').removeClass('disabled btn-default').addClass('btn-success');
    }    
}
          
  /*carousel*/
  $('.carousel[data-type="multi"] .item').each(function(){
    var next = $(this).next();
    if (!next.length) {
      next = $(this).siblings(':first');
    }
    next.children(':first-child').clone().appendTo($(this));
    
    for (var i=0;i<4;i++) {
      next=next.next();
      if (!next.length) {
          next = $(this).siblings(':first');
      }
      
      next.children(':first-child').clone().appendTo($(this));
    }
  });

});