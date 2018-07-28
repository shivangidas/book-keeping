$(document).ready(function(){
	"use strict";

	$('#peopleSize').click(function(){
			hideShow(this, '.peopleSize');
			if(!$(this).is(":checked")){
				removeObjectFromCanvas('peopleSize');
			}
		});
		//function to collapse the extra options
		// parameter - checkbox event, the class name of the section to show/hide
		function hideShow(checkboxName, sectionName){
			if($(checkboxName).is(":checked"))
				$(sectionName).removeClass('hideSection');
			else
				$(sectionName).addClass('hideSection');
		};

	var canvas;
		// initialize fabric canvas and assign to global windows object for debug
		canvas = window._canvas = new fabric.Canvas('canvas',{selectable:false});

			// Do some initializing stuff
			fabric.Object.prototype.set({
					    transparentCorners: false,
					    cornerColor: 'rgba(102,153,255,0.5)',
					    cornerSize: 12,
					    id : this.id
					});

			//call function to render things saved before
		    drawSavedCanvas();
		    /*Advanced setup -start*/
		   
		    //carSize();
		    $('#peopleSizeButton').click(function(){
				 removeObjectFromCanvas('peopleSize');
				 personSize();
			})
		     function personSize(){
		    	fabric.Image.fromURL('../../images/person1.png', function(oImg) {
				  // scale image down, and flip it, before adding it onto canvas
				  oImg.set({'top':100, 
				  			'lockRotation': true,
				  			id:'peopleSize'
										});
				  canvas.add(oImg);
				});
		    }
		     function carSize(){
		    	fabric.Image.fromURL('../../images/car1.png', function(oImg) {
				  // scale image down, and flip it, before adding it onto canvas
				  oImg.set({'lockRotation': true
										});
				  canvas.add(oImg);
				});
		    }
		   
		    /*Advanced setup -end*/
		    		//hide all irrelevant features
					/*$('.line').addClass('hideSection');
					$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
					  var target = $(e.target).attr("href") // activated tab
					  if(target == '#line'){
					  	$('.line').removeClass('hideSection');
					  	$('.area').addClass('hideSection');
					  	//remove unused canvas data
						  	clearCanvas();
						  	//$('#drawLine').trigger('click');
					  }
					  else if(target == '#area'){
					  	$('.line').addClass('hideSection');
					  	$('.area').removeClass('hideSection');
					  	//remove unused canvas data
						  	clearCanvas();
						  	//$('#drawRect').trigger('click');
					  }
					});*/

					//don't hide, just disable
					//initially all line features are disabled
					$('.line').find('input[type="checkbox"]').attr('disabled',true);
					//on tab toggle, enable respective features
					$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
						var target = $(e.target).attr("href") // activated tab
						if(target == '#line'){
						  	$('.line').find('input[type="checkbox"]').removeAttr('disabled');
						  	$('.area').find('input[type="checkbox"]').attr('disabled',true);
						  	//remove unused canvas data
						  	clearCanvas();
						  	//$('#drawLine').trigger('click');
						  }
						  else if(target == '#area'){
						  	$('.line').find('input[type="checkbox"]').attr('disabled',true);
						  	$('.area').find('input[type="checkbox"]').removeAttr('disabled');
						  	//remove unused canvas data
						  	clearCanvas();
						  	//$('#drawRect').trigger('click');
						  }
					});


					//change of entry exit
					$('input[type=radio][name=directionCheck]').on('change', function() {
						//remove unsaved roi
						clearCanvas();
						//trigger line drawing button
						$('#drawLine').trigger('click');
					});

					// Both direction line
					$('#bothDirection').click(function(){

						if($('#bothDirection').is(':checked')){
							//disable entry exit option
							$('input[type=radio][name=directionCheck]').attr('disabled',true);
							$('input[type=radio][name=directionCheck]').parent().addClass('disabled');
						}
						else{
							//enable entry exit option
							$('input[type=radio][name=directionCheck]').removeAttr('disabled');
							$('input[type=radio][name=directionCheck]').parent().removeClass('disabled');
						}

						//
						$('#drawLine').trigger('click');
					});

					//Draw region of interest - rectangle
					$('#drawROI').click(function(event){
						//enable drawing options
						$('#drawArea,#drawRect,#clearCanvasArea').removeClass('disabled');
					});

					//the whole camera view is ROI
					$('#completeFrame').click(function(event){
						//disable draw options
						$('#drawRect,#drawArea,#clearCanvasArea').addClass('disabled');
						//remove unsaved data
						clearCanvas();
					});

					//draw area of interest - rectangle
					$('#drawRect').click(function(event){
						//do nothing if button is disabled
						if($('#drawRect').hasClass('disabled')){
							return;
						}

						//remove unsaved data
						clearCanvas();
						//call function to draw rectangle
						drawRect();
					});

					//TODO -draw area of interest -polygon
					$('#drawArea').click(function(event){
						/*event.preventDefault();*/
						if($('#drawArea').hasClass('disabled')){
							return;
						}
						//remove unsaved data
						clearCanvas();
						//call function to draw
						drawArea();
					});
					$('#drawLine').click(function(event){
						
						//if button is disable, does nothing
						if($('#drawLine').hasClass('disabled')){
							return;
						}

						//Remove unsaved data
						clearCanvas();

						//draw line with both entry and exit
						if($('#bothDirection').is(':checked')){
							drawBothDirectionLine();
						}

						//draw line with entry
						else if($('#entry').is(':checked') && !$('#exit').is(':checked')){
							drawEntryLine();
						}

						//draw line with exit
						else if(!$('#entry').is(':checked') && $('#exit').is(':checked')){
							drawExitLine();
						}						
					});

					//TODO: needs work. save the area/line name and priority
					$(".saveCanvasButton").click(function(){
						saveCanvas();
					});
					
					//delete all areas and lines on the canvas 
					$('.clearCompleteCanvas').click(function(){
						var check = confirm("All regions/lines will be removed permanently.");
						if( check == true){
							canvas.clear();
							localStorage.removeItem("canvasData");
						}
					});

					$('#drawDirectionForCounterFlow').click(function(){
						if($('#counterflow').is(":checked")){
							removeObjectFromCanvas('counterflow');
							drawCounterFlow();
						}
						else{
							removeObjectFromCanvas('counterflow');
						}
					});

					//delete selected object with button 
					$('.deleteCurrentSelection').click(function(){
						deleteSelectedObject();
					});
					
					//delete selected object with keyboard
					$('html').keyup(function(e){
					    if(e.keyCode == 46) {
					        deleteSelectedObject();
					    }
					});

					//draw a line denoting direction of counter flow
					function drawCounterFlow(){
						var path = new fabric.Path('M 0 0 L 0 50 Z',{
							stroke: 'black',
							strokeWidth: 5,
							angle: 90
						});
						var triangle = new fabric.Triangle({
						  	width: 15, 
						  	height: 15, 
						  	fill: 'black',
						  	left: 13, 
						  	top: -5,
						  	angle: 90
						});
						//Make a group - line direction
						var counterflow = new fabric.Group([ path, triangle ], {
						    left: 100,
						    top: 100,
						    lockScalingY:true,
						    id: 'counterflow'
						});

						//Paint on canvas
					    canvas.add(counterflow);
					}

					//Draw entry line
					function drawEntryLine() {
					    //The main line
					    var path = new fabric.Path('M 0 0 L 0 200 Z', {
					        left: 0,
					        top: 0,
					        stroke: 'red', 
					        strokeWidth: 1
					    });

					    //Entry direction
					    var path2 = new fabric.Path('M 0 0 L 20 0 Z',{
					    	left:0,
					    	top: 100,
					    	stroke: 'green',
					    	strokeWidth: 2
					    });
					  	var triangle = new fabric.Triangle({
						  width: 10, 
						  height: 10, 
						  fill: 'green',
						  left: 30, 
						  top: 95,
						  angle: 90
						});
					    var text = new fabric.Text('Entry', {
						    fontSize: 14,
						    left: 2,
						    top: 90
						});

						//Make a group - line and entry direction
						var group = new fabric.Group([ path, path2, triangle ], {
						    left: 150,
						    top: 40,
						    lockScalingX:true
						});

						//Paint on canvas
					    canvas.add(group);
					    
					}

					//Draw exit line
					function drawExitLine() {
					    //The main line
					    var path = new fabric.Path('M 0 0 L 0 200 Z', {
					        left: 0,
					        top: 0,
					        stroke: 'red', 
					        strokeWidth: 1
					    });

					    //Exit direction
					    var path2 = new fabric.Path('M 0 0 L 20 0 Z',{
					    	left:0,
					    	top: 100,
					    	stroke: 'red',
					    	strokeWidth: 2
					    });
					  	var triangle = new fabric.Triangle({
						  width: 10, 
						  height: 10, 
						  fill: 'red',
						  left: 30, 
						  top: 95,
						  angle: 90
						});
					    var text = new fabric.Text('Exit', {
						    fontSize: 14,
						    left: 2,
						    top: 90
						});

						//Make a group - line and exit direction
						var group = new fabric.Group([ path, path2, triangle ], {
						    left: 150,
						    top: 40,
						    lockScalingX: true
						});

						//Paint on canvas
					    canvas.add(group);
					    
					}

					//Draw line with both entry and exit
					function drawBothDirectionLine(){
						
						//The main line
						 var path = new fabric.Path('M 0 0 L 0 200 Z', {
					        left: 0,
					        top: 0,
					        stroke: 'red', 
					        strokeWidth: 1
					    });

						//Exit direction 
					    var path2 = new fabric.Path('M 0 0 L 20 0 Z',{
					    	left:0,
					    	top: 100,
					    	stroke: 'red',
					    	strokeWidth: 2
					    });
					  	var triangle = new fabric.Triangle({
						  width: 10, 
						  height: 10,
						  fill: 'red',
						  left: 30, 
						  top: 95,
						  angle: 90
						});

						//Entry direction
						 var path3 = new fabric.Path('M 0 0 L 20 0 Z',{
					    	left: -20,
					    	top: 100,
					    	stroke: 'green',
					    	strokeWidth: 2
					    });
					  	var triangle3 = new fabric.Triangle({
						  width: 10, 
						  height: 10, 
						  fill: 'green',
						  left: -30, 
						  top: 106,
						  angle: 270
						});
					    
					    //Group all to make a line with both directions
						var group = new fabric.Group([ path, path2, triangle, path3, triangle3 ], {
						    left: 120,
						    top: 40,
						    lockScalingX:true
						});

						//Paint on canvas
					    canvas.add(group);
					}

					//TODO
					//Draw a rectangular area of interest
					function drawRect(){
						var blue = new fabric.Rect({
				      			top: 10, 
				      			left: 10, 
				      			width: 300, 
				      			height: 220, 
				      			fill: 'blue', 
				      			stroke: 'red', 
				      			opacity: 0.3
				  				});
				  		canvas.add(blue);				  		
						//alert(blue.left + "," + blue.top);
					}

					//TODO
					//Remove things that have not been saved
					function clearCanvas(){
						canvas.clear();
						drawSavedCanvas();	
					}
					
					//TODO
					//Save the areas/lines present on the canvas
					function saveCanvas(){
						localStorage.removeItem("canvasData");
						var jsonData = JSON.stringify(canvas.toJSON(['id']));
						localStorage.setItem("canvasData",jsonData);
						alert("Your ROIs have been saved")
						//save to DB or file
					}

					//remove the area/line selected
					function deleteSelectedObject(){
						if(canvas.getActiveObject()!=null)
						canvas.remove(canvas.getActiveObject());
					}

					//TODO : needs work
					//Redraw the saved areas/lines on the canvas
					function drawSavedCanvas(){
						if (localStorage.getItem("canvasData") !== null) {
							var canvasPoints= localStorage.getItem("canvasData");
							canvas.loadFromJSON(canvasPoints);
							var objs = canvas.getObjects().map(function(o) {
							if (o.type == 'group')
							return o.set('lockScalingX', true); //return objects that you want to select
							});
						}
					}

					function getObjectFromCanvasById(id) {
					    var canvasObject = window.canvas.getObjects().filter((item) => {
					        return item.id == id
					    })
					    return canvasObject[0]
					}
					function removeObjectFromCanvas(objectId) {
					    var canvasObject = getObjectFromCanvasById(objectId)
					    window.canvas.remove(canvasObject)
					}
});
