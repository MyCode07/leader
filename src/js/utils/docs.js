import gsap from 'gsap'
if (document.querySelector('.documents')) {
    gsap.to('.documents__list li', {
        y: 0,
        opacity: 1,
        delay: 1,
        duration: 0.7,
        stagger: .4,

    }, '<-.8')
}