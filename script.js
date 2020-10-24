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

// Конфигурация приборов
// 
// При измменении напряжения меняется U => It
// При изменении r мменяется If => I
// 
// При закрытой шторке I = It
// При открытой шторке I = It + If

const R = 3.863

let U = 0
let It = 0
let If = 0
let r = 5

// Позиционирование светоприемника
function positionPriemnik() {
  $priemnik.style.left = r * 1.45 + 'vw'
  $priemnik.style.marginLeft = '-2.8vw'
  $cap.style.left = r * 1.45 + 'vw'
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

$valueRange.addEventListener('input', calcI)
$distRange.addEventListener('input', calcI)
$curtain.addEventListener('click', clickBtn)