// 2D アニメーションゲームのようなインタラクション
let x, y;
let vx, vy;
const g = 1/6;
let b

function setup(){
  createCanvas(windowWidth, windowHeight);
  x = width / 2;
  y = height *4/5;
  vx = 0;
  vy = 0
  
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed(){
    if(key == " " && y >= height*7/10){vy = -20;}
 } 

function draw(){
  background(160, 192, 255);
  const size = height * 0.1; // キャラクターのサイズ

  // 地面を描く
  const groundY = height * 0.8;
  fill(64, 192, 64);
  rect(0, groundY, width, height - groundY);

  // BLANK[1] キャラクターの左右移動

 
  if(keyIsDown && key == "a"){b = 10;}
  else{b=5}
  
  if(keyIsDown(LEFT_ARROW)){ x -= b; }
  if(keyIsDown(RIGHT_ARROW)){ x += b; }
  //横も制限？
   x = constrain(x, 0, width);
   y = constrain(y, 0, groundY-size*0.8)

  // BLANK[2] 重力とジャンプ
  

  // 速くなりすぎないように制限
  vx = constrain(vx, -20, 20);
  vy = constrain(vy, -20, 20);

  // 位置を更新
  
  x += vx;
  y += vy;
  vy += g;
 

  

  // キャラクターを描く
  fill(0);
  ellipse(x, y, size, size);
}

 
