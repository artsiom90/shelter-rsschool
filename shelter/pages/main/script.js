import petsData from '../../../petsData.json' assert { type: "json" }

//menu
const navbarMenu = document.querySelector('.header-navbar')
const navbarLinks = document.querySelectorAll('.navbar-list')
const openMenuBtn = document.querySelector('.header-burger')
const closeMenuBtn = document.querySelector('.header-burger-close')

const openMenu = () => {
    navbarMenu.classList.add('navbar-open')
    document.querySelector('.header-logo').style.display = 'none'
    document.body.style.overflow = 'hidden'
}

const closeMenu = () => {
    navbarMenu.classList.remove('navbar-open')
    document.querySelector('.header-logo').style.display = 'flex'
    document.body.style.overflow = 'visible'
}

openMenuBtn.addEventListener('click', () => openMenu())

closeMenuBtn.addEventListener('click', () => closeMenu())

navbarLinks.forEach(link => link.addEventListener('click', e => {
    if (e.target.classList.contains('navbar-item-link')
        || e.target.classList.contains('logo-title')) {
        closeMenu()
    }
}))

const classListArray = [
    'header-container',
    'hero-container',
    'section-hero-info',
    'section-hero',
    'section-hero-title',
    'section-hero-desc',
]

document.querySelector('body').onclick = e => {
    for (const item of classListArray) {
        if (e.target.classList.contains(item)) {
            closeMenu()
        }
    }
}

//slider
const sliderCardsSection = document.querySelector('.section-pets-slider-cards')
const sliderCards = document.querySelectorAll('.section-pets-slider-card')
const btnNext = document.querySelectorAll('.button-next')
const btnPrev = document.querySelectorAll('.button-prev')

const cards = petsData.map(card => {
    const template = `
    <div id=${card.id} class="section-pets-slider-card">
        <img src=${card.img} width="270" height="270" alt="img">
            <div class="slider-card-name">${card.name}</div>
        <button class="button-transparent btn-transparent-hover">Learn more</button>
        <div style="height: 30px;"></div>
    </div>
    `
    return template
})

const prevCardsIndices = []
console.log(prevCardsIndices);
if (window.innerWidth > 1240) getInitData(3)
if (window.innerWidth > 767 && window.innerWidth <= 1240) getInitData(2)
if (window.innerWidth <= 767) getInitData(1)

window.onresize = () => {
    if (window.innerWidth > 1240) getInitData(3)
    if (window.innerWidth > 767 && window.innerWidth <= 1240) getInitData(2)
    if (window.innerWidth <= 767) getInitData(1)
}

function getInitData(number) {
    sliderCardsSection.innerHTML = ''
    for (let i = 0; i < petsData.length; i++) {
        const template = `
        <div id=${petsData[i].id} class="section-pets-slider-card">
            <img src=${petsData[i].img} width="270" height="270" alt="img">
                <div class="slider-card-name">${petsData[i].name}</div>
            <button class="button-transparent btn-transparent-hover">Learn more</button>
            <div style="height: 30px;"></div>
        </div>
    `
        sliderCardsSection.innerHTML += template
        prevCardsIndices.push(i)
        if (i === number - 1) break
    }
}

const getUniqueRandomIndices = arraySize => {
    let randomIndices = Array.apply(null, Array(arraySize))
        .map(() => Math.floor((Math.random() * (petsData.length)) + 0))
    const isMatching = prevCardsIndices && prevCardsIndices
        .some(prevIndex => randomIndices.includes(prevIndex))
    if (new Set(randomIndices).size !== randomIndices.length || isMatching) {
        randomIndices = getUniqueRandomIndices(arraySize)
    }
    return randomIndices
}

const changeSlides = () => {
    const indices = []

    if (sliderCards.length === 3 || sliderCards.length === 0) indices.push(...getUniqueRandomIndices(3))
    if (sliderCards.length === 2) indices.push(...getUniqueRandomIndices(2))
    if (sliderCards.length === 1) indices.push(...getUniqueRandomIndices(1))

    sliderCardsSection.innerHTML = ''
    indices.forEach(index => sliderCardsSection.innerHTML += cards[index])
    prevCardsIndices.length = 0
    prevCardsIndices.push(...indices)
}

btnNext.forEach(btn => btn.onclick = () => changeSlides())

btnPrev.forEach(btn => btn.onclick = () => changeSlides())

//modal
const modalWindow = document.querySelector('.modal-container')
const modal = document.querySelector('.modal')
const modalInfo = document.querySelector('.modal-info')
const closeModalWindowBtn = document.querySelector('.button-close')
const petsSlider = document.querySelector('.section-pets-slider')

const openModal = e => {
    if (e.target.parentNode.classList.contains('section-pets-slider-card')) {
        const itemId = e.target.parentNode.id
        modalWindow.style.display = 'flex'
        document.body.style.overflow = 'hidden'
        petsData.map(item => {
            if (itemId === item.id) {
                modalInfo.innerHTML = ''
                const template = `
                           <div class="modal-info-name">
                               <h2 class="modal-info-title">${item.name}</h2>
                               <h3 class="modal-info-subtitle">${item.type} - ${item.breed}</h3>
                           </div>
                           <p class="modal-info-desc">${item.description}</p>
                           <ul class="modal-info-additional">
                               <li><b>Age: </b>${item.age}</li>
                               <li><b>Inoculations: </b>${item.inoculations}</li>
                               <li><b>Diseases: </b>${item.diseases}</li>
                               <li><b>Parasites: </b>${item.parasites}</li>
                           </ul>
                       `
                modalInfo.innerHTML = template
                document.querySelector('.modal-img').style.backgroundImage = `url('${item.img}')`
                modal.onclick = e => e.stopPropagation()
            }
        })
    }
}

const closeModal = () => {
    modalWindow.style.display = 'none'
    document.body.style.overflow = 'visible'
}

petsSlider.addEventListener('click', e => openModal(e))

modalWindow.addEventListener('mouseover', e => {
    if (e.target.classList.contains('modal-container')) {
        closeModalWindowBtn.classList.add('btn-close-hover')
    } else {
        closeModalWindowBtn.classList.remove('btn-close-hover')
    }
})

closeModalWindowBtn.onclick = () => closeModal()

modalWindow.onclick = () => closeModal()
