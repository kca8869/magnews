
//make carousel sliders//

//place all of the divs with a  class of slider in a global var to be made into a carousel
var sliders=document.querySelectorAll(".slider");
var carousels=[];

//assign all of the related divs in the "slider" container to a single object
function Carousel(containerId){
  this.container=document.getElementById(containerId);
  this.imgArray=this.container.querySelectorAll(".slider__img");
  this.leftSlider=this.container.querySelector(".slider__arrow--left");
  this.rightSlider=this.container.querySelector(".slider__arrow--right");
}
//function to clone all of the "slider__img" divs. Needed to have enough elements to cycle.
Carousel.prototype.makeClones = function () {
  for (var i = 0; i < this.imgArray.length; i++) {
    var cln=this.imgArray[i].cloneNode(true);
    this.container.appendChild(cln);
  }
    //adds all of the new clones to the imgArray
  this.imgArray=this.container.querySelectorAll(".slider__img");
};
  //assigns properties to each carousel item to position them correctly, based on the inherent
    //scrollWidth property to determine element size
Carousel.prototype.updateArray = function () {
  for (var i = 0; i < this.imgArray.length; i++) {
    this.imgArray[i].translated=(this.imgArray[i].scrollWidth * i - this.imgArray[i].scrollWidth);
    this.imgArray[i].screenPos=i;
    this.imgArray[i].style.left=(this.imgArray[i].scrollWidth * i - this.imgArray[i].scrollWidth) + "px"  ;
  }
};
  //moves every item to the right and cycles the last one to the front
  //uses zIndex property to hide cycling items
Carousel.prototype.slideRight = function () {
  for (var i = 0; i < this.imgArray.length; i++) {
    this.imgArray[i].screenPos++;
    if (this.imgArray[i].screenPos==1 || this.imgArray[i].screenPos==2) {
      this.imgArray[i].style.zIndex=1;
    } else {
      this.imgArray[i].style.zIndex=0;
    }
    if (this.imgArray[i].screenPos >= this.imgArray.length) {
      this.imgArray[i].screenPos=0;
      this.imgArray[i].translated=-this.imgArray[i].scrollWidth;
    } else {
      this.imgArray[i].translated += this.imgArray[i].scrollWidth;
      //this if statement compensates for rounding
      if (this.imgArray[i].translated==-1) {
        this.imgArray[i].translated=0;
      }
    }
    this.imgArray[i].style.left= this.imgArray[i].translated+"px";
  }
};
  //same as slide right but other way
Carousel.prototype.slideLeft = function () {
  for (var i = 0; i < this.imgArray.length; i++) {
    this.imgArray[i].screenPos--;
    if (this.imgArray[i].screenPos==1 || this.imgArray[i].screenPos==2) {
      this.imgArray[i].style.zIndex=1;
    } else {
      this.imgArray[i].style.zIndex=0;
    }
    if (this.imgArray[i].screenPos < 0) {
      this.imgArray[i].screenPos=this.imgArray.length-1;
      this.imgArray[i].translated= (this.imgArray[i].scrollWidth * (this.imgArray.length-1) - this.imgArray[i].scrollWidth);// - (this.imgArray[i].scrollWidth * i);
    } else {
      this.imgArray[i].translated -= this.imgArray[i].scrollWidth;
      //this if statement compensates for rounding
      if (this.imgArray[i].translated==-1 || this.imgArray[i].translated==-2) {
        this.imgArray[i].translated=0;
      }
    }
    this.imgArray[i].style.left= this.imgArray[i].translated+"px";
  }
};
  //function to define a new carousel and run it's functions
      //and push all new ones to carousel array
function makeCarousel(name) {
  var name=new Carousel(name);
  name.makeClones();
  name.updateArray();
  name.leftSlider.onclick=function () {
    name.slideRight();
  }
  name.rightSlider.onclick=function () {
    name.slideLeft();
  }
  carousels.push(name);
}
//updates element sizes of all carousel images everytime the widow is resized
window.onresize=function() {
  for (var i = 0; i < carousels.length; i++) {
    carousels[i].updateArray();
  }
}
//makes a carousel object for every element with the "slider" class
for (var i = 0; i < sliders.length; i++) {
  makeCarousel(sliders[i].id)
}


//scroll reveal
 var topReturn=document.querySelector(".top-return");
 window.addEventListener("scroll",function () {
   var y=window.scrollY;
   if (y>=700) {
     topReturn.style.opacity=1;
     topReturn.style.visibility="visible";
   }else{
     topReturn.style.opacity=0;
     topReturn.style.visibility="hidden";
   }
 })
