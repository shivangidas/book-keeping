$(document).ready(function(){
	"use strict";
	
	function drawRect(){
		// initialize fabric canvas and assign to global windows object for debug
		var canvas = window._canvas = new fabric.Canvas('canvas',{selectable:false});
		var blue = new fabric.Rect({
      			top: 0, left: 100, width: 50, height: 70, fill: 'blue' 
  				});
		fabric.Object.prototype.transparentCorners = false;
  		canvas.add(blue);
	}
	
});