import petsData from '../../../petsData.json' assert { type: "json" }

//menu
const navbarMenu = document.querySelector('.header-navbar')
const navbarLinks = document.querySelectorAll('.navbar-list')
const openMenuBtn = document.querySelector('.header-burger')
const closeMenuBtn = document.querySelector('.header-burger-close')

openMenuBtn.addEventListener('click', () => {
    navbarMenu.classList.add('navbar-open')
    document.querySelector('.header-logo').style.display = 'none'
    document.body.style.overflow = 'hidden'
})

closeMenuBtn.addEventListener('click', () => {
    navbarMenu.classList.remove('navbar-open')
    document.querySelector('.header-logo').style.display = 'flex'
    document.body.style.overflow = 'visible'
})

navbarLinks.forEach(link => link.addEventListener('click', e => {
    if (e.target.classList.contains('navbar-item-link')
        || e.target.classList.contains('logo-title')) {
        navbarMenu.classList.remove('navbar-open')
        document.body.style.overflow = 'visible'
    }
}))

//slider
const sliderCardsSection = document.querySelector('.section-pets-slider-cards')
const sliderCards = document.querySelectorAll('.section-pets-slider-card')
const btnNext = document.querySelectorAll('.button-next')
const btnPrev = document.querySelectorAll('.button-prev')

const cards = petsData.map(card => {
    const template = `
    <div class="section-pets-slider-card">
        <img src=${card.img} alt="img">
            <div class="slider-card-name">${card.name}</div>
        <button class="button-transparent">Learn more</button>
    </div>
    `
    return template
})

const prevCardsIndices = [0, 1, 2]

const getUniqueRandomIndices = arraySize => {
    let randomIndices = Array.apply(null, Array(arraySize))
        .map(() => Math.floor((Math.random() * (petsData.length)) + 0))
    const isMatching = prevCardsIndices && prevCardsIndices.some(prevIndex => randomIndices.includes(prevIndex))
    if (new Set(randomIndices).size !== randomIndices.length || isMatching) {
        randomIndices = getUniqueRandomIndices(arraySize)
    }
    return randomIndices
}

const changeSlides = () => {
    const indices = []
    if (sliderCards.length === 3) indices.push(...getUniqueRandomIndices(3))
    if (sliderCards.length === 2) indices.push(...getUniqueRandomIndices(2))
    if (sliderCards.length === 1) indices.push(...getUniqueRandomIndices(1))

    sliderCardsSection.innerHTML = ''
    indices.forEach(index => {
        sliderCardsSection.innerHTML += cards[index]
    })
    prevCardsIndices.length = 0
    prevCardsIndices.push(...indices)
}

btnNext.forEach(btn => btn.onclick = () => changeSlides())

btnPrev.forEach(btn => btn.onclick = () => changeSlides())
