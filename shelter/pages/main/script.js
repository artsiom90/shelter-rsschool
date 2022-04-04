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
    <div id=${card.id} class="section-pets-slider-card">
        <img src=${card.img} alt="img">
        <div class="slider-card-name">${card.name}</div>
        <button class="button-transparent btn-transparent-hover">Learn more</button>
        <div style="height: 30px;"></div>
    </div>
    `
    return template
})

const prevCardsIndices = []

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

petsSlider.addEventListener('click', e => {
    if (e.target.parentNode.classList.contains('section-pets-slider-card')) {
        console.log(e.target);
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
})

modalWindow.addEventListener('mouseover', e => {
    if (e.target.classList.contains('modal-container')) {
        closeModalWindowBtn.classList.add('btn-close-hover')
    } else {
        closeModalWindowBtn.classList.remove('btn-close-hover')
    }
})

closeModalWindowBtn.onclick = () => {
    modalWindow.style.display = 'none'
    document.body.style.overflow = 'visible'
}

modalWindow.onclick = () => {
    modalWindow.style.display = 'none'
    document.body.style.overflow = 'visible'
}
