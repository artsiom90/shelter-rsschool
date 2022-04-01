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