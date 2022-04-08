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

if (window.innerWidth > 870) getInitData(8)
if (window.innerWidth <= 870) getInitData(6)
if (window.innerWidth <= 480) getInitData(3)

window.onresize = () => {
    if (window.innerWidth > 870) getInitData(8)
    if (window.innerWidth <= 870) getInitData(6)
    if (window.innerWidth <= 480) getInitData(3)
}

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

//pagination
const prevBtn = document.querySelector('.btn-prev')
const nextBtn = document.querySelector('.btn-next')
const startBtn = document.querySelector('.btn-start')
const endBtn = document.querySelector('.btn-end')
const pageNumber = document.querySelector('.page-number')

const petsDataArray = [...petsData]

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

for (let i = 0; i < 5; i++) {
    petsDataArray.push(...shuffleArray(petsData))
}

const dataArray = petsDataArray.reduce((arr, item) => {
    arr.push({ ...item })
    return arr
}, [])


let currentPage = 1
let perPage = petsCardsList.childElementCount
let totalPages = () => dataArray.length / petsCardsList.childElementCount

function prevPage() {
    if (currentPage > 1) currentPage--
    changePage(currentPage)
}

const nextPage = () => {
    if (currentPage < totalPages()) currentPage++
    changePage(currentPage)
}

const disableBtn = () => {
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
    } else {
        document.querySelectorAll('.left-arrow-btn').forEach(btn => {
            btn.classList.remove('disabled')
            document.querySelector('.left-arrows-img').src = "../../assets/icons/left-arrows.svg"
            document.querySelector('.left-arrow-img').src = "../../assets/icons/left-arrow.svg"
        })
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
    } else {
        document.querySelectorAll('.right-arrow-btn').forEach(btn => {
            btn.classList.remove('disabled')
            document.querySelector('.right-arrows-img').src = "../../assets/icons/right-arrows.svg"
            document.querySelector('.right-arrow-img').src = "../../assets/icons/right-arrow.svg"
        })
    }
}

disableBtn()

function changePage(page) {
    if (page < 1) page = 1
    if (page > totalPages()) page = totalPages()

    petsCardsList.innerHTML = ''
    pageNumber.innerHTML = page

    for (let i = (page - 1) * perPage; i < (page * perPage) && dataArray.length; i++) {
        const template = `
            <div id=${dataArray[i].id} class="section-pets-slider-card">
                <img src=${dataArray[i].img} alt="img">
                    <div class="slider-card-name">${dataArray[i].name}</div>
                <button class="button-transparent btn-transparent-hover">Learn more</button>
                <div style="height: 30px;"></div>
            </div>
            `
        petsCardsList.innerHTML += template
    }

    disableBtn()
}

prevBtn.onclick = () => prevPage()
nextBtn.onclick = () => nextPage()
startBtn.onclick = () => {
    currentPage = 1
    changePage(1)
}
endBtn.onclick = () => {
    currentPage = totalPages()
    changePage(totalPages())
}

//modal
const modalWindow = document.querySelector('.modal-container')
const modal = document.querySelector('.modal')
const modalInfo = document.querySelector('.modal-info')
const closeModalWindowBtn = document.querySelector('.button-close')

petsCardsList.addEventListener('click', e => {
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
