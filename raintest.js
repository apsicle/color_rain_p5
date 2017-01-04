var DropletArray = [];
var timer = -30;
var rate = 180;
var spots = [];
/*
var my_x = [];
for (var i = 0; i < 200; i++) {
    my_x.push(Math.floor(Math.random()*672));
}
var my_y = [];
for (var i = 0; i < 200; i++) {
    my_y.push(Math.floor(Math.random() * 689));
}
*/


function preload() {
  img = loadImage("flower_dance_girl_black_white.png");
  color_img = loadImage("flower_dance_girl_color.png");
  pixelDensity(1);
  my_img = createImg("flower_dance_girl_black_white.png");
  my_img.size(windowWidth,windowHeight);
}

function setup() {
  
  canvas = createCanvas(windowWidth,windowHeight);
  pg = createGraphics(windowWidth, windowHeight);
  noFill();
  image(color_img, 0, 0, windowWidth, windowHeight);
  loadPixels();
  console.log(pixels.length);
  console.log(windowWidth + ", " + windowHeight);
  window.color_pixels = pixels;
  window.rowLength = windowWidth*4;
  window.columnLength = windowHeight*pixelDensity();
  //this is the size of the pixel array.
  window.pixel_len = window.rowLength * window.columnLength;
  console.log(window.pixel_len);
 
  
}

//Each draw event clears the canvas and updates each Droplet
function draw() {
  //clear your palette;
  clear();
      
  //increase pace of rain
  if(timer == 360) {
    rate = 150;
  }
  if(timer == 510) {
    rate = 130;
  }
  if(timer == 650) {
    rate = 110;
  }
  if(timer == 800) {
    rate = 80;
  }
  if(timer == 900){
    rate = 60;
  }
  if(timer == 960) {
    rate = 30;
  }
  if(timer == 1000){
    rate = 20;
  }
    
  
  //create a new random droplet
  if (timer % rate === 0) {
    //var new_x = my_x[timer/180];
    //var new_x = Math.floor(random(windowWidth)/4)*4;
   	var new_x = Math.floor(random(windowWidth)/8)*4
    //var new_y = my_y[timer/180];
    var new_y = Math.floor(random(windowHeight)/4)*4;
    me = new Droplet(new_x, new_y);
    pushToArray(DropletArray, me);
    //console.log(new_x, new_y);
    window.loc = (window.rowLength*new_y) + (new_x*4);
    console.log(new_x, new_y);
    console.log(window.loc);
    //console.log(window.pixel_len);
    spots.push[window.loc, 0];
  }
  timer ++;
  
  
  //ellipse(540, 260, 60, 60);
       //console.log(pg.pixelDensity());
  //draw image by pixel; 
  pg.loadPixels();
  //console.log(windowWidth + ", " + windowHeight);
  //console.log(pixels.length + " ---- " + window.color_pixels.length);
  //console.log(pixels == window.color_pixels);
  console.log(window.loc);
  
  for (var ind = 0; ind < spots.length; ind++);
  	var loc = spots[ind][0];
  //var loc = Math.floor(window.loc);
  //this is place in pixel array to draw at to draw at (random)
  //console.log(window.loc);
  //var loc = Math.floor(window.loc);
  //console.log(loc);
  //console.log(window.pixel_len);
  //var loc = Math.floor(random(Math.floor(window.pixel_len/16)))*4;
  
  //var loc = Math.floor(random(Math.floor(window.pixel_len/4/pixelDensity())))*4;
  
  //console.log(window.pixel_len + " --- " + pg.pixels.length);
  //find surrounding pixels in a square with radius 4 - recall each 
  //pixel has its info stored in 4 consecutive array cells;
  var radius = spots[ind][1];
  for (var i = 0; i < radius; i++) {
    var top = loc - rowLength*(i);
    var bottom = loc + rowLength*(i);
    
    //bound the pixels within the array.
    if (top - 4*radius < 0) {
      top = 0;
    }
    else if (top > window.pixel_len) {
      top = window.pixel_len;
    }
    if (bottom < 0) {
      bottom = 0;
    }
    else if (bottom + 4*radius > window.pixel_len) {
      bottom = window.pixel_len;
    }
    
    //calculatehowmanypixelsacross
    //r^2=(x-x0)^2+(y-y0)^2
    var j = round(sqrt(625-(sq(i))))*8;
    
    var off = floor(j/2);
    //copy over rows from color image (otherwise you're just filling 
    //two lines, not a solid area).
    for (j-1; j > -1; j--) {
      pg.pixels[top-off + j] = window.color_pixels[top-off + j];
      pg.pixels[bottom-off + j] = window.color_pixels[bottom-off + j];
        
  }
    
    //console.log('new j');
  }
  spots[ind][1] ++;
}
  pg.updatePixels();
  image(pg, 0, 0);
 
  //redraw drips and delete finished drops
  for (var i = 0; i < DropletArray.length; i++) {
    if (DropletArray[i] != undefined) {
      var finished = DropletArray[i].drip();   
      if (finished) {
        delete DropletArray[i];
      }
    }
  }
}

//Create a Droplet at Mouse location on click
function mousePressed() {
    var me = new Droplet(mouseX, mouseY);
  	pushToArray(DropletArray, me);
}

//Droplet class
function Droplet(x, y) {
var curr_wid = 0;
var curr_hei = 0;
var max_wid = 150;
var finished = false;
var echos = [];

this.getX = function() {
  return x;
}
this.getY = function() {
  return y;
}
this.drip = function() {
  if (curr_wid < max_wid) {
    stroke(255, max_wid - curr_wid);
  	ellipse(x, y, curr_wid, curr_hei);
    curr_wid ++;
    curr_hei ++;
  }
    
  //Create secondary perturbations at certain points...
  if (curr_wid == 10) {
    var my_echo = new Echo(x, y, max_wid, false);
    echos.push(my_echo);
  }
  if (curr_wid == 20) {
    var my_echo = new Echo(x, y, max_wid, false);
    echos.push(my_echo);
  }
  
  if (curr_wid == 70) {
    var my_echo = new Echo(x, y, 100, false);
    echos.push(my_echo);
  }
  if (curr_wid == 80) {
    var my_echo = new Echo(x, y, 100, false);
    echos.push(my_echo);
  }
  /*
  if (curr_wid == 140) {
    var my_echo = new Echo(x, y, max_wid, false);
    echos.push(my_echo);
  }
  if (curr_wid == 145) {
    var my_echo = new Echo(x, y, max_wid, false);
    echos.push(my_echo);
  }
  if (curr_wid == 180) {
    var my_echo = new Echo(x, y, max_wid, false);
    echos.push(my_echo);
  }
  if (curr_wid == 190) {
    var my_echo = new Echo(x, y, max_wid, false);
    echos.push(my_echo);
  }
  if (curr_wid == 195) {
    var my_echo = new Echo(x, y, max_wid, true);
    echos.push(my_echo);
  }
  */
  for (var i = 0; i < echos.length; i++) {
    var echo_done = echos[i].echo();
    if (echo_done == true) {
      finished = true;
    }
  }
  return finished;
}

//Echo class - similar to Droplet, except creates no secondary perturbations
function Echo(x, y, max_wid, last_echo) {
  var curr_wid = 0;
  var curr_hei = 0;
  
  this.echo = function() {
    if (curr_wid < max_wid) {
      stroke(255, max_wid - curr_wid);
      ellipse(x, y, curr_wid, curr_hei);
      curr_wid ++;
      curr_hei ++;
    }
    else if (last_echo == true) {
      return true;
    }
    return false;
  }
}
}

function pushToArray(array, object) {
  for(var i = 0; i < array.length; i++) {
    if(array[i] == undefined) {
        array[i] = object;
  		return;
    }
  }
  array.push(object);
  return;
}