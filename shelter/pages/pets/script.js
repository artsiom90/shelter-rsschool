import petsData from '../../../petsData.json' assert { type: "json" }

//menu
const navbarMenu = document.querySelector('.header-navbar-pets')
const navbarLinks = document.querySelectorAll('.navbar-list-pets')
const openMenuBtn = document.querySelector('.header-burger-pets')
const closeMenuBtn = document.querySelector('.header-burger-pets-close')

const openMenu = () => {
    navbarMenu.classList.add('navbar-open')
    document.querySelector('.header-logo-pets').style.display = 'none'
    document.querySelector('.header-shadow-block').style.display = 'block'
    document.querySelectorAll('.navbar-item-link').forEach(item => {
        item.classList.add('navbar-mobile-color')
    })
    document.querySelectorAll('.burger-line').forEach(line => {
        line.style.backgroundColor = 'white'
    })
    document.body.style.overflow = 'hidden'
}

const closeMenu = () => {
    navbarMenu.classList.remove('navbar-open')
    document.querySelector('.header-logo-pets').style.display = 'flex'
    document.querySelector('.header-shadow-block').style.display = 'none'
    document.querySelectorAll('.navbar-item-link').forEach(item => {
        item.classList.remove('navbar-mobile-color')
    })
    document.querySelectorAll('.burger-line').forEach(line => {
        line.style.backgroundColor = 'black'
    })
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

document.querySelector('.header-shadow-block').onclick = () => closeMenu()

//pagination
const prevBtn = document.querySelector('.btn-prev')
const nextBtn = document.querySelector('.btn-next')
const startBtn = document.querySelector('.btn-start')
const endBtn = document.querySelector('.btn-end')
const pageNumber = document.querySelector('.page-number')
const petsCardsList = document.querySelector('.section-pets-cards-list')

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

const petsDataArray = []

function getInitData(number) {
    petsCardsList.innerHTML = ''
    for (let i = 0; i < petsData.length; i++) {
        const template = `
        <div id=${petsData[i].id} class="section-pets-slider-card">
            <img src=${petsData[i].img} alt="img">
                <div class="slider-card-name">${petsData[i].name}</div>
            <button class="button-transparent btn-transparent-hover">Learn more</button>
            <div style="height: 30px;"></div>
        </div>
    `
        petsCardsList.innerHTML += template
        if (i === number - 1) break
    }
}

if (window.innerWidth >= 1280) getInitData(8)
if (window.innerWidth >= 768 && window.innerWidth < 1280) getInitData(6)
if (window.innerWidth < 768) getInitData(3)

window.onresize = () => {
    if (window.innerWidth >= 1280) getInitData(8)
    if (window.innerWidth >= 768 && window.innerWidth < 1280) getInitData(6)
    if (window.innerWidth < 768) getInitData(3)
}

const getUniqueRandomIds = () => {
    let randomIds = Array.apply(null, Array(petsCardsList.childElementCount))
        .map(() => Math.floor((Math.random() * (petsData.length)) + 1))
    if (new Set(randomIds).size !== randomIds.length) {
        randomIds = getUniqueRandomIds()
    }
    return randomIds
}

const formCardsOrder = () => {
    if (petsCardsList.childElementCount === 8) {
        for (let i = 0; i < 6; i++) {
            const shuffledData = [...shuffleArray(petsData)].reverse()
            petsDataArray.push(...shuffledData)
        }
    }

    if (petsCardsList.childElementCount === 6) {
        for (let i = 0; i < 48 / petsCardsList.childElementCount; i++) {
            let randomIds = getUniqueRandomIds()
            const data = randomIds
                .map(item => (petsData.find(pet => pet.id === String(item))))
            petsDataArray.push(...data)
        }
    }
    if (petsCardsList.childElementCount === 3) {
        for (let i = 0; i < 48 / petsCardsList.childElementCount; i++) {
            let randomIds = getUniqueRandomIds()
            const data = randomIds
                .map(item => (petsData.find(pet => pet.id === String(item))))
            petsDataArray.push(...data)
        }
    }
}

formCardsOrder()

let currentPage = 1
let perPage = petsCardsList.childElementCount
let totalPages = () => petsDataArray.length / petsCardsList.childElementCount

function prevPage() {
    if (currentPage > 1) currentPage--
    changePage(currentPage)
}

const nextPage = () => {
    if (currentPage < totalPages()) currentPage++
    changePage(currentPage)
}

function changePage(page) {
    if (page < 1) page = 1
    if (page > totalPages()) page = totalPages()

    petsCardsList.innerHTML = ''
    pageNumber.innerHTML = page

    for (let i = (page - 1) * perPage; i < (page * perPage) && petsDataArray.length; i++) {
        const template = `
            <div id=${petsDataArray[i].id} class="section-pets-slider-card">
                <img src=${petsDataArray[i].img} alt="img">
                    <div class="slider-card-name">${petsDataArray[i].name}</div>
                <button class="button-transparent btn-transparent-hover">Learn more</button>
                <div style="height: 30px;"></div>
            </div>
            `
        petsCardsList.innerHTML += template
    }

    disableBtn()
}

prevBtn.addEventListener('click', prevPage)
nextBtn.addEventListener('click', nextPage)

const switchToStartPage = () => {
    currentPage = 1
    changePage(1)
}

const switchToLastPage = () => {
    currentPage = totalPages()
    changePage(totalPages())
}

startBtn.addEventListener('click', switchToStartPage)
endBtn.addEventListener('click', switchToLastPage)

function disableBtn() {
    if (currentPage === 1) {
        document.querySelectorAll('.left-arrow-btn').forEach(btn => {
            btn.classList.add('disabled')
            document.querySelector('.left-arrows-img').src = "../../assets/icons/left-arrows-disabled.svg"
            document.querySelector('.left-arrow-img').src = "../../assets/icons/left-arrow-disabled.svg"
        })
        document.querySelectorAll('.right-arrow-btn').forEach(btn => {
            btn.classList.remove('disabled')
            document.querySelector('.right-arrows-img').src = "../../assets/icons/right-arrows.svg"
            document.querySelector('.right-arrow-img').src = "../../assets/icons/right-arrow.svg"
        })
        prevBtn.removeEventListener('click', prevPage)
        startBtn.removeEventListener('click', switchToStartPage)
    } else {
        document.querySelectorAll('.left-arrow-btn').forEach(btn => {
            btn.classList.remove('disabled')
            document.querySelector('.left-arrows-img').src = "../../assets/icons/left-arrows.svg"
            document.querySelector('.left-arrow-img').src = "../../assets/icons/left-arrow.svg"
        })
        prevBtn.addEventListener('click', prevPage)
        startBtn.addEventListener('click', switchToStartPage)
    }
    if (currentPage === totalPages()) {
        document.querySelectorAll('.right-arrow-btn').forEach(btn => {
            btn.classList.add('disabled')
            document.querySelector('.right-arrows-img').src = "../../assets/icons/right-arrows-disabled.svg"
            document.querySelector('.right-arrow-img').src = "../../assets/icons/right-arrow-disabled.svg"
        })
        document.querySelectorAll('.left-arrow-btn').forEach(btn => {
            btn.classList.remove('disabled')
            document.querySelector('.left-arrows-img').src = "../../assets/icons/left-arrows.svg"
            document.querySelector('.left-arrow-img').src = "../../assets/icons/left-arrow.svg"
        })
        nextBtn.removeEventListener('click', nextPage)
        endBtn.removeEventListener('click', switchToLastPage)
    } else {
        document.querySelectorAll('.right-arrow-btn').forEach(btn => {
            btn.classList.remove('disabled')
            document.querySelector('.right-arrows-img').src = "../../assets/icons/right-arrows.svg"
            document.querySelector('.right-arrow-img').src = "../../assets/icons/right-arrow.svg"
        })
        nextBtn.addEventListener('click', nextPage)
        endBtn.addEventListener('click', switchToLastPage)
    }
}

disableBtn()

//modal
const modalWindow = document.querySelector('.modal-container')
const modal = document.querySelector('.modal')
const modalInfo = document.querySelector('.modal-info')
const closeModalWindowBtn = document.querySelector('.button-close')

const openModal = e => {
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

const closeModal = () => {
    modalWindow.style.display = 'none'
    document.body.style.overflow = 'visible'
}

petsCardsList.addEventListener('click', e => {
    if (!navbarMenu.classList.contains('navbar-open')) {
        openModal(e)
    }
})

modalWindow.addEventListener('mouseover', e => {
    if (e.target.classList.contains('modal-container')) {
        closeModalWindowBtn.classList.add('btn-close-hover')
    } else {
        closeModalWindowBtn.classList.remove('btn-close-hover')
    }
})

closeModalWindowBtn.onclick = () => closeModal()

modalWindow.onclick = () => closeModal()
