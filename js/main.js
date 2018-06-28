
$(document).ready(initializeApp);
var timerId;
var currentItem = 0;
var itemCount;

/**
 * Initialize the automatic carousel
 */
function initializeApp(){    
    //we get the number of pictures in the carousel
    itemCount = $('.carousel .items').length;

    //init the autoswap
    timerId = setInterval(swap,3000);
    
    //next button 
    $('.next').click(function() {
      swap('forward');
    });

    //back button 
    $('.back').click(function() {
      swap('backward');
    });

    //disabled the auto swap when the 
    $('.carousel').hover(
      () => {
        clearInterval(timerId);
      }, 
      () =>{
        timerId = setInterval(swap,3000);
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
      $('#'+currentItem).addClass('hidden');
      currentItem = (currentItem + 1) % itemCount;
      $('#'+currentItem).removeClass('hidden');
  }else{
      $('#'+currentItem).addClass('hidden');
      currentItem = (currentItem +6) % itemCount;
      $('#'+currentItem).removeClass('hidden');
  }    

}


