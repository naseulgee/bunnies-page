/**
 * 카드 회전 각도를 랜덤하게 세팅하는 함수
 */
function rotateCards() {
  const cards = document.querySelectorAll('.member-card-box li')
  // 카드들 선택
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i]
    // -12 ~ +12 사이 무작위 숫자 선출
    let randomNumber = Math.random()
    randomNumber = randomNumber * 25
    randomNumber = Math.floor(randomNumber)
    // 각도에 무작위 숫자 적용
    let degree = randomNumber - 12
    card.style.transform = 'rotate(' + degree + 'deg)'
  }
}
