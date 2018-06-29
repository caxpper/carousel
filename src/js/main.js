
$(document).ready(initializeApp);
var timerId;
var currentItem = 0;
var itemCount;
var item_width;
var left_value;
var xDown = null;                                                        
var yDown = null;  

/**
 * Initialize the automatic carousel
 */
function initializeApp(){    
    //we get the number of pictures in the carousel
    itemCount = $('.carousel .items').length;
       
    $('#dot'+currentItem).addClass('dotActive');

    //grab the width and calculate left value
    item_width = $('.items').outerWidth(); 
    left_value = item_width * (-1); 
          
    //move the last item before first item, just in case user click prev button    
    $('.slide .items:first').before($('.slide .items:last'));  
  
    //set the default item to the correct position 
    $('.slide').css({'left' : left_value});
    
    //init the autoswap
    timerId = setInterval(autoSwap,3000);     
      
    //next button 
    $('.next').click(() => {
      swap('forward');
    });

    //back button 
    $('.back').click(()=> {
      swap('backward');
    });

    //disabled the auto swap when the 
    $('.carousel').hover(
      () => {
        clearInterval(timerId);
      }, 
      () =>{
        timerId = setInterval(autoSwap,3000);
    });

    $('.dots img').click((event)=> {
      swap(event.target.id);
    });

    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);
      

}

function autoSwap(){  
    swap();
    $('.bar').animate({'width' : '100%'}, 2900, () => {
      $('.bar').css({'width' : '1%'})
    });
}

/**
 * swap between the images of the carousel.
 * 
 * @param {*} action forward or backward, dependes what direction the user want to move.
 */
function swap(action){
  
  //if the action is undefined go forward
  if(action === undefined || action === 'forward'){
            
      //slide the item
      $('#dot'+currentItem).removeClass('dotActive');
      currentItem = (currentItem + 1) % itemCount;    
      $('#dot'+currentItem).addClass('dotActive');

		  //get the right position
      var left_indent = parseInt($('.slide').css('left')) - item_width;
    
      $(".slide").animate({'left' : left_indent}, 400, () => {
        //move the first item and put it as last item
        $('.slide .items:last').after($('.slide .items:first'));                 	
        
        //set the default item to correct position
        $('.slide').css({'left' : left_value});
      });
      
      
  }else if(action === 'backward'){//go backward
      $('#dot'+currentItem).removeClass('dotActive');
      currentItem = (currentItem +6) % itemCount; 
      $('#dot'+currentItem).addClass('dotActive');
      
      //get the right position            
      var left_indent = parseInt($('.slide').css('left')) + item_width;
    
      $(".slide").animate({'left' : left_indent}, 400, () => {
        //move the first item and put it as last item
        $('.slide .items:first').before($('.slide .items:last'));                 	
        
        //set the default item to correct position
        $('.slide').css({'left' : left_value});
      });

  }else{ //if the user click in a dot       
      
      let num = parseInt(action.substring(3, 4));
      let top = Math.abs(num - currentItem);
      for(let i = 0; i < top; i++){
          num > currentItem ? swap('forward') : swap('backward');
      }
  }    

}

function handleTouchStart(evt) {                                         
  xDown = evt.touches[0].clientX;                                      
  yDown = evt.touches[0].clientY;                                      
};                                                

function handleTouchMove(evt) {
  if ( ! xDown || ! yDown ) {
      return;
  }

  var xUp = evt.touches[0].clientX;                                    
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
      if ( xDiff > 0 ) {
          /* left swipe */ 
          swap('backward');
      } else {
          /* right swipe */
          swap('forward');
      }                       
  } else {
      if ( yDiff > 0 ) {
          /* up swipe */ 
      } else { 
          /* down swipe */
      }                                                                 
  }
  /* reset values */
  xDown = null;
  yDown = null;                                             
};


