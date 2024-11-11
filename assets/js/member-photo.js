const pages = document.querySelectorAll('.team-photo-page')
const pagingBtns = document.querySelectorAll('.member-pagination ul li')

/**
 * member페이지 로드시마다 호출되는 함수
 */
window.addEventListener('load', () => {
  setPagingEvent()
  setPagingByParam()
  setCardBtns()
  checkContentWidth()
})

/**
 * member페이지 가로 사이즈 변경시마다 호출되는 함수
 */
window.addEventListener('resize', e => {
  checkContentWidth(e)
})

/**
 * 너비 변경을 감지하여 1024 를 기준으로 이벤트를 실행 시키는 함수
 *
 * @param {object} event 페이지 리사이즈 이벤트 정보 객체
 */
function checkContentWidth(event) {
  const targetW = event?.target.innerWidth || document.documentElement.clientWidth
  const imgList = document.querySelectorAll('.team-photo')
  if (targetW < 1024) {
    setPosition(imgList)
  } else {
    resetPosition(imgList)
    runDrag()
  }
}

/**
 * 전달받은 대상의 위치를 부모요소의 가운데에 위치하게 하는 함수
 *
 * @param {Array} targetList 위치를 변경시킬 대상 목록
 */
function setPosition(targetList) {
  targetList.forEach(target => {
    const targetSizeW = target.clientWidth
    const targetSizeH = target.clientHeight
    target.style.top = `calc(50% - ${targetSizeH / 2}px)`
    target.style.left = `calc(50% - ${targetSizeW / 2}px)`
    target.style.transform = `rotate(${Math.floor(Math.random() * 10 + 1)}deg)`
    target.style.zIndex = ''
  })
}

/**
 * 전달받은 대상의 변경된 위치를 초기화 하는 함수
 *
 * @param {Array} targetList 위치를 변경시킬 대상 목록
 */
function resetPosition(targetList) {
  targetList.forEach(target => {
    target.style.top = ''
    target.style.left = ''
    target.style.transform = ''
  })
}

/**
 * 페이징 버튼에 클릭 이벤트를 추가하는 함수
 */
function setPagingEvent() {
  pagingBtns.forEach((btn, index) => {
    btn.addEventListener('click', function () {
      togglePage(index)
      togglePaging(index)
      checkContentWidth()
    })
  })
}

/**
 * 전달받은 순번에 해당하는 페이지만 활성화 처리하는 함수
 *
 * @param {number} index 페이지 순서
 */
function togglePage(index) {
  pages.forEach(page => page.classList.add('hidden'))
  pages[index].classList.remove('hidden')
}

/**
 * 전달받은 순번에 해당하는 페이징만 활성화 처리하는 함수
 *
 * @param {number} index 페이징 순서
 */
function togglePaging(index) {
  const pagingImg = '/assets/images/member/photo-page-'
  pagingBtns.forEach(btn => (btn.querySelector('img').src = pagingImg + 'none.png'))
  pagingBtns[index].querySelector('img').src = pagingImg + (index + 1) + '.png'
}

/**
 * 파라미터에 멤버 번호가 있다면(메인에서 전달) 해당 멤버 갤러리를 보여주는 함수
 */
function setPagingByParam(){
  const urlParams = new URL(location.href).searchParams
  const index = urlParams.get('index') || 0
  pagingBtns[index].click()
}

/**
 * 카드의 레이어 순서를 변경시키는 버튼을 세팅하는 함수
 */
function setCardBtns() {
  document.getElementById('next-btn').addEventListener('click', () => setZindex('next'))
  document.getElementById('prev-btn').addEventListener('click', () => setZindex('prev'))
}

/**
 * 이전/다음 카드를 가장 위에 보이게 처리하는 함수
 *
 * @param {string} direction 이전/다음 여부
 */
function setZindex(direction) {
  const activePage = document.querySelector('.team-photo-page:not(.hidden)')
  const siblingPhotos = activePage.children
  const currSelectPhoto = activePage.querySelector('.team-photo.on') || siblingPhotos[siblingPhotos.length - 1]
  let afterSelectPhoto = null
  if (direction == 'next') {
    afterSelectPhoto = currSelectPhoto.nextElementSibling
    if (!afterSelectPhoto) afterSelectPhoto = siblingPhotos[0]
  } else {
    afterSelectPhoto = currSelectPhoto.previousElementSibling
    if (!afterSelectPhoto) afterSelectPhoto = siblingPhotos[siblingPhotos.length - 1]
  }
  afterSelectPhoto.classList.add('on')
  currSelectPhoto.classList.remove('on')
}

/**
 * 드래그 앤 드롭 액션 함수
 *
 * @param {MouseEvent} e - 최종 실행되는 드래그 앤 드롭 함수
 */
function runDrag() {
  const photoWrap = document.getElementById('photo-wrap')
  let increaseZIndex = 1 // 카드를 쌓아 올리는 듯한 효과를 위한 z-index 변수

  document.querySelectorAll('.team-photo').forEach(contentDragged => {
    // 마우스 시작 좌표 선언, 이동 거리 값 0으로 설정
    let xStart,
      yStart,
      changedValueX = 0,
      changedValueY = 0

    // 카드의 초기 y 좌표를 가져와, 이동 가능한 최하단 y 좌표로 설정
    const initialYPosition = contentDragged.getBoundingClientRect().top + window.scrollY
    const initialXPosition = contentDragged.getBoundingClientRect().left
    const limitYPosition = photoWrap.offsetTop + photoWrap.clientHeight - contentDragged.clientHeight // 각 카드가 도달할 수 있는 최하단 y 좌표
    const limitXPosition = document.documentElement.clientWidth - contentDragged.clientWidth // 각 카드가 도달할 수 있는 최우측 x 좌표

    /**
     * 마우스 이동 거리 계산 함수
     * @param {MouseEvent} e - 마우스 이벤트 객체
     */
    const whenMouseMove = e => {
      changedValueX = e.pageX - xStart
      changedValueY = e.pageY - yStart

      // 카드 y축 범위 제한
      const elementTopPosition = initialYPosition + changedValueY
      if (elementTopPosition <= 0) {
        changedValueY = -initialYPosition
      }
      if (elementTopPosition > limitYPosition) {
        changedValueY = limitYPosition - initialYPosition
      }
      // 카드 x축 범위 제한
      const elementLeftPosition = initialXPosition + changedValueX
      if (elementLeftPosition <= 0) {
        changedValueX = -initialXPosition
      }
      if (elementLeftPosition > limitXPosition) {
        changedValueX = limitXPosition - initialXPosition
      }

      // 계산한 이동 거리를 translateX, Y 각각에 반영
      contentDragged.style.transform = `translate(${changedValueX}px, ${changedValueY}px)`
    }
    /**
     * 마우스 클릭을 멈추면 이벤트 리스너 제거
     */
    const whenMouseUp = () => {
      document.removeEventListener('mouseup', whenMouseUp)
      document.removeEventListener('mousemove', whenMouseMove)
    }

    // 마우스 클릭이 시작되면 마우스 현 위치 파악 및 이동 거리 저장
    contentDragged.addEventListener('mousedown', e => {
      xStart = e.pageX - changedValueX
      yStart = e.pageY - changedValueY
      e.preventDefault() // 브라우저의 마우스 기본 동작 제한
      contentDragged.style.zIndex = increaseZIndex++ // 추가된 두 번째 줄
      document.addEventListener('mousemove', whenMouseMove)
      document.addEventListener('mouseup', whenMouseUp)
    })
  })
}
