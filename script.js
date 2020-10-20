// Ranges
const $amperRange = document.querySelector('.ampermetr__range')
const $voltRange = document.querySelector('.voltmetr__range')
const $valueRange = document.querySelector('.voltmetr-setings__range')
const $distRange = document.querySelector('.ruler-range')
// Fields
const $amperValue = document.querySelector('.ampermetr__value')
const $voltValue = document.querySelector('.voltmetr__value')
const $distValue = document.querySelector('.dist-info__value')
// Elements
const $curtain = document.querySelector('.curtain-setings__check')
const $curtainText = document.querySelector('.curtain-setings__title')
const $priemnik = document.querySelector('.priemnik')
const $lamp = document.querySelector('.installation__lamp')
const $cap = document.querySelector('.cap')
// Sidebar
const menuBtn = document.querySelector('.sidebar__btn')
const sidebar = document.querySelector('.sidebar')
const btnText = document.querySelector('.sidebar__open')
// Sidebar photo
const sidebarPhotos = document.querySelectorAll('.s-photo')

// Sidebar

// Добавление события открытия фото
sidebarPhotos.forEach(photo => photo.addEventListener('click', (event) => {
  const path = event.target.getAttribute('src')
  const alt = event.target.getAttribute('alt')

  const backWindow = document.createElement('div')
  backWindow.classList.add('back-window-photo')
  backWindow.dataset.close = 'close'
  const templateBigPhoto = `<img src="${path}" alt="${alt}" class="big-Photo">`

  backWindow.insertAdjacentHTML('afterbegin', templateBigPhoto)
  document.querySelector('main').insertAdjacentElement('afterbegin', backWindow)

  // Добавление события закрытия фото
  backWindow.addEventListener('click', event => {
    if (event.target.dataset.close === 'close') {
      document.querySelector('.back-window-photo').remove()
    }
  })
}))

// Событие открытия / закрытия меню
menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle("close-s")

  if (btnText.textContent === `open ${String.fromCharCode(10148)}`) {
    btnText.textContent = String.fromCharCode(60)
  } else {
    btnText.textContent = `open ${String.fromCharCode(10148)}`
  }
})

// Instrument configuration
const J = 25
const S = 96

let E = 0
let I = 0
let It = 0
let If = 0
let U = 0

function calc(U, E, r) {
  let G
  +r < 11 ? G = 0.035 * 0.7 * r : G = 0.035 * 0.8 * r
  It = U * 3.756
  If = S * G * E * U
  $curtain.checked ? I = It : I = It + If
  const dist = +$distValue.value.split(' ')[0]
  if (I > 100) {
    $amperValue.value = ''
    $amperRange.value = 100
  } else if (U === 0) {
    $amperValue.value = '0.00'
    $amperRange.value = 0
  } else if (dist === 0 && !$curtain.checked) {
    $amperValue.value = ''
    $amperRange.value = 100
  } else {
    $amperRange.value = I.toFixed(2)
    $amperValue.value = I.toFixed(2)
  }
}

$distRange.oninput = (event) => {
  const r = +event.target.value
  const r2 = r * r
  $priemnik.style.left = r * 1.48 + 'vw'
  $cap.style.left = r * 1.48 + 'vw'
  E = J / r2
  $distValue.value = r + ' см'
  U = +$voltValue.value
  calc(U, E, r)
  return E
}

$valueRange.oninput = (event) => {
  const U = +event.target.value
  $voltValue.value = U
  $voltRange.value = U
  const r = $distValue.value.split(' ')[0]
  const r2 = r * r
  E = J / r2
  calc(U, E, r)
  return U
}
$curtain.addEventListener('click', (event) => {
  const U = +$voltValue.value
  const dist = +$distValue.value.split(' ')[0]
  if (event.target.checked) {
    $cap.classList.remove('open')
    $cap.classList.add('close')
    I = It
    $curtainText.textContent = 'Шторка закрыта'
    $amperValue.value = I.toFixed(2)
    $amperRange.value = I.toFixed(2)
  } else {
    $cap.classList.remove('close')
    $cap.classList.add('open')
    I = It + If
    $curtainText.textContent = 'Шторка открыта'
    if (U === 0) {
      I = 0.00
      $amperValue.value = '0.00'
      $amperRange.value = 0.00
    } else if (I > 100 || dist === 0) {
      I = ''
      $amperValue.value = I
      $amperRange.value = 100
    } else {
      $amperValue.value = I.toFixed(2)
      $amperRange.value = I.toFixed(2)
    }
  }
})
