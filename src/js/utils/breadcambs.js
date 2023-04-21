import gsap from 'gsap'

if (document.querySelector('.breadcrumbs')) {
    gsap.to('.breadcrumbs', {
        y: 0,
        opacity: 1,
        delay: 1,
        duration: 0.5
    })
}