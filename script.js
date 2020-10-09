const $amperRange = document.querySelector('.ampermetr__range')
const $voltRange = document.querySelector('.voltmetr__range')
const $valueRange = document.querySelector('.midle-block__range')
const $distRange = document.querySelector('.dist-range')

const $voltValue = document.querySelector('.voltmetr__value')
const $amperValue = document.querySelector('.ampermetr__value')
const $distValue = document.querySelector('.dist-value')

const $curtain = document.querySelector('.curtain-block__curtain')
const $curtainText = document.querySelector('.curtain-block__text')
const $priemnik = document.querySelector('.down-block__priemnik')
const $lamp = document.querySelector('.dist-block__lamp')

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
  const dist = +$distValue.value
  if (dist === 0 || I > 100) {
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
  $priemnik.style.left = r * 1.22 + 'vw'
  E = J / r2
  $distValue.value = r
  U = +$voltValue.value
  calc(U, E, r)
  return E
}

$valueRange.oninput = (event) => {
  const U = +event.target.value
  $voltValue.value = U
  $voltRange.value = U
  const r = $distValue.value
  const r2 = r * r
  E = J / r2
  calc(U, E, r)
  return U
}

$curtain.addEventListener('click', (event) => {
  if (event.target.checked) {
    I = It
    $curtainText.textContent = 'Шторка закрыта'
    // $lamp.classList.remove('open')
    // $lamp.classList.add('hide')
    $priemnik.src = 'assets/priemnik-close.png'
  } else {
    $priemnik.src = 'assets/priemnik.png'
    I = It + If
    // $lamp.classList.remove('hide')
    // $lamp.classList.add('open')
    $curtainText.textContent = 'Шторка открыта'
  }
  if (I > 100) {
    I = ''
    $amperValue.value = I
    $amperRange.value = 100
  } else {
    $amperValue.value = I.toFixed(2)
    $amperRange.value = I.toFixed(2)
  }
})
