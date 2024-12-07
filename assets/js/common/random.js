/**
 * 랜덤 정수형을 반환
 *
 * @param {number} max 최대값
 * @param {number} min 최소값
 * @returns 랜덤 정수값 반환(최댓값, 최솟값 포함)
 */
function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export { getRandomInt }
