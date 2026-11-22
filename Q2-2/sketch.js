// チェッカー
function setup() {
  createCanvas(200, 200);

  const size = width / 8; // マスの一辺の長さ
  const size2 = size / 2;
  const size3 = size *0.9;

  for(let i = 0; i < 8; i++){
    for(let j = 0; j < 8; j++){
      // BLANK[1] ヒント： rectのx座標は size * i, y座標は size * j
    if((i + j) % 2 == 1){
    fill(125);
     } else {fill(250)}
    noStroke();
    rect(size*i, size*j, size);

    if((i+j)%2==1 && j<3){
    fill(250,0,0); //赤丸の位置指定
    ellipse(size*i+size2, size*j+size2, size3); }
     //(中心の横/縦座標、直径)

    if((i + j) % 2 == 1 && j > 4){
    fill(0); //黒丸
    ellipse(size * i + size2, size * j + size2, size3, size3); }

    }}
  }
