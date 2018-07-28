$(document).ready(function(){
	"use strict;"
	/*enable apps based on check*/
	$('#appCheck').click(function() {
	   if($(this).is(":checked")) {
	      $('#appType').attr('disabled',false);
	      return;
	   }
	   $('#appType').attr('disabled',true);
	});
	/*enable complexity*/
	$('#falseRecognitionCheck').click(function() {
	   if($(this).is(":checked")) {
	      $('#complexityLevel').find('label').removeClass('disabled');
	      return;
	   }
	   $('#complexityLevel').find('label').addClass('disabled');
	});
	/*enable pose variation*/
	$('#poseVariationCheck').click(function() {
	   if($(this).is(":checked")) {
	      $('#sensitivityLevel').find('label').removeClass('disabled');
	      return;
	   }
	   $('#sensitivityLevel').find('label').addClass('disabled');
	});
	/*Enable Noise Sensitivity*/
	$('#minNoiseCheck').click(function() {
		if($(this).is(":checked")) {
	      $('#ex3').slider('enable');
	      return;
	   }
	   $('#ex3').slider('disable')
	});
	//Slider
	$('#ex1,#ex3, #ex5').slider({
		formatter: function(value) {
			return value;
		},
		tooltip_position:'bottom'
	});
	$('#ex2,#ex4').slider({
		formatter: function(value) {
			return value;
		}
	});


});