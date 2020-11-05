// Scale
const $amperRange = document.querySelector('#amper-scale')
const $voltRange = document.querySelector('#volt-scale')
const $valueRange = document.querySelector('#control-scale')
const $distRange = document.querySelector('.installation__ruler')
// Fields
const fields = document.getElementsByClassName('field')
const $amperValue = fields[0]
const $voltValue = fields[1]
const $distValue = fields[2]
// Elements
const $curtain = document.querySelector('#curtain')
const $curtainText = document.querySelector('.options-block__title')
const $priemnik = document.querySelector('.installation__priemnik')
const $cap = document.querySelector('.installation__cap')
const $installation = document.querySelector('.installation')
// Sidebar elements
const $menuBtn = document.querySelector('.menu-btn')
const lines = document.getElementsByClassName('line')
const $sidebar = document.querySelector('.aside')
// Sidebar photo
const sidebarPhotos = document.querySelectorAll('.s-photo')

// console.log(menuBtn, sidebar)
// Sidebar

// Добавление события открытия фото
// sidebarPhotos.forEach(photo => photo.addEventListener('click', (event) => {
//   const path = event.target.getAttribute('src')
//   const alt = event.target.getAttribute('alt')

//   const backWindow = document.createElement('div')
//   backWindow.classList.add('back-window-photo')
//   backWindow.dataset.close = 'close'
//   const templateBigPhoto = `<img src="${path}" alt="${alt}" class="big-Photo">`

//   backWindow.insertAdjacentHTML('afterbegin', templateBigPhoto)
//   document.querySelector('main').insertAdjacentElement('afterbegin', backWindow)

//   // Добавление события закрытия фото
//   backWindow.addEventListener('click', event => {
//     if (event.target.dataset.close === 'close') {
//       document.querySelector('.back-window-photo').remove()
//     }
//   })
// }))

// Событие открытия / закрытия меню
function openCloseMenu() {
  $sidebar.classList.toggle('aside-close')
  $menuBtn.classList.toggle('menu-btn-open')
  animationBtn()
}

function animationBtn() {
  console.log($menuBtn.classList.contains('menu-btn-open'))
  if ($menuBtn.classList.contains('menu-btn-open')) {
    lines[0].style.transform = 'translateY(11px) rotate(45deg)'
    lines[1].style.transform = 'scale(0)'
    lines[2].style.transform = 'translateY(-11px) rotate(-45deg)'
  } else {
    lines[0].style.transform = 'translateY(0) rotate(0)'
    lines[1].style.transform = 'scale(1)'
    lines[2].style.transform = 'translateY(0) rotate(0)'
  }
}

// Конфигурация приборов

const R = 3.863

let U = 0
let It = 0
let If = 0
let r = 5

// Дбавление тени установке
function addShadow() {
  const dist = $distRange.value
  if (dist >= 35) {
    $installation.style.boxShadow = '10px 0 10px -5px';
  } else {
    $installation.style = ''
  }
}

// Позиционирование светоприемника
function positionPriemnik() {
  $priemnik.style.left = r + 'vw'
  $cap.style.left = r + 'vw'
  $cap.style.marginLeft = '0'
}

// Изменение текста кнопки
function editBtnText() {
  if (!$curtain.checked) {
    $curtainText.textContent = 'Шторка открыта'
  } else {
    $curtainText.textContent = 'Шторка закрыта'
  }
}

// Анимация шторки
function animationCap() {
  $cap.classList.toggle('open')
  $cap.classList.toggle('close')
}

// Получение напряжения
function getU() {
  U = +$valueRange.value
  $voltValue.value = U
  $voltRange.value = U
}

// Получение расстояния
function getDist() {
  r = +$distRange.value
  $distValue.value = r + ' см'
}

// Расчет темнового тока
function calcIt() {
  if (U === 0) {
    It = 0
  } else {
    It = (U * R) - 0.667
  }
}

// Расчет фототока
function calcIf() {
  const denominator = +r + 19
  const denominator2 = denominator * denominator
  If = 5000 * U / denominator2
}

// расчет конечного значения тока
function calcI() {
  getU()
  calcIt()
  getDist()
  positionPriemnik()
  if (!$curtain.checked) {
    calcIf()
    I = It + If
  } else {
    I = It
  }
  $amperRange.value = I.toFixed(2)
  if (I > 100) {
    $amperValue.value = ''
  } else {
    $amperValue.value = I.toFixed(2)
  }
}

// событие клика на кнопку
function clickBtn() {
  calcI()
  animationCap()
  editBtnText()
}
$menuBtn.addEventListener('click', openCloseMenu)
$valueRange.addEventListener('input', calcI)
$distRange.addEventListener('input', calcI)
$distRange.addEventListener('input', addShadow)
$curtain.addEventListener('click', clickBtn)