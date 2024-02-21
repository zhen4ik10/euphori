// Строгий режим
"use strict"

document.addEventListener('click', documentAction)

function documentAction(e) {
    const targetElement = e.target
    
    targetElement.closest('.icon-menu') ? document.body.classList.toggle('menu-open') : null

    if (targetElement.closest('[data-spoller]')) {
        const currentElement = targetElement.closest('[data-spoller]')
        if (!currentElement.nextElementSibling.classList.contains('--sliding')) {
            currentElement.classList.toggle('active')
        }
        slideToggle(currentElement.nextElementSibling)
        // currentElement.nextElementSibling.hidden = !currentElement.nextElementSibling.hidden
        // if (currentElement.nextElementSibling.hidden === true) {
        //     currentElement.nextElementSibling.hidden === false 
        // } else {
        //     currentElement.nextElementSibling.hidden === true
        // }
    }
    if (targetElement.closest('.rating__input')) {
        const currentElement = targetElement.closest('.rating__input')
        const rating = currentElement.closest('.rating')
        if (rating.classList.contains('rating--set')) {
            starRatingGet(rating, currentElement)
        }
    }
}

// Rating

const ratings = document.querySelectorAll('[data-rating]')
if (ratings) {
    ratings.forEach(rating => {
        const currentValue = +rating.dataset.rating
        currentValue ? starRatingSet(rating, currentValue) : null
    })
}

function starRatingGet(rating, currentElement) {
    const ratingValue = +currentElement.value
    // console.log(ratingValue);
    // тут відправка оцінки (ratingValue) на бекенд...
    // Уявімо, що ми отримали середню оцінку 3.2
    const resultRating = 3.2
    starRatingSet(rating, resultRating)
}

function starRatingSet(rating, value) {
    const ratingItems = rating.querySelectorAll('.rating__item')
    const resultFullItems = parseInt(value)
    const resultPartItem = value - resultFullItems

     ratingItems.forEach((ratingItem, index) => {
        ratingItem.classList.remove('active')
        ratingItem.querySelector('span') ? ratingItems[index].querySelector('span').remove() : null

        if (index <= (resultFullItems - 1)) {
            ratingItem.classList.add('active')
        }
        if (index === resultFullItems && resultPartItem) {
            ratingItem.insertAdjacentHTML("beforeend", `<span style="width:${resultPartItem * 100}%"></span>`)
        }
    })
}

// Spollers
const spollers = document.querySelectorAll('[data-spoller]') 

if (spollers.length) {
    spollers.forEach(spoller => {
        spoller.nextElementSibling.hidden = true
    })
}

let slideDown = (target, duration = 500) => {
    if (!target.classList.contains('--sliding')) {
        target.classList.add('--sliding')
        target.hidden = false
        let height = target.offsetHeight
        
        target.style.paddingTop = 0
        target.style.paddingBottom = 0
        target.style.marginTop = 0
        target.style.marginBottom = 0

        target.style.overflow = 'hidden'
        target.style.height = 0

        target.offsetHeight

        target.style.transitionProperty = `height, margin, padding`
        target.style.transitionDuration = `${duration}ms`
        
        target.style.height = `${height}px`

        target.style.removeProperty('padding-top')
        target.style.removeProperty('padding-bottom')
        target.style.removeProperty('margin-top')
        target.style.removeProperty('margin-bottom')

        setTimeout(() => {    
            target.style.removeProperty('height')
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-duration')
            target.style.removeProperty('transition-property')
            target.classList.remove('--sliding')
        }, duration) 
    }
}
let slideUp = (target, duration = 500) => {
    if (!target.classList.contains('--sliding')) {
        target.classList.add('--sliding')
        let height = target.offsetHeight

        target.style.transitionProperty = `height, margin, padding`
        target.style.transitionDuration = `${duration}ms`
        target.style.height = `${height}px`

        target.offsetHeight
        
        target.style.overflow = 'hidden'
        target.style.paddingTop = 0
        target.style.paddingBottom = 0
        target.style.marginTop = 0
        target.style.marginBottom = 0

        
        target.style.height = 0
        
        
        setTimeout(() => {
            target.style.removeProperty('padding-top')
            target.style.removeProperty('padding-bottom')
            target.style.removeProperty('margin-top')
            target.style.removeProperty('margin-bottom')

            target.style.removeProperty('height')
            target.style.removeProperty('overflow')
            target.style.removeProperty('transition-duration')
            target.style.removeProperty('transition-property')
            target.classList.remove('--sliding')

            target.hidden = true
        }, duration) 
    }
}
let slideToggle = (target, duration = 500) => {
    target.hidden ? slideDown(target, duration) : slideUp(target, duration)
}

// Слайдер
const heroSlider = document.querySelector('.hero')
if (heroSlider) {
    // const swiper дописуємо тільки тоді коли є щось серйозне
    new Swiper('.hero', {
      // Optional parameters
        loop: true,
        autoHeight: true,
        speed: 800,
        parallax: true,
        // If we need pagination
        pagination: {
            el: '.hero_pagination',
            clickable: true,
      },
      // Navigation arrows
      navigation: {
        nextEl: '.hero__arrow--next',
        prevEl: '.hero__arrow--prev',
      },
    });
}
const newSlider = document.querySelector('.new')
if (newSlider) {
    new Swiper('.new__slider', {
      // Optional parameters
        loop: true,
        autoHeight: true,
        speed: 800,
        slidesPerView: 4,
        spaceBetween: 38,
        // Navigation arrows
        navigation: {
            nextEl: '.new__arrow--right',
            prevEl: '.new__arrow--left',
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1.5,
                spaceBetween: 15
            },
            479.98: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            // when window width is >= 480px
            649.98: {
                slidesPerView: 3,
                spaceBetween: 25
            },
            // when window width is >= 640px
            991.98: {
                slidesPerView: 4,
                spaceBetween: 38
            }
        }
    });
}
const reviewsSlider = document.querySelector('.reviews')
if (reviewsSlider) {
    new Swiper('.reviews__slider', {
      // Optional parameters
        loop: true,
        // autoHeight: true,
        speed: 800,
        slidesPerView: 3,
        spaceBetween: 23,
        // If we need pagination
        pagination: {
            el: '.reviews__pages',
            clickable: true,
        },
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1.3,
                spaceBetween: 15
            },
            // when window width is >= 480px
            479.98: {
                slidesPerView: 2,
                spaceBetween: 15
            },
            // when window width is >= 640px
            991.98: {
                slidesPerView: 3,
                spaceBetween: 23
            }
        }
    });
}