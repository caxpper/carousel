
$(document).ready(initializeApp);
var autoSwap;
var currentItem = 0;
var itemCount;

/**
 * Initialize the automatic carousel
 */
function initializeApp(){    
    //we get the number of pictures in the carousel
    itemCount = $('.carousel .items').length;

    //init the autoswap
    autoSwap = setInterval(swap,4000);
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


