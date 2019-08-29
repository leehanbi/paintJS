const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d")
const range = document.getElementById("jsRange")
const colors = document.getElementsByClassName("jsColor");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c"
ctx.lineWidth = 2.5
let painting = false

function stopPainting() {
  painting = false
}

function startPainting() {
  painting = true
}
// 마우스 움직임 캐치
function onMouseMove(event) {
  //path -> moveTo -> lineTo -> Stroke로 그림 
  const x = event.offsetX
  const y = event.offsetY
  if (!painting) {
    // 선의 시작점을 캐치 console.log("create path line " ,x , y)
    ctx.beginPath()
    // x,y 위치로 마우스 위치를 캐치 
    ctx.moveTo(x, y)
  } else {
    // 클릭하면 현재 마우스 위치의 선을 그림 console.log("create line " ,x , y)
    ctx.lineTo(x, y)
    // stroke: 획을 긋는다. 
    ctx.stroke()
  }
}

// 마우스 다운 캐치
function onMouseDown(evnet) {
  painting = true
}

// 마우스 업 캐치
function onMouseUp(evnet) {
  stopPainting()
}

if (canvas) {
  // 마우스 움직임 캐치
  canvas.addEventListener("mousemove", onMouseMove)
  // 마우스 다운 캐치
  canvas.addEventListener("mousedown", startPainting)
  // 마우스 업 캐치
  canvas.addEventListener("mouseup", stopPainting)
  // 마우스 캔버스 아웃  캐치
  canvas.addEventListener("mouseleave", stopPainting)
}
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color
}

Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick))