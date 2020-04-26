$(document).ready(function() {

	//coordinates of the 'dots'
	var coords = [
		[450,100]
        ,[395,170]
        ,[450,240]
        ,[500,225]
        ,[570,240]
        ,[560,280]
        ,[500,320]
        ,[530,360]
        ,[550,450]
        ,[530,525]
        ,[520,550]
        ,[500,535]
        ,[355,570]
        ,[350,590]
        ,[325,580]
        ,[250,540]
        ,[230,525]
        ,[250,515]
        ,[270,520]
        ,[265,485]
        ,[285,465]
        ,[295,415]
        ,[240,420]
        ,[196,425]
        ,[195,390]
        ,[225,340]
        ,[225,320]
        ,[210,290]
        ,[205,270]
        ,[120,240]
		];

	//draw all the dots
	for(i=0;i<coords.length;i++) {

		css = {
			left: coords[i][0]-6,
			top: coords[i][1]-17,
			zIndex: coords.length-i //to ensure lower numbers are on top of higher ones in case of overlap
		}
		
		//set the first dot active
		class_active = (i == 0) ? ' active' : '';
		
		// html/css for the dot
		div = $('<div id="dot_container_'+i+'" order_value="'+i+'" class="dot_container'+class_active+'"><div class="dot"></div><div class="dot_number">'+(i+1)+'</div></div>').css(css);
		
		//add the dot to the page
		$('#canvas').append(div);
	}
	
	
	// when a dot is clicked, join it with a line to the previous dot
	$('.dot_container').click(function(){
		
		if ($(this).hasClass('active')) { //check if active class has been added to the dot (note: can't move this into the .click event handler as it won't work there)
		
			var i = parseInt($(this).attr('order_value')); //its order in the dot series
			
			//take active class off current dot
			$(this).removeClass('active');
			
			//if it's the first dot, no line to draw, just make the next dot active
			if (i == 0){
				$('div#dot_container_'+(i+1)).addClass('active'); //make next dot active
				return false;
			}

			//draw line from previous dot to this dot
			x1 = coords[i-1][0];
			y1 = coords[i-1][1];
			x2 = coords[i][0];
			y2 = coords[i][1];
			
			var m = (y2-y1)/(x2-x1); //slope of the segment
			var angle = (Math.atan(m))*180/(Math.PI); //angle of the line
			var d = Math.sqrt(((x2-x1)*(x2-x1)) + ((y2-y1)*(y2-y1))); //length of the segment
			var transform;

			// the (css) transform angle depends on the direction of movement of the line
			if (x2 >= x1){
					transform = (360 + angle) % 360;
			} else {
					transform = 180 + angle;
			}

			// add the (currently invisible) line to the page
			var id ='line_'+new Date().getTime();
			var line = "<div id='"+id+"'class='line'>&nbsp;</div>";
			$('#canvas').append(line);
			
			//rotate the line
			$('#'+id).css({
				'left': x1,
				'top': y1,
				'width': '0px',
				'transform' : 'rotate('+transform+'deg)',
				'transform-origin' : '0px 0px',
				'-ms-transform' : 'rotate('+transform+'deg)',
				'-ms-transform-origin' : '0px 0px',
				'-moz-transform' : 'rotate('+transform+'deg)',
				'-moz-transform-origin' : '0px 0px',
				'-webkit-transform' : 'rotate('+transform+'deg)',
				'-webkit-transform-origin' : '0px 0px',
				'-o-transform' : 'rotate('+transform+'deg)',
				'-o-transform-origin' : '0px 0px'
			});

			// 'draw' the line
			$('#'+id).animate({
				width: d,
				}, 400, "linear", function(){
						//make the next dot active after the line is drawn
						if (i < coords.length)
							$('div#dot_container_'+(i+1)).addClass('active');
					});

			//if it's the last dot, reveal the image
			if (i == coords.length-1){
				revealImage();
			}
			
		}
		
	});

/***
reveal the image
***/
var revealImage = function(){

	//fade out all the dots & lines
	$('.dot_container,.line').animate({
		opacity: 0
	}, 1000, "linear", function(){
		
		//then fade in the image
		$('.hidden_image').animate({
			opacity: 1
		}, 1000, "linear", function(){$('.hidden_image').addClass('animate');} );
        
      $("#my_audio").get(0).play();
    $("#my_audio").prop("volume", 0).animate({volume: 0.4}, 6000);
	
	});


$('#hidden_image').click(function() {
    location.reload();
});
};
	
});
