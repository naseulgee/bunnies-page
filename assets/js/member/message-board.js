import { getRandomInt } from '../common/random.js'

const messageBtn = document.getElementById('message')
const messageWrap = document.getElementById('message-wrap-list')

window.addEventListener('load', () => {
  messageBtn.addEventListener('keypress', e => messageInit(e))
})
/**
 * 메세지 입력 받아서 텍스트 저장
 *
 * @param {string} e 메세지창에 입력되는 키보드 값
 */
function messageInit(e) {
  if (e.code == 'Enter') {
    if (messageBtn.value == '') {
      alert('메세지를 입력해주세요')
      return
    }
    const newMessage = messageBtn.value
    messageBtn.value = ''

    makeMessageDom(newMessage) //새로운 메세지 element 생성
    limitMaxMessage(10) //메세지의 총 개수 조절
  }
}
/**
 * 메세지가 일정개수를 초과하면 첫번째 메세지를 삭제
 */
function limitMaxMessage(n) {
  let messageListLength = messageWrap.querySelectorAll('li').length
  if (messageListLength > n) {
    messageWrap.removeChild(messageWrap.firstElementChild)
  }
}

/**
 * 새로운 element에 입력된 텍스트를 담아 html에 추가
 *
 * @param {string} str 메세지창에서 입력받은 텍스트
 */
function makeMessageDom(str) {
  let messageObj = {
    //메세지를 담아둘 객체 생성
    message: str,
    topValue: getRandomInt(85),
    leftValue: getRandomInt(100),
    rightValue: getRandomInt(50),
    colorValue: getColor()
  }
  messageWrap.appendChild(addStyleMessage(messageObj)) //랜덤 값 설정하여 html에 삽입
  storedArr.push(messageObj)
  localStorage.setItem('messageObjArr', JSON.stringify(storedArr))
  initOpacity() //opacity값은 node순서에 따라 지정
}

let storedArr = [] //localStorage를 저장할 배열 선언

/**
 * 페이지 로드될때마다 로컬스토리지에 담긴 메세지들을 html에 추가
 */
window.addEventListener('load', event => {
  if (localStorage.getItem('messageObjArr')) {
    storedArr = JSON.parse(localStorage.getItem('messageObjArr'))
    for (let i = 0; i < storedArr.length; i++) {
      messageWrap.appendChild(addStyleMessage(storedArr[i]))
    }
    initOpacity()
  }
})

/**
 * 자식 순서에 따른 opacity값 추가(동적)
 */
function initOpacity() {
  let messageList = messageWrap.querySelectorAll('li')
  let messageListArr = Array.from(messageList)
  for (let i = 0; i < messageListArr.length; i++) {
    messageListArr[i].style.opacity = `${i * 0.05 + 0.3}`
  }
}

/**
 * 메세지 꾸밈값 랜덤 적용
 *
 * @param {element} element 대상 요소
 */
function addStyleMessage(element) {
  let newLi = document.createElement('li')
  newLi.appendChild(document.createTextNode(element.message))
  if (element.leftValue > 50) {
    newLi.setAttribute(
      'class',
      `absolute inline-block rounded-full px-5 py-3 right-[${element.rightValue}%] top-[${element.topValue}%] bg-[${element.colorValue}]`
    )
  } else {
    newLi.setAttribute(
      'class',
      `absolute inline-block rounded-full px-5 py-3 left-[${element.leftValue}%] top-[${element.topValue}%] bg-[${element.colorValue}]`
    )
  }
  return newLi
}

/**
 * 클래스명에 적용할 tailwindcss 배경색 설정
 *
 * @returns 컬러 배열에서 랜덤인덱스를 통해 설정된 색상
 */
function getColor() {
  let maxIndex = colorPalette.length - 1
  return colorPalette[getRandomInt(maxIndex)]
}

//메세지 배경색 종류
const colorPalette = [
  '#173f5f',
  '#20639b',
  '#3caea3',
  '#f6d55c',
  '#ed553b',
  '#ef6c00',
  '#ffa726',
  '#cfd8dc',
  '#26a69a',
  '#2e7d32',
  '#ede7f6',
  '#b39ddb',
  '#7e57c2',
  '#512da8',
  '#35f3ff',
  '#00838f',
  '#26a69a',
  '#e1f5fe',
  '#42a5f5',
  '#1565c0'
]
