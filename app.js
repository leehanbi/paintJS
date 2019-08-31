const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d")
const range = document.getElementById("jsRange")
const colors = document.getElementsByClassName("jsColor");
const mode = document.getElementById("jsMode")
const savaBtn = document.getElementById("jsSave")
const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700

function init() {
  canvas.width = CANVAS_SIZE
  canvas.height = CANVAS_SIZE
  ctx.fillStyle = "white"
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.strokeStyle = INITIAL_COLOR
  ctx.fillStlye = INITIAL_COLOR
  ctx.lineWidth = 2.5

}


let painting = false
let filling = false

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
// 붓 범위 체인지핸들 
function handleRangeChange(event) {
  const size = event.target.value
  ctx.lineWidth = size
}

// 모드 체인지핸들 
function handleModeChange(event) {
  if (filling === true) {
    filling = false
    mode.innerText = "Fill"
  } else {
    filling = true
    mode.innerText = "paint"
  }
}
// 캔버스 클릭핸들 
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }
}
// 우클릭 핸들 
function handleCM(event) {
  // 우클릭 방지
  event.preventDefault()
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
  // 마우스 캔버스 아웃  캐치
  canvas.addEventListener("click", handleCanvasClick)
  // 오른쪽 클릭 이벤트 
  canvas.addEventListener("contextmenu", handleCM)
}

// 컬러체인지 핸들 
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

// 다운로드 기능핸들
function handleSaveClick() {
  // DownloadURL
  const downloadURL = canvas.toDataURL()
  const downloadLink = document.createElement("a")
  const FILE_NAME = "PaintJs[EXPORT]"
  downloadLink.href = downloadURL
  downloadLink.download = FILE_NAME
  downloadLink.click()
}
// 붓 범위 이벤트 
if (range) {
  range.addEventListener("input", handleRangeChange)
}
// 모드버튼 클릭이벤트 
if (mode) {
  mode.addEventListener("click", handleModeChange)
}
// 저장버튼 클릭이벤트 
if (savaBtn) {
  savaBtn.addEventListener("click", handleSaveClick)
}
// 컬러 선택 
Array.from(colors).forEach(color =>
  color.addEventListener("click", handleColorClick))
// 초기설정 
init() 