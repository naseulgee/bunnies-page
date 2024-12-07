import * as THREE from 'three'
import { OrbitControls } from 'Orbit'
import albumList from '/assets/json/albumList.json' with { type: 'json' }

// 기본 설정
const renderTarget = document.getElementById('album-cover')
const size = {
  width: renderTarget.offsetWidth,
  height: renderTarget.offsetHeight
}
let aspect = size.width / size.height
let scene, camera, renderer, controls
let ambientLight
let geometry, coverMaterials, coverMesh

window.addEventListener('load', () => init())
window.addEventListener('resize', resize)

// [초기화 관련]====================================
/**
 * 3D 객체 초기화 함수
 */
function init() {
  renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setSize(size.width, size.height)
  renderer.setClearColor(0xeeeeee, 0)
  renderTarget.appendChild(renderer.domElement)

  scene = new THREE.Scene()
  scene.fog = new THREE.Fog(0x000000, 40, 70)

  camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000)
  camera.position.set(0, 0, 50)
  camera.lookAt(0, 0, 0)

  controls = new OrbitControls(camera, renderer.domElement)
  controls.dampingFactor = 0.05
  controls.enableDamping = true
  controls.autoRotate = true
  controls.autoRotateSpeed = 5.0

  initLights()
  initMeshs()

  renderer.setAnimationLoop(animate)
}

/**
 * 조명 생성 함수
 */
function initLights() {
  ambientLight = new THREE.AmbientLight(0xffffff, 3) // 주변광 추가
  scene.add(ambientLight)
}

/**
 * 큐브(앨범) 지오메트리와 머티리얼 생성 함수
 */
function initMeshs() {
  geometry = new THREE.BoxGeometry(23.4, 30.9, 4) // 큐브 크기 설정
  coverMaterials = []
  coverMesh = new THREE.Mesh(geometry, coverMaterials)
  scene.add(coverMesh)
}

// [렌더링 관련]====================================
/**
 * 렌더링 애니메이션 루프 함수
 */
function animate() {
  controls.update()
  renderer.render(scene, camera)
}

/**
 * 반응형 처리 함수
 */
function resize() {
  size.width = renderTarget.offsetWidth
  size.height = renderTarget.offsetHeight
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()
  renderer.setPixelRatio(getMaxPixelRatio())
  renderer.setSize(size.width, size.height)
}

/**
 * 최적화를 위한 픽셀 제한 함수
 */
function getMaxPixelRatio() {
  const pixel = window.devicePixelRatio
  const maxPixel = 1
  return pixel > maxPixel ? maxPixel : pixel
}

// [커버 이미지 관련]====================================
/**
 * 전달받은 번호로 앨범 커버를 업데이트 하는 함수
 * (album-playlist 파일의 changeAlbum 함수에서 호출되고 있다)
 *
 * @param {number} index 앨범의 순서
 */
function render3DCover(index) {
  setMeterials(index)

  coverMesh.material.map.needsUpdate = true
  coverMesh.material.needsUpdate = true
}

/**
 * 전달받은 번호로 앨범을 찾아 커버 이미지를 coverMaterials 객체에 세팅하는 함수
 *
 * @param {number} index 앨범의 순서
 */
function setMeterials(index = 0) {
  // 앨범에 따른 이미지 저장 경로 세팅
  const coverFolderNm = albumList[index].coverFolder
  const coverFolder = './assets/images/album/3dTexture/' + coverFolderNm

  // 이미지 불러와서 배열로 생성
  const textureLoader = new THREE.TextureLoader()
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

export { render3DCover }
