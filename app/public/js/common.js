"use strict";

/*$(function(){
  var includes = $('[data-include]');
  jQuery.each(includes, function(){
  var file = '../html/' + $(this).data('include') + '.html';
  $(this).load(file);
  });
});*/
//function to collapse the extra options
// parameter - checkbox event, the class name of the section to show/hide
function hideShow(checkboxName, sectionName){
      if($(checkboxName).is(":checked"))
        $(sectionName).removeClass('hideSection');
      else
        $(sectionName).addClass('hideSection');
};
//email validation
function validateEmail(email) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(email)) 
        return true;
    return false;
    
}
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip(); 
    $('[rel=tooltip]').tooltip({container: 'body'});

   	 /*close button modal*/
    $('.close, .closeButton').click(function() {
        $('.modal').fadeOut();
    });

    $('.collapseLink').click(function(){
      $(this).find('.fa-chevron-down, .fa-chevron-up').toggleClass('hide');
    });


    //logout
    $('#logout').click(function(event){
      event.preventDefault();
      $.ajax({
        url : '/api/v1/logout',
        type : 'GET',
        headers : {'x-access-token' : sessionStorage.getItem('token')},
        success : function(result){
          sessionStorage.setItem('token', result.token);
          window.location.href = '../logout';
        },
        error : function(error){
          alert('You are not logged in!');
          sessionStorage.removeItem('token');
          window.location.href = '../logout';
        }
      })
      /*$('#logout').attr('href','../logout');*/
    });


    //go back in history
     $('.goBack').click(function(event) {
            event.preventDefault();
            window.history.back();
        })
});
