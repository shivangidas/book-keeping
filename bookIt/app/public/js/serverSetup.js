$(document).ready(function(){
"use strict";	
$("#milestoneDiv").hide();
$('#hiddenForm input').on('change', function() {
	var serverSelected= $('input[name=server]:checked', '#hiddenForm').val();
   if(serverSelected=="milestone"){
   	$("#directCameraDiv").hide();
   	$("#milestoneDiv").show();
   }
   else{
   	$("#milestoneDiv").hide();
   	$("#directCameraDiv").show();
   }
});

/*go to general setup*/
$('#proceedWithGeneralSetup').click(function () {
	$('#hiddenForm').attr('action','GeneralSetup');
	$('#hiddenForm').submit();
});

/*redirect to License*/
$('#addLicense').click(function(event){
   event.preventDefault();
   window.location.href = 'home';
});

});