const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d")
const range = document.getElementById("jsRange")

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
  const x = event.offsetX
  const y = event.offsetY
  if (!painting) {
    // 선의 시작점을 캐치
    ctx.beginPath()
    ctx.moveTo(x, y)
  } else {
    ctx.lineTo(x, y)
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

Array.from(colors).array.forEach(colors => {
  colors.addEventListener("click", handleColorClick)
})
