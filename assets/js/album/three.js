// 기본 설정
const renderTarget = document.getElementById('album-cover')
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, renderTarget.clientWidth / renderTarget.clientHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ antialias: true })

// 조명 추가
const ambientLight = new THREE.AmbientLight(0x404040, 1) // 주변광 추가
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1) // 방향광 추가
directionalLight.position.set(10, 10, 10).normalize() // 방향광 위치 설정
scene.add(directionalLight)

// 렌더링 설정
renderer.setSize(renderTarget.clientWidth, renderTarget.clientHeight)
renderer.setClearColor(0xeeeeee, 0)
renderTarget.appendChild(renderer.domElement)

// 카메라 위치 설정
camera.position.z = 50

// 텍스처 로더를 사용하여 이미지 텍스처 로드
const textureLoader = new THREE.TextureLoader()

// OrbitControls 설정
const controls = new THREE.OrbitControls(camera, renderer.domElement)
controls.enableZoom = false // 스크롤 줌 비활성화
controls.autoRotate = true // 자동 회전 활성화
controls.autoRotateSpeed = 5.0 // 자동 회전 속도

// 큐브(앨범) 지오메트리와 머티리얼 생성
const geometry = new THREE.BoxGeometry(23.4, 30.9, 4) // 큐브 크기 설정
const coverMaterials = []
const cube = new THREE.Mesh(geometry, coverMaterials)
scene.add(cube)

// [커버 이미지 관련]====================================
/**
 * 전달받은 번호로 앨범 커버를 업데이트 하는 함수
 * (album-playlist 파일의 changeAlbum 함수에서 호출되고 있다)
 *
 * @param {number} index 앨범의 순서
 */
function render3DCover(index) {
  setMeterials(index)

  cube.material.map.needsUpdate = true
  cube.material.needsUpdate = true
}

/**
 * 전달받은 번호로 앨범을 찾아 커버 이미지를 coverMaterials 객체에 세팅하는 함수
 *
 * @param {number} index 앨범의 순서
 */
function setMeterials(index = 0) {
  // 앨범에 따른 이미지 저장 경로 세팅
  const coverFolderNm = albumList[index].coverFolder
  const coverFolder = '/assets/images/album/3dTexture/' + coverFolderNm
  // 이미지 불러와서 배열로 생성
  const textureList = [
    textureLoader.load(coverFolder + '/right.png'),
    textureLoader.load(coverFolder + '/left.png'),
    textureLoader.load(coverFolder + '/top.png'),
    textureLoader.load(coverFolder + '/bottom.png'),
    textureLoader.load(coverFolder + '/front.png'),
    textureLoader.load(coverFolder + '/back.png')
  ]
  // coverMaterials 객체에 할당
  if (coverMaterials.length == 0) {
    // 처음 세팅일 경우
    textureList.forEach((texture, i) => {
      coverMaterials[i] = new THREE.MeshStandardMaterial({ map: texture })
    })
  } else {
    // 앨범 이동으로 인한 세팅일 경우
    textureList.forEach((texture, i) => {
      coverMaterials[i].map = texture
    })
  }
}

// [렌더링 관련]====================================
// 반응형 처리
window.addEventListener('resize', () => {
  camera.aspect = renderTarget.clientWidth / renderTarget.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(renderTarget.clientWidth, renderTarget.clientHeight)
})

/**
 * 렌더링 애니메이션 루프 함수
 */
function animate() {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
animate() // 렌더링 시작
