import albumList from '../../json/albumList.json' with { type: 'json' }

//모달
const modal = document.getElementById('modal')
const closeModalBtn = document.getElementById('closeModalBtn')
const modalBg = document.getElementById('modal-background')
const cdImgFolder = './assets/images/album/album_img/'

window.addEventListener('load', () => {
  setAlbumIconList()
  modalBg.addEventListener('click', () => closeModal())
  closeModalBtn.addEventListener('click', () => closeModal())
})

/**
 * 앨범 아이콘 목록 세팅 함수
 */
function setAlbumIconList() {
  const albumIconWrap = document.getElementById('album-icon-warp')
  if (albumIconWrap.hasChildNodes()) albumIconWrap.replaceChildren()

  albumList.forEach((album, index) => {
    const btn = document.createElement('button')
    btn.type = 'button'
    btn.className =
      'w-32 break-all rounded-md bg-opacity-30 p-2 transition duration-200 hover:bg-white hover:bg-opacity-30'
    btn.onclick = () => openModal(index)

    const img = document.createElement('img')
    img.src = cdImgFolder + album.cdImg
    img.alt = album.name
    img.className = 'mx-auto my-2 aspect-square w-4/5 shadow-md shadow-zinc-700'

    const p = document.createElement('p')
    p.className =
      'w-full text-center text-lg font-bold text-white shadow-black [text-shadow:_1px_1px_0_var(--tw-shadow-color)]'
    p.textContent = album.name

    btn.append(img)
    btn.append(p)
    albumIconWrap.appendChild(btn)
  })
}

/**
 * 모달 열기 함수
 *
 * @param {number} index 앨범 배열의 순서
 */
function openModal(index) {
  setModalAlbumInfo(index)
  changeIconActiveEffect(index)
  modal.classList.remove('hidden')
  modalBg.classList.remove('hidden')
}

/**
 * 모달 닫기 함수
 */
function closeModal() {
  modal.classList.add('hidden')
  modalBg.classList.add('hidden')
  changeIconActiveEffect()
}

/**
 * 모달창의 앨범 정보 세팅 함수
 *
 * @param {number} index 앨범 배열의 순서
 */
function setModalAlbumInfo(index) {
  const album = albumList[index]
  let ihtml = ''
  album.playlist.forEach(music => {
    ihtml += `
      <span>${music.name}</span>
      <span>${music.time}</span>
    `
  })
  document.getElementById('album-name').innerText = album.name
  document.getElementById('album-name-bar').innerText = album.name
  document.getElementById('album-img').src = cdImgFolder + album.cdImg
  document.getElementById('album-img').closest('a').href = '/album.html?index=' + index
  document.getElementById('release').innerText = album.release
  document.getElementById('playlist-wrap').innerHTML = ihtml
  document.getElementById('melon').href = album.musicServices.melon
  document.getElementById('flo').href = album.musicServices.flo
  document.getElementById('genie').href = album.musicServices.genie
  document.getElementById('album-page').href = '/album.html?index=' + index
  document.getElementById('cd-hover').style.backgroundColor = album.color.bgColor
  document.getElementById('cd-hole').style.backgroundColor = album.color.bgColor
  modal.style.backgroundColor = album.color.bgColor
  modal.style.color = album.color.fontColor
}

/**
 * 앨범 아이콘을 클릭하여 모달이 생겼을 때,
 * 클릭했던 아이콘에 호버와 같은 효과(하얀 테두리)를 주기 위한 함수
 *
 * @param {number} index 앨범 배열의 순서
 */
function changeIconActiveEffect(index) {
  const iconList = document.querySelectorAll('#album-icon-warp button')
  iconList.forEach(icon => (icon.style.backgroundColor = ''))
  if (index != null) iconList[index].style.backgroundColor = 'rgb(255 255 255 / var(--tw-bg-opacity))'
}
