
$(document).ready(function() {

  function setup() {
    var canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('bg-image');
    canvas.id("spots");
  }

  var x;
  var r = 255;
  var g = 215;
  var b = 0;
  var timer;

  function draw() {
    // fill(255, 10); // semi-transparent white rectange for fade! https://amnonp5.wordpress.com/2012/01/28/25-life-saving-tips-for-processing/
    // rect(0, 0, width, height);

    fill(r, g, b);
    strokeWeight(0);
    ellipse(mouseX, mouseY, 80, 80);
    this.lifespan--;
    // triangle(mouseX+200, mouseY+150, mouseX+250, mouseY+25, mouseX+310, mouseY+150);
  }
  function mouseMoved() {
    r = random(200, 255);
    g = random(175, 255);
    b = random(0, 0);
    // draw();
    // fill(r, g, b);
  }


}); // closing $(document).ready
