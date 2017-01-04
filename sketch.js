var DropletArray = [];
var timer = 0;

function preload() {
  img = loadImage("flower_dance_girl_black_white.png");
  color_img = loadImage("flower_dance_girl_color.png");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pg = createGraphics(windowWidth, windowHeight);
  noFill();
  image(color_img, 0, 0);
  loadPixels();
  console.log(pixels.length)
  console.log(pixels);
  window.color_pixels = pixels;
  window.rowLength = windowWidth*4;
  window.len = windowWidth*windowHeight*4;
}

//Each draw event clears the canvas and updates each Droplet
function draw() {
  //clear your palette;
  clear();
  
  //draw image by pixel; 
  pg.loadPixels();
  //console.log(windowWidth + ", " + windowHeight);
  //console.log(pixels.length + " ---- " + window.color_pixels.length);
  //console.log(pixels == window.color_pixels);
  
  //this is pixel to draw at
  var loc = Math.floor(random(window.len));
  
  //find surrounding pixels in a square with radius 4 - recall each 
  //pixel has its info stored in 4 consecutive array cells;
  for (var i = 0; i < 16; i++) {
    var left = loc - i;
    var right = loc + i;
    var top = loc - rowLength*(i);
    var bottom = loc + rowLength*(i);
    
    //bound the pixels within the array.
    if (left < 0) {
      left = 0;
    }
    else if (left > window.len) {
      left = window.len;
    }
    if (right < 0) {
      right = 0;
    }
    else if (right > window.len) {
      right = window.len;
    }
    if (top < 0) {
      top = 0;
    }
    else if (top > window.len) {
      top = window.len;
    }
    if (bottom < 0) {
      bottom = 0;
    }
    else if (bottom > window.len) {
      bottom = window.len;
    }
    
    //copy over from color image
    pg.pixels[left] = window.color_pixels[left];
    pg.pixels[right] = window.color_pixels[right];
    
    //copy over rows from color image (otherwise you're just filling 
    //two lines, not a solid area).
    for (var j = 15 - i; j > -1; j--) {
      pg.pixels[top-j] = window.color_pixels[top-j];
      pg.pixels[top+j] = window.color_pixels[top+j];
      pg.pixels[bottom-j] = window.color_pixels[bottom-j];
      pg.pixels[bottom+j] = window.color_pixels[bottom+j];   
  }
  }
  pg.updatePixels();
  image(pg, 0, 0);
      
  //create a new random droplet
  if (timer % 15 === 0) {
    var new_x = random(windowWidth);
    var new_y = random(windowHeight);
    var me = new Droplet(new_x, new_y);
    pushToArray(DropletArray, me);
    
  }
  timer ++;
  
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
var max_wid = 200;
var finished = false;
var echos = [];
  
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
    var my_echo = new Echo(x, y, max_wid, false);
    echos.push(my_echo);
  }
  if (curr_wid == 80) {
    var my_echo = new Echo(x, y, max_wid, false);
    echos.push(my_echo);
  }
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