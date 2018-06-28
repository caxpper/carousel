
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
        timerId = setInterval(swap,3000);
    });

    $('.dot').click((event)=> {
      swap(event.target.id);
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
      $('#dot'+currentItem).removeClass('dotActive');
      currentItem = (currentItem + 1) % itemCount;
      $(".slide").css("transform","translateX("+currentItem * -400+"px)");      
      $('#dot'+currentItem).addClass('dotActive');
  }else if(action === 'backward'){//go backward
      $('#dot'+currentItem).removeClass('dotActive');
      currentItem = (currentItem +6) % itemCount;
      $(".slide").css("transform","translateX("+currentItem * -400+"px)");      
      $('#dot'+currentItem).addClass('dotActive');
  }else{ //if the user click in a dot       
      $('#dot'+currentItem).removeClass('dotActive');
      let num = action.substring(3, 4);
      currentItem = parseInt(num);     
      $(".slide").css("transform","translateX("+currentItem * -400+"px)");     
      $('#dot'+currentItem).addClass('dotActive');
  }    

}



