var position1 = 0;
var position2 = 0;		
var Images = [], ImageSetOrder = [], blankImage = "", ImageSource = "";
var numFiles = 4;
var numColumnes = 4;
var start = 0;

var startID = ["./images/start.png"];

	for(var x = 0; x < startID.length; x++){
		var boto = document.createElement('input');
		boto.setAttribute('type', 'button');
		boto.setAttribute('id', x);
		boto.setAttribute('style', 'background-image: url(' + startID[x] +');');
		document.getElementById('StartButton').appendChild(boto);
		}		
		$("input").click(function() {						
 			PuzzleGame(start);
		});


		//Start Button Function
		function PuzzleGame(start){

		var resetTotal = SetRestart(document.getElementById('PuzzleGame'));
				
		ImageSetArray(numColumnes, numFiles, start);			
		setImatges(resetTotal, Images, numColumnes, numFiles, start);

		//Array Imatges
		function ImageSetArray(colums, rows, start){			
			for(var x = 0; x < colums * rows - 1 ; x++){
				Images.push("./images/" + x + ".jpeg");					
			}
			Images.push("./images/" + "blank.png");
			ImageSetOrder = Images.slice(0);
		
			Images.sort(function() {return 0.5 - Math.random()});

		}
				//Posant Images
		function setImatges(resetTotal, Images, colums, rows, start){
			var numImatge = 0;
			var blankPosition = Images.indexOf("./images/" + "blank.png");			
				for(var y = 0; y < rows; y++){
				for(var x = 0; x < colums; x++){
					var img = document.createElement('img');
					if(numImatge == blankPosition){						
						position1 = x;
						position2 = y;	
					}
					img.setAttribute('src', Images[numImatge]);		
					img.setAttribute('x', x);
					img.setAttribute('y', y);
					resetTotal.appendChild(img);					
							
					numImatge++;
				}				
			}
		}
			//Start / Reset Again.
		function SetRestart(startreset){
			Images = [];		
			ImageSetOrder = [];
			position1 = 0;
			position2 = 0;
				while (startreset.firstChild){
				startreset.removeChild(startreset.firstChild);
			}
			return startreset;
			}		
	}		
	//Posicion de la Image
		function getImage(position1, position2){
			return $( 'img[x="'+ position1 +'"][y="' + position2 + '"]' ).attr("src");
		}
		//Canvien Image
		function ImageSet(position1, position2, path){
			return $( 'img[x="'+ position1 +'"][y="' + position2 + '"]' ).attr("src", path);
		}	
		

		//Keyboard events Set
	$( window ).keypress(function( event ) {		
		switch(event.keyCode) {
		    case 37:		    	
		    	if(position1 < numColumnes - 1){
		    		blankImage = getImage(position1, position2);
		    		ImageSource = getImage((parseInt(position1) + 1), position2);
		    		ImageSet((parseInt(position1) + 1), position2, blankImage);		    		    		
		    		ImageSet(position1, position2, ImageSource);    			    	
		        	position1 ++;		      
			    	}
		        break;
		    case 38:
		    	if(position2 < numFiles - 1){
		    		blankImage = getImage(position1, position2);		    		
		    		ImageSource = getImage(position1, (parseInt(position2) + 1));
		    		ImageSet(position1, (parseInt(position2) + 1), blankImage);		    		    		
		    		ImageSet(position1, position2, ImageSource);
		    		position2++;
		    	}		    	
		        break;
		    case 39:	
		    	if(position1 > 0){
		    		
		    		blankImage = getImage(position1, position2);
		    		ImageSource = getImage((parseInt(position1) - 1), position2);
		    		ImageSet((parseInt(position1) - 1), position2, blankImage);		    		    		
		    		ImageSet(position1, position2, ImageSource);
		    		position1--;		    		
			    	}
			        break;	
			
			    case 40:		    	
			    	if(position2 > 0){		    		
		    		blankImage = getImage(position1, position2);		    		
		    		ImageSource = getImage(position1, (parseInt(position2) - 1));		    		
		    		ImageSet(position1, (parseInt(position2) - 1), blankImage);		    		    		
		    		ImageSet(position1, position2, ImageSource);
			    	position2--;
			    }
			        break;   
			    default:
		        return 0;
		    }		
	});
