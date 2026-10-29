let walkingSprite; // 儲存走路動畫的四格精靈圖。
let alternateSprite; // 儲存按下右方向鍵時使用的三格精靈圖。
let backgroundColor; // 儲存畫布隨機決定的背景顏色。
let characterX; // 儲存角色目前的水平位置。
const walkingFrameCount = 4; // 設定走路精靈圖的動畫格數。
const alternateFrameCount = 3; // 設定替代精靈圖的動畫格數。
const animationSpeed = 8; // 設定每格動畫持續的畫面數。
const displayScale = 3; // 設定角色相對於原始單格尺寸的放大倍率。
const movementSpeed = 5; // 設定角色每個畫面移動的像素數。

function preload() { // 在畫布啟動前載入兩張精靈圖。
  walkingSprite = loadImage("1/走路0005.png"); // 載入預設循環播放的走路精靈圖。
  alternateSprite = loadImage("1/123.png"); // 載入按住右方向鍵時播放的精靈圖。
} // 結束素材載入函式。

function setup() { // 設定全螢幕畫布與初始背景。
  createCanvas(windowWidth, windowHeight); // 建立符合瀏覽器視窗大小的畫布。
  backgroundColor = color(random(256), random(256), random(256)); // 隨機產生一次背景顏色。
  characterX = width / 2; // 將角色初始位置設在畫布水平中央。
  imageMode(CENTER); // 讓角色的位置以圖片中心點作為基準。
  frameRate(60); // 設定畫布每秒更新六十次。
} // 結束畫布設定函式。

function draw() { // 每個畫面更新時繪製背景與角色動畫。
  background(backgroundColor); // 使用設定好的隨機顏色清除上一個畫面。
  const isMovingRight = keyIsDown(RIGHT_ARROW); // 判斷是否正按住鍵盤右方向鍵。
  const isMovingLeft = keyIsDown(LEFT_ARROW); // 判斷是否正按住鍵盤左方向鍵。
  const isAlternate = isMovingRight; // 按住右方向鍵時切換到替代精靈圖。
  const isFacingLeft = isMovingLeft && !isMovingRight; // 只有往左移動時才讓角色面向左側。
  const currentSprite = isAlternate ? alternateSprite : walkingSprite; // 依方向鍵狀態選擇精靈圖。
  const currentFrameCount = isAlternate ? alternateFrameCount : walkingFrameCount; // 依精靈圖選擇格數。
  const frameWidth = currentSprite.width / currentFrameCount; // 計算精靈圖中每一格的實際寬度。
  const currentFrame = floor(frameCount / animationSpeed) % currentFrameCount; // 依設定速度循環切換動畫格。
  const sourceX = currentFrame * frameWidth; // 計算目前動畫格在精靈圖中的水平位置。
  const displayWidth = frameWidth * displayScale; // 計算角色顯示時的放大寬度。
  const displayHeight = currentSprite.height * displayScale; // 計算角色顯示時的放大高度。
  if (isMovingRight && !isMovingLeft) { // 確認角色只往右移動。
    characterX += movementSpeed; // 持續將角色向右移動。
  } else if (isMovingLeft && !isMovingRight) { // 確認角色只往左移動。
    characterX -= movementSpeed; // 持續將角色向左移動。
  } // 結束角色水平移動判斷。
  const horizontalLimit = min(displayWidth / 2, width / 2); // 計算角色不超出畫布的水平邊界。
  characterX = constrain(characterX, horizontalLimit, width - horizontalLimit); // 將角色限制在畫布左右邊界內。
  push(); // 暫存畫布狀態，避免角色的變形影響其他繪製。
  translate(characterX, height / 2); // 將繪製位置移到角色目前所在位置。
  scale(isFacingLeft ? -1 : 1, 1); // 向左移動時水平翻轉角色，讓角色面向移動方向。
  image( // 繪製目前動畫格並放大顯示角色。
    currentSprite, // 指定要顯示的精靈圖。
    0, // 將角色繪製在目前位置的水平中心。
    0, // 將角色繪製在畫布垂直中心。
    displayWidth, // 設定角色在畫布上的顯示寬度。
    displayHeight, // 設定角色在畫布上的顯示高度。
    sourceX, // 指定從精靈圖的目前動畫格開始取圖。
    0, // 指定從精靈圖的最上方開始取圖。
    frameWidth, // 指定只取目前動畫格的寬度。
    currentSprite.height // 指定取用精靈圖的完整高度。
  ); // 結束目前動畫格的繪製。
  pop(); // 還原畫布狀態，讓翻轉只作用在角色上。
} // 結束每畫面繪製函式。

function windowResized() { // 瀏覽器視窗尺寸改變時重新調整畫布。
  resizeCanvas(windowWidth, windowHeight); // 讓畫布持續填滿整個瀏覽器視窗。
} // 結束視窗尺寸調整函式。

function keyPressed() { // 接收鍵盤按鍵並避免方向鍵捲動網頁。
  if (keyCode === RIGHT_ARROW || keyCode === LEFT_ARROW) { // 確認使用者按下任一方向鍵。
    return false; // 阻止瀏覽器因方向鍵而捲動頁面。
  } // 結束方向鍵判斷。
  return true; // 讓其他按鍵維持瀏覽器預設行為。
} // 結束鍵盤按鍵處理函式。
