function setup() {
  createCanvas(600, 400);
}

let ropex;  
let ropey = 250; 
let winline = 140;//どれだけ引っ張ったら即勝利になるか
let pullpower = 12;// 1回のキー連打で引っ張る距離
let timelimit = 10;// 制限時間（秒）
let starttime;
let state = "start";//start, play, resultの3つの状態を作る
let winner;

function draw() {
  // 空
  background(155, 205, 255); 
  // 芝生の地面
  noStroke();
  fill(120, 190, 100); 
  rect(0, 280, width, 120);
  // 中央線（白）
  stroke(255);
  strokeWeight(3);
  line(width / 2, 230, width / 2, 330);
  // 左右の勝利ライン（赤）
  stroke(230, 50, 50);
  strokeWeight(3);
  line(width / 2 - winline, 230, width / 2 - winline, 330);
  line(width / 2 + winline, 230, width / 2 + winline, 330);            // 地面と勝利ラインを描く
 // 綱
  stroke(160, 110, 60);
  strokeWeight(8);
  line(ropex - 240, ropey, ropex + 240, ropey);
  //綱の中心の赤いリボン
  noStroke();
  fill(230, 40, 40);
  rect(ropex - 5, ropey - 4, 10, 24);
  //青チーム
  for (let i = 0; i < 5; i++) {
    let x = ropex - 50 - i * 38;
    draw_person(x, ropey, 40, 110, 235);
  }
  //赤チーム
  for (let i = 0; i < 5; i++) {
    let x = ropex + 50 + i * 38;
    draw_person(x, ropey, 235, 60, 60);
  }

  if (state == "start") 
  {ropex = width/2;
    draw_start();
  } 
  else if (state == "play") 
  {// 一定のラインまで引っ張ったかの判定（一本勝ち）
    if (ropex <= width / 2 - winline) {
      winner = "ライン突破！青チームの勝ち！";
      state = "result";
    } else if (ropex >= width / 2 + winline) {
      winner = "ライン突破！赤チームの勝ち！";
      state = "result";
    }
    // 制限時間の計算と時間切れ判定
    let elapsed = (millis() - starttime) / 1000;
    let remaining = max(0, timelimit - elapsed);

    if (remaining == 0 && state == "play") {
      if (ropex < width / 2) {
        winner = "タイムアップ！青チームの勝ち！";
      } else if (ropex > width / 2) {
        winner = "タイムアップ！赤チームの勝ち！";
      } else {
        winner = "タイムアップ！引き分け！";
      }
      state = "result";
    } else {
      draw_timer(remaining);
    }
  } 
  else if (state == "result") { 
    draw_result();
  }
}

function keyReleased() {
  if (state == "start") 
  {if (key == " ")
    {ropex = width / 2;
      starttime = millis();
      state = "play";;
    }
  } 
  else if (state == "play")
  {// 青チーム（左）は A キーで左へ引っ張る
    if (key == "a" || key == "A") 
    {ropex -= pullpower;
    } 
    // 赤チーム（右）は L キーで右へ引っ張る
    if (key == "l" || key == "L") 
    {ropex += pullpower;
    }
  } 
  else if (state == "result")
  {if (key == "r" || key == "R") {
      state = "start";
    }
  }
}

// 1人分の人間（四角い体＋丸い頭）を描く自作関数
function draw_person(x, ropey, r, g, b) {
  noStroke();
  // 体（四角形）
  fill(r, g, b);
  rect(x - 11, ropey - 5, 22, 34);

  // 頭（丸）
  fill(255, 220, 185);
  ellipse(x, ropey - 15, 20);
}

function draw_start() {
  noStroke();
  fill(40);
  textAlign(CENTER, CENTER);

  textSize(32);
  text("綱引きバトル", width / 2, 75);

  textSize(16);
  fill(40, 110, 235);
  text("青チーム（左）： A キー連打", width / 2 - 130, 125);
  fill(235, 60, 60);
  text("赤チーム（右）： L キー連打", width / 2 + 130, 125);

  fill(40);
  textSize(18);
  text("赤いラインまで引くか、10秒後に有利な方の勝ち！", width / 2, 165);

  textSize(20);
  text("スペースキーでスタート", width / 2, 200);
}

function draw_timer(remaining) {
  noStroke();
  fill(0, 150);
  rect(width / 2 - 80, 10, 160, 36);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(20);
  text("残り: " + remaining.toFixed(1) + " 秒", width / 2, 28);
}

function draw_result() {
  noStroke();
  fill(0, 190);
  rect(width / 2 - 220, height / 2 - 95, 440, 130);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(22);
  text(winner, width / 2, height / 2 - 45);

  textSize(15);
  text("Rキーでタイトルに戻る", width / 2, height / 2 + 5);
}