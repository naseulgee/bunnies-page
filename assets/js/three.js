// 기본 설정
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ antialias: true })

// 조명 추가
const ambientLight = new THREE.AmbientLight(0x404040, 1) // 주변광 추가
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1) // 방향광 추가
directionalLight.position.set(10, 10, 10).normalize() // 방향광 위치 설정
scene.add(directionalLight)

// 렌더링 설정
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor(0xeeeeee, 0)
document.body.appendChild(renderer.domElement)

// 텍스처 로더를 사용하여 이미지 텍스처 로드
const textureLoader = new THREE.TextureLoader()

const newjeans_texture_front = textureLoader.load('./assets/images/album/3dTexture/newjeans/front.png')
const newjeans_texture_back = textureLoader.load('./assets/images/album/3dTexture/newjeans/back.png')
const newjeans_texture_top = textureLoader.load('./assets/images/album/3dTexture/newjeans/top.png')
const newjeans_texture_bottom = textureLoader.load('./assets/images/album/3dTexture/newjeans/bottom.png')
const newjeans_texture_left = textureLoader.load('./assets/images/album/3dTexture/newjeans/left.png')
const newjeans_texture_right = textureLoader.load('./assets/images/album/3dTexture/newjeans/right.png')

const omgditto_texture_front = textureLoader.load('./assets/images/album/3dTexture/omg&ditto/front.png')
const omgditto_texture_back = textureLoader.load('./assets/images/album/3dTexture/omg&ditto/back.png')
const omgditto_texture_top = textureLoader.load('./assets/images/album/3dTexture/omg&ditto/top.png')
const omgditto_texture_bottom = textureLoader.load('./assets/images/album/3dTexture/omg&ditto/bottom.png')
const omgditto_texture_left = textureLoader.load('./assets/images/album/3dTexture/omg&ditto/left.png')
const omgditto_texture_right = textureLoader.load('./assets/images/album/3dTexture/omg&ditto/right.png')

const getup_texture_front = textureLoader.load('./assets/images/album/3dTexture/getup/front.png')
const getup_texture_back = textureLoader.load('./assets/images/album/3dTexture/getup/back.png')
const getup_texture_top = textureLoader.load('./assets/images/album/3dTexture/getup/top.png')
const getup_texture_bottom = textureLoader.load('./assets/images/album/3dTexture/getup/bottom.png')
const getup_texture_left = textureLoader.load('./assets/images/album/3dTexture/getup/left.png')
const getup_texture_right = textureLoader.load('./assets/images/album/3dTexture/getup/right.png')

const howsweet_texture_front = textureLoader.load('./assets/images/album/3dTexture/howSweet/front.png')
const howsweet_texture_back = textureLoader.load('./assets/images/album/3dTexture/howSweet/back.png')
const howsweet_texture_top = textureLoader.load('./assets/images/album/3dTexture/howSweet/top.png')
const howsweet_texture_bottom = textureLoader.load('./assets/images/album/3dTexture/howSweet/bottom.png')
const howsweet_texture_left = textureLoader.load('./assets/images/album/3dTexture/howSweet/left.png')
const howsweet_texture_right = textureLoader.load('./assets/images/album/3dTexture/howSweet/right.png')

const supernatural_texture_front = textureLoader.load('./assets/images/album/3dTexture/supernatural/front.png')
const supernatural_texture_back = textureLoader.load('./assets/images/album/3dTexture/supernatural/back.png')
const supernatural_texture_top = textureLoader.load('./assets/images/album/3dTexture/supernatural/top.png')
const supernatural_texture_bottom = textureLoader.load('./assets/images/album/3dTexture/supernatural/bottom.png')
const supernatural_texture_left = textureLoader.load('./assets/images/album/3dTexture/supernatural/left.png')
const supernatural_texture_right = textureLoader.load('./assets/images/album/3dTexture/supernatural/right.png')

// 큐브 지오메트리와 머티리얼 생성
// 큐브 지오메트리와 머티리얼 생성
const geometry = new THREE.BoxGeometry(23.4, 30.9, 4) // 큐브 크기 설정
let albumCover = ('newjeansMaterials', 'omgdittoMaterials')
const newjeansMaterials = [
  new THREE.MeshStandardMaterial({ map: newjeans_texture_right }),
  new THREE.MeshStandardMaterial({ map: newjeans_texture_left }),
  new THREE.MeshStandardMaterial({ map: newjeans_texture_top }),
  new THREE.MeshStandardMaterial({ map: newjeans_texture_bottom }),
  new THREE.MeshStandardMaterial({ map: newjeans_texture_front }),
  new THREE.MeshStandardMaterial({ map: newjeans_texture_back })
]
const omgdittoMaterials = [
  new THREE.MeshStandardMaterial({ map: omgditto_texture_right }),
  new THREE.MeshStandardMaterial({ map: omgditto_texture_left }),
  new THREE.MeshStandardMaterial({ map: omgditto_texture_top }),
  new THREE.MeshStandardMaterial({ map: omgditto_texture_bottom }),
  new THREE.MeshStandardMaterial({ map: omgditto_texture_front }),
  new THREE.MeshStandardMaterial({ map: omgditto_texture_back })
]
const getUpMaterials = [
  new THREE.MeshStandardMaterial({ map: getup_texture_right }),
  new THREE.MeshStandardMaterial({ map: getup_texture_left }),
  new THREE.MeshStandardMaterial({ map: getup_texture_top }),
  new THREE.MeshStandardMaterial({ map: getup_texture_bottom }),
  new THREE.MeshStandardMaterial({ map: getup_texture_front }),
  new THREE.MeshStandardMaterial({ map: getup_texture_back })
]
const howSweetMaterials = [
  new THREE.MeshStandardMaterial({ map: howsweet_texture_right }),
  new THREE.MeshStandardMaterial({ map: howsweet_texture_left }),
  new THREE.MeshStandardMaterial({ map: howsweet_texture_top }),
  new THREE.MeshStandardMaterial({ map: howsweet_texture_bottom }),
  new THREE.MeshStandardMaterial({ map: howsweet_texture_front }),
  new THREE.MeshStandardMaterial({ map: howsweet_texture_back })
]
const supernaturalMaterials = [
  new THREE.MeshStandardMaterial({ map: supernatural_texture_right }),
  new THREE.MeshStandardMaterial({ map: supernatural_texture_left }),
  new THREE.MeshStandardMaterial({ map: supernatural_texture_top }),
  new THREE.MeshStandardMaterial({ map: supernatural_texture_bottom }),
  new THREE.MeshStandardMaterial({ map: supernatural_texture_front }),
  new THREE.MeshStandardMaterial({ map: supernatural_texture_back })
]
function render3DCover(nowAlbumIndex) {
  const texture = new THREE.TextureLoader().load(albumList[nowAlbumIndex].cover)
  coverMesh.material.map = texture
  coverMesh.material.needsUpdate = true // 텍스처 업데이트
}

const cube = new THREE.Mesh(geometry, render3DCover.texture)
scene.add(cube)

// 카메라 위치 설정
camera.position.z = 50

// 마우스 관련 변수
const mouse = new THREE.Vector2()
let isDragging = false // 드래그 상태 여부
let startRotationX = cube.rotation.x // 시작할 때의 x축 회전값
let startRotationY = cube.rotation.y // 시작할 때의 y축 회전값

// 마우스 이동 이벤트
function onDocumentMouseMove(event) {
  event.preventDefault()

  // 드래그 중일 때만 회전
  if (isDragging) {
    // 마우스 위치를 -1 ~ 1 범위로 변환 해서 왼쪽,오른쪽 아래 위를 구분함
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

    // 기본 회전값에 마우스 이동에 따른 회전을 덧붙임 (매끄러운 회전)
    cube.rotation.x = startRotationX + mouse.y * Math.PI * 0.9 // 회전 속도 조절
    cube.rotation.y = startRotationY + mouse.x * Math.PI * 0.9
  }
}

// 마우스 클릭 이벤트 (드래그 시작 시 호출)
function onDocumentMouseDown(event) {
  event.preventDefault()
  isDragging = true // 드래그 상태 시작

  startRotationX = cube.rotation.x // 클릭 시 현재 회전값 저장
  startRotationY = cube.rotation.y
}

// 마우스 버튼 떼기 이벤트 (드래그 종료 시 호출)
function onDocumentMouseUp(event) {
  event.preventDefault()
  isDragging = false // 드래그 상태 종료
}

// 애니메이션 루프
function animate() {
  requestAnimationFrame(animate)

  if (isDragging == false) {
    //만약 드래그 상태 종료시
    cube.rotation.y += 0.01 // 자동 회전 실행
  }
  renderer.render(scene, camera)
}

// 이벤트 리스너 추가
window.addEventListener('mousemove', onDocumentMouseMove, false)
window.addEventListener('mousedown', onDocumentMouseDown, false)
window.addEventListener('mouseup', onDocumentMouseUp, false)

// 반응형 처리
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// 렌더링 시작
animate()
