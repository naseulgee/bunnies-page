import { getRandomInt } from '../common/random.js'

window.addEventListener('load', () => rotateCards())

function rotateCards() {
  const cards = document.querySelectorAll('.member-card-box li')
  for (const card of cards) {
    let degree = getRandomInt(12, -12)
    card.style.transform = 'rotate(' + degree + 'deg)'
  }
}
