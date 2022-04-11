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

const closeMenu = () => {
    navbarMenu.classList.remove('navbar-open')
    document.querySelector('.header-logo-pets').style.display = 'flex'
    document.querySelectorAll('.navbar-item-link').forEach(item => {
        item.classList.remove('navbar-mobile-color')
    })
    document.querySelectorAll('.burger-line').forEach(line => {
        line.style.backgroundColor = 'black'
    })
    document.body.style.overflow = 'visible'
}

closeMenuBtn.addEventListener('click', () => closeMenu())

navbarLinks.forEach(link => link.addEventListener('click', e => {
    if (e.target.classList.contains('navbar-item-link')
        || e.target.classList.contains('logo-title')) {
        closeMenu()
    }
}))
