import petsData from '../../../petsData.json' assert { type: "json" }

//menu
const navbarMenu = document.querySelector('.header-navbar-pets')
const navbarLinks = document.querySelectorAll('.navbar-list-pets')
const openMenuBtn = document.querySelector('.header-burger-pets')
const closeMenuBtn = document.querySelector('.header-burger-pets-close')

openMenuBtn.addEventListener('click', () => {
    navbarMenu.classList.add('navbar-open')
    document.querySelector('.header-logo-pets').style.display = 'none'
    document.querySelectorAll('.navbar-item-link').forEach(item => {
        item.classList.add('navbar-mobile-color')
    })
    document.querySelectorAll('.burger-line').forEach(line => {
        line.style.backgroundColor = 'white'
    })
    document.body.style.overflow = 'hidden'
})

closeMenuBtn.addEventListener('click', () => {
    navbarMenu.classList.remove('navbar-open')
    document.querySelector('.header-logo-pets').style.display = 'flex'
    document.querySelectorAll('.navbar-item-link').forEach(item => {
        item.classList.remove('navbar-mobile-color')
    })
    document.querySelectorAll('.burger-line').forEach(line => {
        line.style.backgroundColor = 'black'
    })
    document.body.style.overflow = 'visible'
})

navbarLinks.forEach(link => link.addEventListener('click', e => {
    if (e.target.classList.contains('navbar-item-link')
        || e.target.classList.contains('logo-title')) {
        navbarMenu.classList.remove('navbar-open')
        document.body.style.overflow = 'visible'
    }
}))

//pets
const petsCardsList = document.querySelector('.section-pets-cards-list')

petsData.forEach(card => {
    const template = `
    <div class="section-pets-slider-card">
        <img src=${card.img} alt="img">
            <div class="slider-card-name">${card.name}</div>
        <button class="button-transparent btn-transparent-hover">Learn more</button>
    </div>
    `
    petsCardsList.innerHTML += template
})

//modal
const modalWindow = document.querySelector('.modal-container')
const modal = document.querySelector('.modal')
const modalInfo = document.querySelector('.modal-info')
const closeModalWindowBtn = document.querySelector('.button-close')
const petsCards = document.querySelectorAll('.section-pets-slider-card')


petsCards.forEach((card, cardIndex) => card.onclick = () => {
    modalWindow.style.display = 'flex'
    document.body.style.overflow = 'hidden'
    petsData.map((item, itemIndex) => {
        if (cardIndex === itemIndex) {
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
